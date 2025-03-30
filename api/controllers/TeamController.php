<?php
require_once __DIR__ . '/../config/database.php';

class TeamController {
    private $conn;
    
    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }
    
    public function index() {
        $query = "SELECT * FROM teams ORDER BY points DESC";
        $stmt = $this->conn->prepare($query);
        
        try {
            $stmt->execute();
            $teams = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            http_response_code(200);
            echo json_encode(["data" => $teams]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Database error: " . $e->getMessage()]);
        }
    }
    
    public function show($id) {
        $query = "SELECT t.*, GROUP_CONCAT(p.name) as pilots FROM teams t LEFT JOIN team_pilots tp ON t.id = tp.team_id LEFT JOIN pilots p ON tp.pilot_id = p.id WHERE t.id = :id GROUP BY t.id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $id);
        
        try {
            $stmt->execute();
            $team = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($team) {
                // Convert pilots string to array
                $team['pilots'] = $team['pilots'] ? explode(',', $team['pilots']) : [];
                
                http_response_code(200);
                echo json_encode(["data" => $team]);
            } else {
                http_response_code(404);
                echo json_encode(["error" => "Team not found"]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Database error: " . $e->getMessage()]);
        }
    }
    
    public function create() {
        $data = json_decode(file_get_contents("php://input"));
        
        if (!isset($data->name) || !isset($data->category)) {
            http_response_code(400);
            echo json_encode(["error" => "Missing required fields"]);
            return;
        }
        
        $this->conn->beginTransaction();
        
        try {
            // Insert team
            $query = "INSERT INTO teams (name, category, points) VALUES (:name, :category, 0)";
            $stmt = $this->conn->prepare($query);
            
            $stmt->bindParam(":name", $data->name);
            $stmt->bindParam(":category", $data->category);
            
            if (!$stmt->execute()) {
                throw new Exception("Failed to create team");
            }
            
            $team_id = $this->conn->lastInsertId();
            
            // Add pilots if provided
            if (isset($data->pilots) && is_array($data->pilots)) {
                $query = "INSERT INTO team_pilots (team_id, pilot_id) VALUES (:team_id, :pilot_id)";
                $stmt = $this->conn->prepare($query);
                
                foreach ($data->pilots as $pilot_id) {
                    $stmt->bindParam(":team_id", $team_id);
                    $stmt->bindParam(":pilot_id", $pilot_id);
                    
                    if (!$stmt->execute()) {
                        throw new Exception("Failed to add pilot to team");
                    }
                }
            }
            
            $this->conn->commit();
            http_response_code(201);
            echo json_encode(["message" => "Team created successfully", "id" => $team_id]);
            
        } catch (Exception $e) {
            $this->conn->rollBack();
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }
    
    public function update($id) {
        $data = json_decode(file_get_contents("php://input"));
        
        if (!isset($data->name) || !isset($data->category)) {
            http_response_code(400);
            echo json_encode(["error" => "Missing required fields"]);
            return;
        }
        
        $this->conn->beginTransaction();
        
        try {
            // Update team
            $query = "UPDATE teams SET name = :name, category = :category WHERE id = :id";
            $stmt = $this->conn->prepare($query);
            
            $stmt->bindParam(":id", $id);
            $stmt->bindParam(":name", $data->name);
            $stmt->bindParam(":category", $data->category);
            
            if (!$stmt->execute()) {
                throw new Exception("Failed to update team");
            }
            
            // Update pilots if provided
            if (isset($data->pilots) && is_array($data->pilots)) {
                // Remove existing pilots
                $query = "DELETE FROM team_pilots WHERE team_id = :team_id";
                $stmt = $this->conn->prepare($query);
                $stmt->bindParam(":team_id", $id);
                
                if (!$stmt->execute()) {
                    throw new Exception("Failed to remove existing pilots");
                }
                
                // Add new pilots
                $query = "INSERT INTO team_pilots (team_id, pilot_id) VALUES (:team_id, :pilot_id)";
                $stmt = $this->conn->prepare($query);
                
                foreach ($data->pilots as $pilot_id) {
                    $stmt->bindParam(":team_id", $id);
                    $stmt->bindParam(":pilot_id", $pilot_id);
                    
                    if (!$stmt->execute()) {
                        throw new Exception("Failed to add pilot to team");
                    }
                }
            }
            
            $this->conn->commit();
            http_response_code(200);
            echo json_encode(["message" => "Team updated successfully"]);
            
        } catch (Exception $e) {
            $this->conn->rollBack();
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }
    
    public function delete($id) {
        $this->conn->beginTransaction();
        
        try {
            // Delete team pilots first
            $query = "DELETE FROM team_pilots WHERE team_id = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":id", $id);
            
            if (!$stmt->execute()) {
                throw new Exception("Failed to delete team pilots");
            }
            
            // Delete team
            $query = "DELETE FROM teams WHERE id = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":id", $id);
            
            if (!$stmt->execute()) {
                throw new Exception("Failed to delete team");
            }
            
            $this->conn->commit();
            http_response_code(200);
            echo json_encode(["message" => "Team deleted successfully"]);
            
        } catch (Exception $e) {
            $this->conn->rollBack();
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }
    
    public function updatePoints($id, $points) {
        $query = "UPDATE teams SET points = points + :points WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(":id", $id);
        $stmt->bindParam(":points", $points);
        
        try {
            if ($stmt->execute()) {
                http_response_code(200);
                echo json_encode(["message" => "Team points updated successfully"]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Unable to update team points"]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Database error: " . $e->getMessage()]);
        }
    }
}
?>