QuestionChain.Rule.ValueChange = new Class({
	Extends: QuestionChain.Rule,
	
	initialize: function(rule){
		this.parent(rule);
		this.change_value = rule.change_value;
		this.affecting_ui_object_id = rule.affecting_ui_object_id;
	},
	
	affecting_ui_object_form_element: function(){
		return ("ui_input_" + this.affecting_ui_object_id);
	},
	
	fire: function(value){
		if (value == this.fire_value){
			this.affecting_ui_object_form_element().set("value", this.change_value);
		}
	}
});