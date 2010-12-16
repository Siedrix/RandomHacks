lokiConsole = console;
lokiConsole.debbug = function(object){
	if(lokiDebbugStatus.debbug){
		console.log(object);
	}
}

lokiConsole.debbug({action:'dance'});

(function($){
	// Our code here...
	$.loki = {
		console : {
			_messages : [],
			log : function(data){
				this._messages.push(data);
				if(lokiDebbugStatus.debbug){
					console.log(data.message);
				}
			},
			getLogByType : function(type){
				return _(this._messages).chain()
					.select(function(item){ return item.type == type})
					.map(function(item){ return item.message})
					.value();
			},
			getLog : function(){
				return _(this._messages).chain()
					.map(function(item){ return item.type+':'+item.message})
					.value();			
			},
			flush : function(){
				this._messages = [];
				if(lokiDebbugStatus.debbug){
					console.log('Flushing Console');
				}				
			}
		}
	}
	
	$.loki.console.log({type:'init',message:'Loki ready to rock'});
	
	$.lokiAjax = function(options) {
		ajaxOptions = {};
		
		lokiConsole.debbug(options.template);
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

		if(options.template){
			ajaxOptions.success = function(data){
				lokiConsole.debbug('Yei i hava templated success');
				$.tmpl( options.template, data ).appendTo( options.target );
			}
			
			if($.isTemplateLoaded(options.template)){
				$.ajax(ajaxOptions);
			}else{
				$.loadTemplate(options.template,function(){
					$.ajax(ajaxOptions)
				});
			}
		}else{
			$.ajax(ajaxOptions);
		}
	}

	$.isTemplateLoaded = function(template){
		if($.template[template]){
			return true;
		}else{
			return false;
		}
	}
	
	$.loadTemplate = function(template,callback){
		$.ajax({
			'url':'templates/'+template+'.html',
			'success': function(data){
				$.template( template, data);
				//$.tmpl( "myTmpl", {} ).appendTo( "body" );
				callback(data);
			}
		})
	}
})(jQuery);
