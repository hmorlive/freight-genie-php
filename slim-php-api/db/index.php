<?php

use PDO;

function getDB() {
    $path = __DIR__ . '/mount/efs/quotes-db.sqlite';
    $dsn = "sqlite:$path";

    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ];

    if (!file_exists($path)) {
        initializeDB($path);
    }

    try {
        $pdo = new PDO($dsn, null, null, $options);
        return $pdo;
    } catch (\PDOException $e) {
        throw new \PDOException($e->getMessage(), (int)$e->getCode());
    }
}

function initializeDB($path) {
    // Connect to a new SQLite database which will create the file
    $pdo = new PDO("sqlite:$path");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Path to SQL file
    $sqlPath = __DIR__ . '/setup.sql';
    if (!file_exists($sqlPath)) {
        throw new Exception('SQL file for database setup not found.');
    }

    // Read and execute SQL file
    $sql = file_get_contents($sqlPath);
    $pdo->exec($sql);
}