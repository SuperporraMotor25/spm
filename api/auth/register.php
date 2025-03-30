<?php
header('Access-Control-Allow-Origin: https://2025.superporramotor.com');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
header('Access-Control-Max-Age: 3600');
header('Content-Type: application/json');

require_once '../config/database.php';
require_once '../config/jwt.php';
require_once '../utils/Logger.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

Logger::info('Iniciando proceso de registro', ['method' => $_SERVER['REQUEST_METHOD'], 'remote_addr' => $_SERVER['REMOTE_ADDR']]);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

// Obtener datos del cuerpo de la petición
$data = json_decode(file_get_contents('php://input'), true);

// Validar datos requeridos
if (!isset($data['username']) || !isset($data['email']) || !isset($data['password'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Faltan datos requeridos']);
    exit;
}

$username = trim($data['username']);
$email = trim($data['email']);
$password = $data['password'];

// Validar formato de email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Formato de email inválido']);
    exit;
}

// Validar longitud de contraseña
if (strlen($password) < 8) {
    http_response_code(400);
    echo json_encode(['error' => 'La contraseña debe tener al menos 8 caracteres']);
    exit;
}

try {
    Logger::info('Iniciando conexión a la base de datos');
    $db = new Database();
    $conn = $db->getConnection();

    if (!$conn) {
        Logger::error('No se pudo establecer conexión con la base de datos');
        http_response_code(500);
        echo json_encode([
            'error' => 'Error de conexión al servidor',
            'code' => 'DB001'
        ]);
        exit;
    }

    Logger::info('Verificando existencia de email', ['email' => $email]);
    // Verificar si el email ya existe
    $stmt = $conn->prepare('SELECT id FROM users WHERE email = ?');
    $stmt->execute([$email]);
    
    if ($stmt->fetch()) {
        Logger::info('Intento de registro con email existente', ['email' => $email]);
        http_response_code(400);
        echo json_encode([
            'error' => 'El email ya está registrado',
            'code' => 'REG001'
        ]);
        exit;
    }

    Logger::info('Generando hash de contraseña');
    // Hash de la contraseña
    $passwordHash = password_hash($password, PASSWORD_DEFAULT);

    Logger::info('Insertando nuevo usuario', ['username' => $username]);
    // Insertar nuevo usuario
    $stmt = $conn->prepare('INSERT INTO users (username, email, password) VALUES (?, ?, ?)');
    $stmt->execute([$username, $email, $passwordHash]);

    $userId = $conn->lastInsertId();
    Logger::info('Usuario creado exitosamente', ['user_id' => $userId]);

    // Generar token JWT
    Logger::info('Generando token JWT');
    $jwt = new JWT();
    $token = $jwt->generate([
        'user_id' => $userId,
        'username' => $username,
        'email' => $email
    ]);

    Logger::info('Registro completado exitosamente', ['user_id' => $userId]);
    http_response_code(201);
    echo json_encode([
        'message' => 'Usuario registrado exitosamente',
        'token' => $token
    ]);

} catch (PDOException $e) {
    Logger::error('Error en la base de datos durante el registro', [
        'error' => $e->getMessage(),
        'code' => $e->getCode(),
        'trace' => $e->getTraceAsString(),
        'username' => $username,
        'email' => $email
    ]);
    http_response_code(500);
    echo json_encode([
        'error' => 'Error en el servidor',
        'code' => 'DB_REGISTER_ERROR',
        'message' => 'No se pudo completar el registro debido a un error en la base de datos'
    ]);
    exit;
} catch (Exception $e) {
    Logger::error('Error general durante el registro', [
        'error' => $e->getMessage(),
        'trace' => $e->getTraceAsString(),
        'username' => $username,
        'email' => $email
    ]);
    http_response_code(500);
    echo json_encode([
        'error' => 'Error en el servidor',
        'code' => 'REGISTER_ERROR',
        'message' => 'No se pudo completar el registro debido a un error interno'
    ]);
    exit;
}