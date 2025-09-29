<?php

function fetchEnergyRadioData() {
    $url = "https://energy.ch/api/channels/bern/playouts";

    // Initialisiert eine cURL-Sitzung
    $ch = curl_init($url);

    // Setzt Optionen
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Führt die cURL-Sitzung aus und erhält den Inhalt
    $response = curl_exec($ch);

    // Schließt die cURL-Sitzung
    curl_close($ch);

    // Dekodiert die JSON-Antwort und gibt Daten zurück
    return json_decode($response, true);
}

/*echo '<pre>';
var_dump(fetchEnergyRadioData());
echo '</pre>';*/


return fetchEnergyRadioData();

?>