<?php
require_once __DIR__ . '/../utils/Logger.php';

class Database {
    private $host = "superporramotor.com";
    private $database_name = "dbajiuxq5owgm5";
    private $username = "ucskgodjjo0nw";
    private $password = "1@1*iz^5[mq1";
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            Logger::info('Intentando conectar a la base de datos', [
                'host' => $this->host,
                'database' => $this->database_name
            ]);

            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->database_name,
                $this->username,
                $this->password,
                array(
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
                    PDO::ATTR_PERSISTENT => false,
                    PDO::ATTR_EMULATE_PREPARES => false,
                    PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => true
                )
            );

            Logger::info('Conexión establecida exitosamente');
            return $this->conn;

        } catch(PDOException $exception) {
            Logger::error('Error de conexión a la base de datos', [
                'error' => $exception->getMessage(),
                'code' => $exception->getCode(),
                'host' => $this->host,
                'database' => $this->database_name
            ]);

            $errorMessage = 'Error de conexión al servidor';
            $errorCode = 'DB_CONNECTION_ERROR';

            if (strpos($exception->getMessage(), 'Access denied') !== false) {
                $errorMessage = 'Error de autenticación con la base de datos';
                $errorCode = 'DB_AUTH_ERROR';
            } elseif (strpos($exception->getMessage(), 'Unknown database') !== false) {
                $errorMessage = 'Base de datos no encontrada';
                $errorCode = 'DB_NOT_FOUND';
            } elseif (strpos($exception->getMessage(), 'Connection refused') !== false) {
                $errorMessage = 'No se puede conectar al servidor de base de datos';
                $errorCode = 'DB_CONNECTION_REFUSED';
            }

            http_response_code(500);
            echo json_encode([
                'error' => 'Error de conexión al servidor',
                'code' => 'DB_CONNECTION_ERROR',
                'message' => 'No se pudo establecer la conexión con la base de datos'
            ]);
            throw $exception;
        }
    }
}