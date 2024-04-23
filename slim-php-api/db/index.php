<?php

use PDO;

function getDB() {
    $path = __DIR__ . '/mnt/efs/quotes-db.sqlite';
    $dsn = "sqlite:$path";

    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ];

    // Check if the database file exists and initialize if not
    if (!file_exists($path)) {
        initializeDB($path);
    }

    try {
        $pdo = new PDO($dsn, null, null, $options);
        return $pdo;
    } catch (\PDOException $e) {
        error_log("Failed to connect to the database: " . $e->getMessage());
        throw new \PDOException("Database connection error: " . $e->getMessage(), (int)$e->getCode());
    }
}

function initializeDB($path) {
    try {
        $pdo = new PDO("sqlite:$path");
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sqlPath = __DIR__ . '/setup.sql';
        if (!file_exists($sqlPath)) {
            throw new Exception('SQL file for database setup not found at ' . $sqlPath);
        }

        $sql = file_get_contents($sqlPath);
        if ($sql === false) {
            throw new Exception('Unable to read SQL file at ' . $sqlPath);
        }

        $pdo->exec($sql);
    } catch (\PDOException $e) {
        error_log("Initialization failed: PDOException - " . $e->getMessage());
        throw new \PDOException("Initialization failed due to PDOException: " . $e->getMessage(), (int)$e->getCode());
    } catch (\Exception $e) {
        error_log("Initialization failed: General Exception - " . $e->getMessage());
        throw new \Exception("Initialization failed due to Exception: " . $e->getMessage(), (int)$e->getCode());
    }
}