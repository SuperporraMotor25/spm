<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/AuthMiddleware.php';

class PredictionController {
    private $conn;
    
    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }
    
    public function create() {
        $user = AuthMiddleware::authenticate();
        $data = json_decode(file_get_contents("php://input"));
        
        if (!isset($data->race_id) || !isset($data->pilot_id) || !isset($data->predicted_position)) {
            http_response_code(400);
            echo json_encode(["error" => "Missing required fields"]);
            return;
        }
        
        // Verificar si la carrera está pendiente
        $query = "SELECT status FROM races WHERE id = :race_id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":race_id", $data->race_id);
        
        try {
            $stmt->execute();
            $race = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if (!$race || $race['status'] !== 'pending') {
                http_response_code(400);
                echo json_encode(["error" => "Cannot make predictions for this race"]);
                return;
            }
            
            // Verificar si el usuario ya tiene una predicción para esta carrera
            $query = "SELECT id FROM predictions WHERE user_id = :user_id AND race_id = :race_id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":user_id", $user->user_id);
            $stmt->bindParam(":race_id", $data->race_id);
            $stmt->execute();
            
            if ($stmt->rowCount() > 0) {
                http_response_code(400);
                echo json_encode(["error" => "You already made a prediction for this race"]);
                return;
            }
            
            // Crear la predicción
            $query = "INSERT INTO predictions (user_id, race_id, pilot_id, predicted_position) VALUES (:user_id, :race_id, :pilot_id, :predicted_position)";
            $stmt = $this->conn->prepare($query);
            
            $stmt->bindParam(":user_id", $user->user_id);
            $stmt->bindParam(":race_id", $data->race_id);
            $stmt->bindParam(":pilot_id", $data->pilot_id);
            $stmt->bindParam(":predicted_position", $data->predicted_position);
            
            if ($stmt->execute()) {
                http_response_code(201);
                echo json_encode(["message" => "Prediction created successfully"]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Unable to create prediction"]);
            }
            
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Database error: " . $e->getMessage()]);
        }
    }
    
    public function getUserPredictions() {
        $user = AuthMiddleware::authenticate();
        
        $query = "SELECT p.*, r.name as race_name, pi.name as pilot_name 
                 FROM predictions p 
                 JOIN races r ON p.race_id = r.id 
                 JOIN pilots pi ON p.pilot_id = pi.id 
                 WHERE p.user_id = :user_id 
                 ORDER BY r.date DESC";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":user_id", $user->user_id);
        
        try {
            $stmt->execute();
            $predictions = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            http_response_code(200);
            echo json_encode(["data" => $predictions]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Database error: " . $e->getMessage()]);
        }
    }
    
    public function calculatePoints($race_id) {
        $admin = AuthMiddleware::isAdmin();
        
        $this->conn->beginTransaction();
        
        try {
            // Obtener resultados reales de la carrera
            $query = "SELECT pilot_id, position FROM race_results WHERE race_id = :race_id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":race_id", $race_id);
            $stmt->execute();
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            if (empty($results)) {
                throw new Exception("No race results found");
            }
            
            // Obtener predicciones de usuarios
            $query = "SELECT id, user_id, pilot_id, predicted_position FROM predictions WHERE race_id = :race_id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":race_id", $race_id);
            $stmt->execute();
            $predictions = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Calcular puntos para cada predicción
            foreach ($predictions as $prediction) {
                $points = 0;
                foreach ($results as $result) {
                    if ($prediction['pilot_id'] == $result['pilot_id']) {
                        // Puntos por posición exacta
                        if ($prediction['predicted_position'] == $result['position']) {
                            $points = 25;
                        }
                        // Puntos por diferencia de una posición
                        else if (abs($prediction['predicted_position'] - $result['position']) == 1) {
                            $points = 18;
                        }
                        // Puntos por diferencia de dos posiciones
                        else if (abs($prediction['predicted_position'] - $result['position']) == 2) {
                            $points = 15;
                        }
                        break;
                    }
                }
                
                // Actualizar puntos de la predicción
                $query = "UPDATE predictions SET points_earned = :points WHERE id = :id";
                $stmt = $this->conn->prepare($query);
                $stmt->bindParam(":points", $points);
                $stmt->bindParam(":id", $prediction['id']);
                $stmt->execute();
                
                // Actualizar puntos del usuario
                $query = "UPDATE users SET total_points = total_points + :points WHERE id = :user_id";
                $stmt = $this->conn->prepare($query);
                $stmt->bindParam(":points", $points);
                $stmt->bindParam(":user_id", $prediction['user_id']);
                $stmt->execute();
            }
            
            $this->conn->commit();
            http_response_code(200);
            echo json_encode(["message" => "Points calculated successfully"]);
            
        } catch (Exception $e) {
            $this->conn->rollBack();
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }
}
?>