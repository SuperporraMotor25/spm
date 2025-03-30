<?php
require_once __DIR__ . '/../utils/Logger.php';

class Database {
    private $host = "localhost";
    private $database_name = "superporramotor_dev";
    private $username = "root";
    private $password = "";
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
                    PDO::ATTR_TIMEOUT => 5,
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"
                )
            );

            Logger::info('Conexión establecida exitosamente');
            return $this->conn;

        } catch(PDOException $exception) {
            Logger::error('Error de conexión a la base de datos', [
                'error' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            throw $exception;
        }
    }
}
?>