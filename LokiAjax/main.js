$(document).ready(function(){	
	/*
	console.log($.isTemplateLoaded('myTemplate'))
	$.loadTemplate( "myTemplate", function(data){
	   console.log($.isTemplateLoaded('myTemplate'));
	   console.log(data);
	   $.tmpl( "myTemplate", {} ).appendTo( "body" );
	});
	*/

	$.lokiAjax({
		'debbug':false,
		'data':'loki=true',
		'type':'GET',
		'template':'myTemplate',
		'target':'body',
		'url':'server/index.php',
		'debbugUrl': 'json/test.php'
	});
});
