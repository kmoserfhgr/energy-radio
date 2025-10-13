<?php

$data = include('02_transform.php');

/*echo '<pre>';
print_r($data);
echo '</pre>';*/

// -> Datenbank zugangsdaten einbinden
require_once '../config.php';

// -> verbindung mit der Datenbank
try {
    $pdo = new PDO($dsn, $username, $password, $options);
    $sql = "INSERT INTO energy_radio (title, artist, playfrom, audiourl) VALUES (?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);

    foreach($data as $song) {
            $stmt->execute([
                $song['title'],
                $song['artist'],
                $song['playfrom'],
                $song['audiourl']
     ]);
    }

    echo "Daten erfolgreich eingefügt.";
} catch (PDOException $e) {
    die("Verbindung zur Datenbank konnte nicht hergestellt werden: " . $e->getMessage());
}

