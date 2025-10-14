<?php

$data = include('02_transform.php');

/*echo '<pre>';
print_r($data);
echo '</pre>';*/

// -> Datenbank zugangsdaten einbinden
require_once '../config.php';

function isDuplicate($pdo, $playfrom) {
    try {
        $sql = "SELECT COUNT(*) FROM energy_radio WHERE playfrom = :playfrom";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['playfrom' => $playfrom]);
        return $stmt->fetchColumn() > 0;
    } catch (PDOException $e) {
        return false;
    }
}

// -> verbindung mit der Datenbank
try {
    $pdo = new PDO($dsn, $username, $password, $options);
    $sql = "INSERT INTO energy_radio (title, artist, playfrom, audiourl) VALUES (?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);

     foreach($data as $radio_energy) {
        if (!isDuplicate($pdo, $radio_energy['playfrom'])) {
            $stmt->execute([
                $radio_energy['title'],
                $radio_energy['artist'],
                $radio_energy['playfrom'],
                $radio_energy['audiourl']
            ]);
        }
    } 

    echo "Daten erfolgreich eingefügt.";
} catch (PDOException $e) {
    die("Verbindung zur Datenbank konnte nicht hergestellt werden: " . $e->getMessage());
}

