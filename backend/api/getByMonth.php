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
    
     // -> alle titles und artists zählen
    $titles = array_count_values(array_column($result, 'title')); // <-- Ergänzung
    $artists = array_count_values(array_column($result, 'artist')); // <-- Ergänzung

    // -> absteigend sortieren und Top 3
    arsort($titles); $titles = array_slice($titles, 0, 3, true); // <-- Ergänzung
    arsort($artists); $artists = array_slice($artists, 0, 3, true); // <-- Ergänzung

    // -> Ausgabe als JSON mit Top 3
    echo json_encode([
        'top_titles' => $titles,
        'top_artists' => $artists
    ]);

    /*echo json_encode($result);*/

} catch (PDOException $e) {
    die("Verbindung zur Datenbank konnte nicht hergestellt werden: " . $e->getMessage());
}