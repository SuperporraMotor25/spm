<?php
// Configuración del modo de depuración
define('DEBUG_MODE', true);

// Configuración de logs
define('LOG_PATH', __DIR__ . '/../logs');
define('ERROR_LOG_FILE', LOG_PATH . '/error.log');
define('INFO_LOG_FILE', LOG_PATH . '/info.log');

// Configuración de errores de PHP
ini_set('display_errors', DEBUG_MODE ? '1' : '0');
ini_set('error_reporting', DEBUG_MODE ? E_ALL : E_ALL & ~E_DEPRECATED);
ini_set('log_errors', '1');
ini_set('error_log', ERROR_LOG_FILE);