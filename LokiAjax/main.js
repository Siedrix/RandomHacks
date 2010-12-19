$(document).ready(function(){
	$.loki.console.log({type:"init",message:"Hello"});
	$.loki.ajax({
		'debbug':false,
		'data':'loki=true',
		'type':'GET',
		'template':'myTemplate',
		'target':'#lokiAjax',
		'url':'server/index.php',
		'debbugUrl': 'json/test.php'
	});

});