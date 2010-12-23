(function($){
	// Our code here...
	$.loki = {
		_data:{},
		init : function(data){
			$.loki.console.log({type:"init",message:"Inicialized"});
			this._data = data;
		},
		console : {
			_messages : [],
			log : function(data){
				this._messages.push(data);
				if($.loki._data.debbug){
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
				if($.loki._data.debbug){
					console.log('Flushing Console');
				}
			}
		},
		template : {
			_templates : [],
			load : function(template,callback){
				var that = this;
				$.loki.console.log({type:'template-loading-init',message:'Starting to load template '+template});
				$.ajax({
					'url': $.loki._data.root + 'templates/' +template+ '.html',
					'success': function(data){
						$.loki.console.log({type:'template-loading-finish',message:'Finished to load template '+template});
						$.loki.template.add(template);
						$.template( template, data);
						callback(data);
					}
				})
			},
			add : function(template){
				this._templates.push(template);
			},
			loaded : function(){
				$.loki.console.log({type:'template-check-loaded',message:'Check for templates loaded'});
				return this._templates;
			},
			flush : function(template){
				delete $.template[template];
				this._templates = _.select(this._templates, function(item){if(item!=template){return item}});
				$.loki.console.log({type:'template-flushed',message:'Template '+template+' flushed'});
			},
			isLoaded : function(template){
				$.loki.console.log({type:'template-check-loaded-single',message:'Check if template '+template+' is loaded'});
				if($.template[template]){
					return true;
				}else{
					return false;
				}
			}
		},
		ajax : function(options){
			ajaxOptions = {};
			
			if($.loki._data.server != 'active'){
				$.loki.console.log({type:"server-options",message:"Server is not Active"});
				ajaxOptions.url = $.loki._data.root + options.debbugUrl;
			}else{
				$.loki.console.log({type:"server-options",message:"Server is Active"});
				ajaxOptions.url = $.loki._data.root + options.url;
			}
			ajaxOptions.data = options.data;
			ajaxOptions.success = options.success;
			ajaxOptions.type = options.type;

			if(options.template){
				ajaxOptions.success = function(data){
					$.tmpl( options.template, data ).appendTo( options.target );
				}
				
				if($.loki.template.isLoaded(options.template)){
					$.loki.console.log({type:"ajax-request-template",message:"Ajax request with template "+options.template});
					$.ajax(ajaxOptions);
				}else{
					$.loki.console.log({type:"ajax-request",message:"Ajax request to "+ajaxOptions.url});
					$.loki.template.load(options.template,function(){
						$.ajax(ajaxOptions);
					});
				}
			}else{
				$.loki.console.log({type:"ajax-options-template",message:"Ajax request with no template"});
				$.ajax(ajaxOptions);
			}			
		}
		
	}
	
})(jQuery);
