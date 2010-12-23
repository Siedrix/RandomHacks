$(document).ready(function(){
	$.loki.console.log({type:"init",message:"Stating Main"});
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