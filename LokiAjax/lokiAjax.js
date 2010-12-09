lokiConsole = console;
lokiConsole.debbug = function(object){
	if(lokiDebbugStatus.debbug){
		console.log(object);
	}
}

lokiConsole.debbug({action:'dance'});

(function($){
	// Our code here...
	lokiConsole.debbug('Loki Ajax ready to rock');

	
	$.lokiAjax = function(options) {
		ajaxOptions = {};

		if(lokiDebbugStatus.server != 'active'){
			lokiConsole.debbug('Im doing loki ajax debbug, no server');
			ajaxOptions.url = options.debbugUrl;
		}else{
			lokiConsole.debbug('Im doing loki ajax, now with my server');
			ajaxOptions.url = options.url;
		}
		ajaxOptions.data = options.data;
		ajaxOptions.success = options.success;
		ajaxOptions.type = options.type;

		lokiConsole.debbug(ajaxOptions);

		$.ajax(ajaxOptions);
	}

})(jQuery);
