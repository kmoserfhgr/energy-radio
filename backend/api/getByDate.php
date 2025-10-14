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

    // -> sql statement schreioben
    $sql = "SELECT * FROM energy_radio WHERE DATE(playfrom) = :date";
    $stmt = $pdo->prepare($sql);

    // -> sql statement ausführen
    $stmt->execute([ 'date' => $date ]);

    // -> daten in empfang nehmen
    $result = $stmt->fetchAll();

    // alle titles und artists zählen
    $titles = array_count_values(array_column($result, 'title'));
    $artists = array_count_values(array_column($result, 'artist'));

    // Top 3 absteigend sortieren
    arsort($titles); $titles = array_slice($titles, 0, 3, true);
    arsort($artists); $artists = array_slice($artists, 0, 3, true);

    // Top 3 Ausgabe als JSON
    echo json_encode([
        'top_titles' => $titles,
        'top_artists' => $artists
    ]);

   /* echo json_encode($result);*/


} catch (PDOException $e) {
    die("Verbindung zur Datenbank konnte nicht hergestellt werden: " . $e->getMessage());
}