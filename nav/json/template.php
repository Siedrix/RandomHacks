<?php 
//this file is a static file
//will always return the same information
//
//Made for testing purpuse.
//Eventually you would add a server side to conect to
$array = array(
	'title' => 'Template',
	'content' => 'Template functions enable to load jQuery Templates from the template folder, helps loki.ajax to render information quite ease. Check <a href="http://api.jquery.com/jQuery.template/">jQuery template</a> for more documentation.',
	'functions' => array(
		'load' => 'Loads a new template',
		'loaded' => 'Return an array with all loaded templates',
		'isLoaded' => 'Check if an array is loades',
		'flush' => 'Remove a template form the list and from $.template',
		'add' => 'Adds a template to the list, private function'
	)
);

$json = json_encode($array);

header('Content-type: application/json');
echo $json;
