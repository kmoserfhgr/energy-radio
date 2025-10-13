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
    $startOfWeek = date('Y-m-d', strtotime('monday this week', strtotime($date)));
    $endOfWeek   = date('Y-m-d', strtotime('sunday this week', strtotime($date)));

    // -> SQL für Zeitraum
    $sql = "SELECT * FROM energy_radio 
            WHERE DATE(playfrom) BETWEEN :startOfWeek AND :endOfWeek
            ORDER BY playfrom ASC";
    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        'startOfWeek' => $startOfWeek,
        'endOfWeek'   => $endOfWeek
    ]);

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);

} catch (PDOException $e) {
    die("Verbindung zur Datenbank konnte nicht hergestellt werden: " . $e->getMessage());
}