// TextBox that knows how to render itself
QuestionChain.UiObject.CheckBox = new Class({
	Extends: QuestionChain.UiObject,
	
	initialize: function(json_bundle, ui_group, index){
		this.checked = this.value || json_bundle.checked;
		this.parent(json_bundle, ui_group, index);
	},
	
	add_element_listner: function(){
		var relay_event = "click:relay(#"+this.input_id()+")";
		document.id("question").addEvent(relay_event, this.listener_event);
	},
	
	element_listener: function(event){
		var element = $(event.target);
		var value = element.get("checked");
		this.rules.each(function(rule){
			rule._fire(value);
		});
	},
		
	form_element_value: function(){
		this.form_element().get("checked");
	},
	
	get_template: function(){
		return uiObjectsCheckboxTemplate;
	},
	
	view_hash: function(){
		return $extend(this.parent(), {label : this.label, checked: this.checked});
	}
});