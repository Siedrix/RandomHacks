(function($){
	// Our code here...
	console.log('Loki Ajax ready to rock');

	
	$.lokiAjax = function(options) {
		//.. codigo
		ajaxOptions = {};

		if(options.debbug){
			console.log('Im doing loki ajax debbug, no server');
			ajaxOptions.url = options.debbugUrl;
		}else{
			console.log('Im doing loki ajax, now with my server');
			ajaxOptions.url = options.url;
		}
		ajaxOptions.data = options.data;
		ajaxOptions.success = options.success;
		ajaxOptions.type = options.type;

		console.log(ajaxOptions);

		$.ajax(ajaxOptions);
	}

})(jQuery);
