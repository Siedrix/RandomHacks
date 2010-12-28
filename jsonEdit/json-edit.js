(function($){
	$.fn.inicialize = function(information, template){
		$(this).data('.information', information);
		$(this).data('.templateName', template);
		
		return this;
	}

	$.fn.setAsEditable = function() {
		if( !$(this).data('.editable') ){
			$(this).addClass('editable');
			$(this).data('.editable', true);
			//change for some template
			$(this).append('<div class="start-editing">Start Editing</div>');
		}else{
			//Do something?
		}
	}
	
	$.fn.renderDisplay = function() {
		console.log($(this).data('.information'));
		$(this).html(
			$.tmpl( $(this).data('.templateName'), $(this).data('.information') )
		);
		
		return this;
	}
	
	$.fn.renderEdit = function(){
		var elem = $(this);
		elem.html('');
		$.each(elem.data('.information') , function(i,item){
			//ToDo:change for a fancy template... with options
			elem.append('<div class="value-field"><span class="edit-label">'+i+'</span><input id="'+i+'" value="'+item+'"/></div>')
		});
		
		//Change for a button from labels buttom
		elem.append('<div class="save-edit-button">Save</div>');
		elem.append('<div class="new-edit-button">New</div>');
	}
	
})(jQuery);

$(document).ready(function(){
	$('body').delegate('.editable','hover',function(){
		$('.start-editing').fadeToggle();
	});
	
	$('body').delegate('.start-editing','click',function(){
		var editable = $(this).closest('.editable');
		editable.renderEdit()
	});

	$('body').delegate('.new-edit-button','click',function(){
		var editable = $(this).closest('.editable');
		//change for a fancy template...
		editable.append('<div class="value-field new"><input id="lable" class="lable"/><input id="value" class="value"/></div>');
		
	});

	$('body').delegate('.save-edit-button','click',function(){
		var data = htmlToJson(this);
		var editable = $(this).closest('.editable');
		editable.data('.information', data);
		editable.data('.editable', false);
		editable.renderDisplay().setAsEditable();
	});
});
//helpers
	//html to json function
	function htmlToJson(elem){
		foo = {};
		$.each($('.value-field'),function(i,item){
			if(!$(this).hasClass('new')){
				var id = $('input',$(this)).attr('id');
				var value = $('input',$(this)).val();

			}else{
				var id = $('#lable',$(this)).val();				
				var value = $('#value',$(this)).val();				
			}
			foo[id] = value;
		});

		return foo;
	}

/*
Todo
	needs delete value field button
	needs fancy template system
	needs delete "view" option
	
	needs to think if set editable is before render, to restart state
	needs fancy clean up, some parts of code or html could be fancier
	
	maybe something is missing...
*/