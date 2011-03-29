// TextBox that knows how to render itself
QuestionChain.UiObject.ObjectSearch = new Class({
	Extends: QuestionChain.UiObject,
	
	initialize: function(json_bundle, ui_group, index){
		this.parent(json_bundle, ui_group, index);
	},
	
	get_template: function(){
		return uiObjectsObjectSearchTemplate;
	},
	
	search_name: function(){
		return "answer[search_"+ this.name+"]";
	},

	search_id: function(){
		return "search_"+ this.dom_id();
	},
	
	group_loaded: function(){
		this.rules.each(function(rule){
			rule._fire();
		});
	},
		
	fire_param_string: function(){
		var original_values = this.ui_group.relatable_category_values();
		original_values = original_values.clean();
		original_values.push({"name" : "ui_object_id", "value": this.id});
		return original_values
	},
	
	view_hash: function(){
		return $extend(this.parent(), {searach_id: this.search_id(), search_name: this.search_name(), label : this.label, default_value: this.default_value, value : this.value});
	}
});