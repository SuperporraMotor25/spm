<?php
require_once __DIR__ . '/../config/database.php';

class AuthController {
    private $conn;
    
    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }
    
    public function register() {
        $data = json_decode(file_get_contents("php://input"));
        
        if (!isset($data->email) || !isset($data->password) || !isset($data->username)) {
            http_response_code(400);
            echo json_encode(["error" => "Missing required fields"]);
            return;
        }
        
        // Verificar si el email ya existe
        $checkEmail = "SELECT id FROM users WHERE email = :email";
        $stmt = $this->conn->prepare($checkEmail);
        $stmt->bindParam(":email", $data->email);
        $stmt->execute();
        
        if ($stmt->rowCount() > 0) {
            http_response_code(400);
            echo json_encode(["error" => "El email ya está registrado"]);
            return;
        }
        
        // Verificar si el username ya existe
        $checkUsername = "SELECT id FROM users WHERE username = :username";
        $stmt = $this->conn->prepare($checkUsername);
        $stmt->bindParam(":username", $data->username);
        $stmt->execute();
        
        if ($stmt->rowCount() > 0) {
            http_response_code(400);
            echo json_encode(["error" => "El nombre de usuario ya está en uso"]);
            return;
        }
        
        $query = "INSERT INTO users (username, email, password, role) VALUES (:username, :email, :password, 'user')";
        $stmt = $this->conn->prepare($query);
        
        $password_hash = password_hash($data->password, PASSWORD_DEFAULT);
        
        $stmt->bindParam(":username", $data->username);
        $stmt->bindParam(":email", $data->email);
        $stmt->bindParam(":password", $password_hash);
        
        try {
            if ($stmt->execute()) {
                http_response_code(201);
                echo json_encode(["message" => "Usuario registrado exitosamente"]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "No se pudo registrar el usuario"]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Error en la base de datos: " . $e->getMessage()]);
        }
    }
    
    public function login() {
        $data = json_decode(file_get_contents("php://input"));
        
        if (!isset($data->email) || !isset($data->password)) {
            http_response_code(400);
            echo json_encode(["error" => "Missing email or password"]);
            return;
        }
        
        $query = "SELECT id, username, password FROM users WHERE email = :email";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":email", $data->email);
        
        try {
            $stmt->execute();
            if ($stmt->rowCount() > 0) {
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if (password_verify($data->password, $row['password'])) {
                    $token = bin2hex(random_bytes(32));
                    
                    http_response_code(200);
                    echo json_encode([
                        "message" => "Login successful",
                        "token" => $token,
                        "user" => [
                            "id" => $row['id'],
                            "username" => $row['username']
                        ]
                    ]);
                } else {
                    http_response_code(401);
                    echo json_encode(["error" => "Invalid credentials"]);
                }
            } else {
                http_response_code(401);
                echo json_encode(["error" => "Invalid credentials"]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Database error: " . $e->getMessage()]);
        }
    }
}
?>