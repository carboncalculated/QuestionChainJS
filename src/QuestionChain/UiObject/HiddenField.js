// TextBox that knows how to render itself
QuestionChain.UiObject.HiddenField = new Class({
	Extends: QuestionChain.UiObject,
	
	initialize: function(json_bundle, ui_group, index){
		this.parent(json_bundle, ui_group, index);
	},
	
	get_template: function(){
		return uiObjectsHiddenFieldTemplate;
	},
	
	group_loaded: function(){
		if (this.value){
			this.rules.each(function(rule){
				rule._fire(this.value);
			}, this);
		}
	},
	
	view_hash: function(){
		return $extend(this.parent(), {label : this.label, default_value: this.default_value, value : this.value});
	}
});