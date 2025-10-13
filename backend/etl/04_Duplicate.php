<?php

function isDuplicate($pdo, $timestamp) {
    try {
        $sql = "SELECT COUNT(*) FROM entries WHERE playfrom = :playfrom";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['playfrom' => $playfrom]);
        return $stmt->fetchColumn() > 0;
    } catch (PDOException $e) {
        return false;
    }
}



try {
    $pdo = new PDO($dsn, $username, $password, $options);
    $sql = "INSERT INTO entries (title, artist, playfrom, audiourl) VALUES (?, ?, ?,?)";
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