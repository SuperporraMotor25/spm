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

Logger::info('Iniciando proceso de login', ['method' => $_SERVER['REQUEST_METHOD'], 'remote_addr' => $_SERVER['REMOTE_ADDR']]);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

// Obtener datos del cuerpo de la petición
$data = json_decode(file_get_contents('php://input'), true);

// Validar datos requeridos
if (!isset($data['email']) || !isset($data['password'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Faltan datos requeridos']);
    exit;
}

$email = trim($data['email']);
$password = $data['password'];

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

    Logger::info('Buscando usuario por email', ['email' => $email]);
    // Buscar usuario por email
    $stmt = $conn->prepare('SELECT id, username, email, password, role FROM users WHERE email = ?');
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        Logger::info('Intento de login con email no registrado', ['email' => $email]);
        http_response_code(401);
        echo json_encode([
            'error' => 'Credenciales inválidas',
            'code' => 'AUTH001'
        ]);
        exit;
    }

    Logger::info('Verificando contraseña');
    // Verificar contraseña
    if (!password_verify($password, $user['password'])) {
        Logger::info('Intento de login con contraseña incorrecta', ['email' => $email]);
        http_response_code(401);
        echo json_encode([
            'error' => 'Credenciales inválidas',
            'code' => 'AUTH002'
        ]);
        exit;
    }

    // Generar token JWT
    Logger::info('Generando token JWT');
    $jwt = new JWT();
    $token = $jwt->generate([
        'user_id' => $user['id'],
        'username' => $user['username'],
        'email' => $user['email'],
        'role' => $user['role']
    ]);

    Logger::info('Login completado exitosamente', ['user_id' => $user['id']]);
    http_response_code(200);
    echo json_encode([
        'message' => 'Login exitoso',
        'token' => $token,
        'user' => [
            'id' => $user['id'],
            'username' => $user['username'],
            'email' => $user['email'],
            'role' => $user['role']
        ]
    ]);

} catch (PDOException $e) {
    Logger::error('Error en la base de datos durante el login', [
        'error' => $e->getMessage(),
        'code' => $e->getCode(),
        'trace' => $e->getTraceAsString(),
        'email' => $email
    ]);
    http_response_code(500);
    echo json_encode([
        'error' => 'Error en el servidor',
        'code' => 'DB_LOGIN_ERROR',
        'message' => 'No se pudo completar el login debido a un error en la base de datos'
    ]);
    exit;
} catch (Exception $e) {
    Logger::error('Error general durante el login', [
        'error' => $e->getMessage(),
        'trace' => $e->getTraceAsString(),
        'email' => $email
    ]);
    http_response_code(500);
    echo json_encode([
        'error' => 'Error en el servidor',
        'code' => 'LOGIN_ERROR',
        'message' => 'No se pudo completar el login debido a un error interno'
    ]);
    exit;
}