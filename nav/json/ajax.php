<?php 
//this file is a static file
//will always return the same information
//
//Made for testing purpuse.
//Eventually you would add a server side to conect to
$array = array(
	'title' => 'Ajax',
	'content' => 'This is a wrapper for jQuery\'s ajax function, allowing us to test one page aplications with out having to have a server, also has template funcionalities',
	'functions' => array (
		'Ajax' => 'This functions can recibe jQuery regular parameters, but also can control using a test url or a server url, also, template to be loaded and targer DOM element to render'
	)
);

$json = json_encode($array);

header('Content-type: application/json');
echo $json;
