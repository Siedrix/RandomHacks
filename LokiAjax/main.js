$(document).ready(function(){
	$.lokiAjax({
		'debbug':false,
		'data':'loki=true',
		'type':'GET',
		'url':'server/index.php',
		'debbugUrl': 'json/test.php',
		'success': function(data){
			console.log('Yei i hava success');
			console.log(data);
		}
	});
});
