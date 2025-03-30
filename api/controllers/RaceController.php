<?php
require_once __DIR__ . '/../config/database.php';

class RaceController {
    private $conn;
    
    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }
    
    public function index() {
        $query = "SELECT * FROM races ORDER BY date ASC";
        $stmt = $this->conn->prepare($query);
        
        try {
            $stmt->execute();
            $races = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            http_response_code(200);
            echo json_encode(["data" => $races]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Database error: " . $e->getMessage()]);
        }
    }
    
    public function show($id) {
        $query = "SELECT * FROM races WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $id);
        
        try {
            $stmt->execute();
            $race = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($race) {
                http_response_code(200);
                echo json_encode(["data" => $race]);
            } else {
                http_response_code(404);
                echo json_encode(["error" => "Race not found"]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Database error: " . $e->getMessage()]);
        }
    }
    
    public function create() {
        $data = json_decode(file_get_contents("php://input"));
        
        if (!isset($data->name) || !isset($data->date) || !isset($data->circuit)) {
            http_response_code(400);
            echo json_encode(["error" => "Missing required fields"]);
            return;
        }
        
        $query = "INSERT INTO races (name, date, circuit, category) VALUES (:name, :date, :circuit, :category)";
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(":name", $data->name);
        $stmt->bindParam(":date", $data->date);
        $stmt->bindParam(":circuit", $data->circuit);
        $stmt->bindParam(":category", $data->category);
        
        try {
            if ($stmt->execute()) {
                http_response_code(201);
                echo json_encode(["message" => "Race created successfully"]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Unable to create race"]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Database error: " . $e->getMessage()]);
        }
    }
    
    public function update($id) {
        $data = json_decode(file_get_contents("php://input"));
        
        if (!isset($data->name) || !isset($data->date) || !isset($data->circuit)) {
            http_response_code(400);
            echo json_encode(["error" => "Missing required fields"]);
            return;
        }
        
        $query = "UPDATE races SET name = :name, date = :date, circuit = :circuit, category = :category WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(":id", $id);
        $stmt->bindParam(":name", $data->name);
        $stmt->bindParam(":date", $data->date);
        $stmt->bindParam(":circuit", $data->circuit);
        $stmt->bindParam(":category", $data->category);
        
        try {
            if ($stmt->execute()) {
                http_response_code(200);
                echo json_encode(["message" => "Race updated successfully"]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Unable to update race"]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Database error: " . $e->getMessage()]);
        }
    }
    
    public function delete($id) {
        $query = "DELETE FROM races WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $id);
        
        try {
            if ($stmt->execute()) {
                http_response_code(200);
                echo json_encode(["message" => "Race deleted successfully"]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Unable to delete race"]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Database error: " . $e->getMessage()]);
        }
    }
}
?>