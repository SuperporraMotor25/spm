<?php
require_once __DIR__ . '/../config/jwt.php';
require_once __DIR__ . '/../utils/Logger.php';

class AuthMiddleware {
    public static function authenticate() {
        try {
            $token = JWT::getBearerToken();
            
            if (!$token) {
                Logger::error('Intento de acceso sin token');
                http_response_code(401);
                echo json_encode([
                    'error' => 'No se ha proporcionado el token de autenticación',
                    'code' => 'AUTH001'
                ]);
                exit();
            }
            
            Logger::info('Verificando token JWT', ['token_length' => strlen($token)]);
            $decoded = JWT::decode($token);
            
            if (!$decoded || !isset($decoded->user_id)) {
                Logger::error('Token inválido o mal formado', [
                    'token_valid' => (bool)$decoded,
                    'has_user_id' => isset($decoded->user_id)
                ]);
                http_response_code(401);
                echo json_encode([
                    'error' => 'Token de autenticación inválido',
                    'code' => 'AUTH002'
                ]);
                exit();
            }
            
            Logger::info('Usuario autenticado correctamente', ['user_id' => $decoded->user_id]);
            return $decoded;
            
        } catch (Exception $e) {
            Logger::error('Error en autenticación', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            http_response_code(401);
            echo json_encode([
                'error' => 'Error de autenticación: ' . $e->getMessage(),
                'code' => 'AUTH003'
            ]);
            exit();
        }
    }
    
    public static function isAdmin() {
        try {
            $decoded = self::authenticate();
            
            if (!isset($decoded->role) || $decoded->role !== 'admin') {
                http_response_code(403);
                echo json_encode(['error' => 'Access denied: Admin privileges required']);
                exit();
            }
            
            return $decoded;
            
        } catch (Exception $e) {
            http_response_code(403);
            echo json_encode(['error' => 'Access denied: ' . $e->getMessage()]);
            exit();
        }
    }
}
?>