<?php 
//this file is a static file
//will always return the same information
//
//Made for testing purpuse.
//Eventually you would add a server side to conect to
$array = array(
	'action' => 'eventually you will have a server to dance with'
);

$json = json_encode($array);

header('Content-type: application/json');
echo $json;
