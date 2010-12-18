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
					.select(function(item){ return item.type.search(type) >= 0})
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
		},
		template : {
			_templates : [],
			load : function(template,callback){
				that = this;
				$.loki.console.log({type:'template-loading-init',message:'Starting to load template '+template});
				$.ajax({
					'url': lokiDebbugStatus.root + 'templates/' +template+ '.html',
					'success': function(data){
						$.loki.console.log({type:'template-loading-finish',message:'Finished to load template '+template});
						that._templates.push(template);
						$.template( template, data);
						//$.tmpl( "myTmpl", {} ).appendTo( "body" );
						callback(data);
					}
				})
			},
			loaded : function(){
				return this._templates;
			},
			flush : function(){
				
			},
			isLoaded : function(template){
				if($.template[template]){
					return true;
				}else{
					return false;
				}
			}
		},
		ajax : function(options){
			ajaxOptions = {};
			
			if(lokiDebbugStatus.server != 'active'){
				ajaxOptions.url = lokiDebbugStatus.root + options.debbugUrl;
			}else{
				ajaxOptions.url = lokiDebbugStatus.root + options.url;
			}
			ajaxOptions.data = options.data;
			ajaxOptions.success = options.success;
			ajaxOptions.type = options.type;

			if(options.template){
				ajaxOptions.success = function(data){
					$.tmpl( options.template, data ).appendTo( options.target );
				}
				
				if($.loki.template.isLoaded(options.template)){
					$.ajax(ajaxOptions);
				}else{
					$.loadTemplate(options.template,function(){
						$.ajax(ajaxOptions);
					});
				}
			}else{
				$.ajax(ajaxOptions);
			}			
		}
	}
	
	$.loki.console.log({type:'init',message:'Loki ready to rock'});
})(jQuery);
