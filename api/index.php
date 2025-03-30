<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get request URI and method
$request_uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$request_method = $_SERVER['REQUEST_METHOD'];

// Remove base path from request URI if needed
$base_path = '/api';
$request_uri = str_replace($base_path, '', $request_uri);

// Basic routing
try {
    switch ($request_uri) {
        case '/auth/login':
            require __DIR__ . '/controllers/AuthController.php';
            $controller = new AuthController();
            if ($request_method === 'POST') {
                $controller->login();
            }
            break;

        case '/auth/register':
            require __DIR__ . '/controllers/AuthController.php';
            $controller = new AuthController();
            if ($request_method === 'POST') {
                $controller->register();
            }
            break;

        case '/races':
            require __DIR__ . '/controllers/RaceController.php';
            $controller = new RaceController();
            if ($request_method === 'GET') {
                $controller->index();
            }
            break;

        default:
            http_response_code(404);
            echo json_encode(['error' => 'Not Found']);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Internal Server Error', 'message' => $e->getMessage()]);
}
?>