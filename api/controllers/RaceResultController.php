<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/AuthMiddleware.php';

class RaceResultController {
    private $conn;
    
    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }
    
    public function create() {
        $admin = AuthMiddleware::isAdmin();
        $data = json_decode(file_get_contents("php://input"));
        
        if (!isset($data->race_id) || !isset($data->results) || !is_array($data->results)) {
            http_response_code(400);
            echo json_encode(["error" => "Missing required fields"]);
            return;
        }
        
        $this->conn->beginTransaction();
        
        try {
            // Verificar si ya existen resultados para esta carrera
            $query = "SELECT id FROM race_results WHERE race_id = :race_id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":race_id", $data->race_id);
            $stmt->execute();
            
            if ($stmt->rowCount() > 0) {
                throw new Exception("Results already exist for this race");
            }
            
            // Actualizar estado de la carrera a 'finished'
            $query = "UPDATE races SET status = 'finished' WHERE id = :race_id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":race_id", $data->race_id);
            
            if (!$stmt->execute()) {
                throw new Exception("Failed to update race status");
            }
            
            // Insertar resultados y actualizar puntos de pilotos
            $query = "INSERT INTO race_results (race_id, pilot_id, position, points) VALUES (:race_id, :pilot_id, :position, :points)";
            $stmt = $this->conn->prepare($query);
            
            foreach ($data->results as $result) {
                if (!isset($result->pilot_id) || !isset($result->position)) {
                    throw new Exception("Invalid result data");
                }
                
                // Calcular puntos según la posición
                $points = $this->calculatePoints($result->position);
                
                $stmt->bindParam(":race_id", $data->race_id);
                $stmt->bindParam(":pilot_id", $result->pilot_id);
                $stmt->bindParam(":position", $result->position);
                $stmt->bindParam(":points", $points);
                
                if (!$stmt->execute()) {
                    throw new Exception("Failed to insert race result");
                }
                
                // Actualizar puntos del piloto
                $query_update = "UPDATE pilots SET points = points + :points WHERE id = :pilot_id";
                $stmt_update = $this->conn->prepare($query_update);
                $stmt_update->bindParam(":points", $points);
                $stmt_update->bindParam(":pilot_id", $result->pilot_id);
                
                if (!$stmt_update->execute()) {
                    throw new Exception("Failed to update pilot points");
                }
            }
            
            $this->conn->commit();
            http_response_code(201);
            echo json_encode(["message" => "Race results created successfully"]);
            
        } catch (Exception $e) {
            $this->conn->rollBack();
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }
    
    private function calculatePoints($position) {
        $pointsSystem = [
            1 => 25,  // 1st place
            2 => 18,  // 2nd place
            3 => 15,  // 3rd place
            4 => 12,  // 4th place
            5 => 10,  // 5th place
            6 => 8,   // 6th place
            7 => 6,   // 7th place
            8 => 4,   // 8th place
            9 => 2,   // 9th place
            10 => 1   // 10th place
        ];
        
        return isset($pointsSystem[$position]) ? $pointsSystem[$position] : 0;
    }
    
    public function getRaceResults($race_id) {
        $query = "SELECT rr.*, p.name as pilot_name, p.team as team_name 
                 FROM race_results rr 
                 JOIN pilots p ON rr.pilot_id = p.id 
                 WHERE rr.race_id = :race_id 
                 ORDER BY rr.position ASC";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":race_id", $race_id);
        
        try {
            $stmt->execute();
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            http_response_code(200);
            echo json_encode(["data" => $results]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Database error: " . $e->getMessage()]);
        }
    }
}
?>