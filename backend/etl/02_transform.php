<?php 


$data = include('01_extract.php');



$transformed_data = [];
foreach($data as $song) {
    if (!empty($song['artist'])) {

        $transformed_data[] = [
            'playfrom' => $song ['playFrom'],
            'artist' => $song['artist'],
            'title' => $song['title'],
            'audiourl' => $song['audioUrl'],
        ];
    }
};


/*echo '<pre>';
var_dump($transformed_data);
echo '</pre>';*/

return $transformed_data;