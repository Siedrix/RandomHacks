<?php 
//this file a really crappy server side app
//Change it for your server side app
//
//Im sure your server side app will rock
$array = array(
	'action' => 'dance'
);

$json = json_encode($array);

header('Content-type: application/json');
echo $json;
