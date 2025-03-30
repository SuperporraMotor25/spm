<?php
require_once __DIR__ . '/../config/database.php';

class PilotController {
    private $conn;
    
    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }
    
    public function index() {
        $query = "SELECT * FROM pilots ORDER BY points DESC";
        $stmt = $this->conn->prepare($query);
        
        try {
            $stmt->execute();
            $pilots = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            http_response_code(200);
            echo json_encode(["data" => $pilots]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Database error: " . $e->getMessage()]);
        }
    }
    
    public function show($id) {
        $query = "SELECT * FROM pilots WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $id);
        
        try {
            $stmt->execute();
            $pilot = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($pilot) {
                http_response_code(200);
                echo json_encode(["data" => $pilot]);
            } else {
                http_response_code(404);
                echo json_encode(["error" => "Pilot not found"]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Database error: " . $e->getMessage()]);
        }
    }
    
    public function create() {
        $data = json_decode(file_get_contents("php://input"));
        
        if (!isset($data->name) || !isset($data->team) || !isset($data->number)) {
            http_response_code(400);
            echo json_encode(["error" => "Missing required fields"]);
            return;
        }
        
        $query = "INSERT INTO pilots (name, team, number, points, category) VALUES (:name, :team, :number, :points, :category)";
        $stmt = $this->conn->prepare($query);
        
        $points = isset($data->points) ? $data->points : 0;
        
        $stmt->bindParam(":name", $data->name);
        $stmt->bindParam(":team", $data->team);
        $stmt->bindParam(":number", $data->number);
        $stmt->bindParam(":points", $points);
        $stmt->bindParam(":category", $data->category);
        
        try {
            if ($stmt->execute()) {
                http_response_code(201);
                echo json_encode(["message" => "Pilot created successfully"]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Unable to create pilot"]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Database error: " . $e->getMessage()]);
        }
    }
    
    public function update($id) {
        $data = json_decode(file_get_contents("php://input"));
        
        if (!isset($data->name) || !isset($data->team) || !isset($data->number)) {
            http_response_code(400);
            echo json_encode(["error" => "Missing required fields"]);
            return;
        }
        
        $query = "UPDATE pilots SET name = :name, team = :team, number = :number, points = :points, category = :category WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(":id", $id);
        $stmt->bindParam(":name", $data->name);
        $stmt->bindParam(":team", $data->team);
        $stmt->bindParam(":number", $data->number);
        $stmt->bindParam(":points", $data->points);
        $stmt->bindParam(":category", $data->category);
        
        try {
            if ($stmt->execute()) {
                http_response_code(200);
                echo json_encode(["message" => "Pilot updated successfully"]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Unable to update pilot"]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Database error: " . $e->getMessage()]);
        }
    }
    
    public function delete($id) {
        $query = "DELETE FROM pilots WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $id);
        
        try {
            if ($stmt->execute()) {
                http_response_code(200);
                echo json_encode(["message" => "Pilot deleted successfully"]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Unable to delete pilot"]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Database error: " . $e->getMessage()]);
        }
    }
    
    public function updatePoints($id, $points) {
        $query = "UPDATE pilots SET points = points + :points WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(":id", $id);
        $stmt->bindParam(":points", $points);
        
        try {
            if ($stmt->execute()) {
                http_response_code(200);
                echo json_encode(["message" => "Pilot points updated successfully"]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Unable to update pilot points"]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Database error: " . $e->getMessage()]);
        }
    }
}
?>