<?php

// -> Datenbank zugangsdaten einbinden
require_once '../config.php';

// -> json aktivieren
header('Content-Type: application/json');

// -> verbindung mit der Datenbank
try {
    // -> login auf datenbank
    $pdo = new PDO($dsn, $username, $password, $options);

    $date = $_GET['date'];

    // -> Wochenstart (Montag) und -ende (Sonntag) berechnen
    $startOfMonth = date('Y-m-01', strtotime($date));
    $endOfMonth   = date('Y-m-t', strtotime($date));

    // -> SQL für Zeitraum
    $sql = "SELECT * FROM energy_radio 
            WHERE DATE(playfrom) BETWEEN :startOfMonth AND :endOfMonth
            ORDER BY playfrom ASC";
    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        'startOfMonth' => $startOfMonth,
        'endOfMonth'   => $endOfMonth
    ]);

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);

} catch (PDOException $e) {
    die("Verbindung zur Datenbank konnte nicht hergestellt werden: " . $e->getMessage());
}