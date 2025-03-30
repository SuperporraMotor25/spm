<?php
require_once __DIR__ . '/../config/config.php';

class Logger {
    private static $errorLogFile;
    private static $infoLogFile;
    private static $isInitialized = false;

    private static function initialize() {
        if (!self::$isInitialized) {
            self::$errorLogFile = ERROR_LOG_FILE;
            self::$infoLogFile = INFO_LOG_FILE;
            
            $logDir = dirname(self::$errorLogFile);
            if (!file_exists($logDir)) {
                mkdir($logDir, 0777, true);
            }
            self::$isInitialized = true;
        }
    }

    public static function log($message, $type = 'ERROR', $context = []) {
        self::initialize();
        
        $timestamp = date('Y-m-d H:i:s');
        $contextStr = !empty($context) ? ' Context: ' . json_encode($context) : '';
        $logMessage = "[$timestamp] $type: $message$contextStr\n";
        
        $logFile = $type === 'ERROR' ? self::$errorLogFile : self::$infoLogFile;
        error_log($logMessage, 3, $logFile);
    }

    public static function error($message, $context = []) {
        self::log($message, 'ERROR', $context);
    }

    public static function info($message, $context = []) {
        self::log($message, 'INFO', $context);
    }

    public static function debug($message, $context = []) {
        if (defined('DEBUG_MODE') && DEBUG_MODE) {
            self::log($message, 'DEBUG', $context);
        }
    }
}
?>