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

    // alle titles und artists zählen
    $titles = array_count_values(array_column($result, 'title'));
    $artists = array_count_values(array_column($result, 'artist'));

    // Top 3 absteigend sortieren
    arsort($titles); 
    $titles = array_slice($titles, 0, 3, true);
    $titles_detail = [];
    foreach($titles as $title => $count) {
        $details_id = array_search($title, array_column($result, 'title'));
        $result[$details_id]['count'] = $count;
        $titles_detail[] = $result[$details_id];
    }


    arsort($artists); 
    $artists = array_slice($artists, 0, 3, true);
    $artists_detail = [];
    foreach($artists as $artist => $count) {
        $details_id = array_search($artist, array_column($result, 'artist'));
        $result[$details_id]['count'] = $count;
        $artists_detail[] = $result[$details_id];
    }

    // Top 3 Ausgabe als JSON
    echo json_encode([
        'top_titles' => $titles_detail,
        'top_artists' => $artists_detail,
    ]);

} catch (PDOException $e) {
    die("Verbindung zur Datenbank konnte nicht hergestellt werden: " . $e->getMessage());
}