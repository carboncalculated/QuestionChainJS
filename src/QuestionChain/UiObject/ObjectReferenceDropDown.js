QuestionChain.UiObject.ObjectReferenceDropDown = new Class({
	Extends: QuestionChain.UiObject.DropDown,

	initialize: function(json_bundle, ui_group, index){
		this.drop_down_target_id = "ui_object_"+json_bundle.drop_down_target_id;
		this.parent(json_bundle, ui_group, index);
		if ($defined(json_bundle.drop_down_target_id)) this.has_drop_down_target = true;
	},

	target_drop_down_param_string: function(){
		var original_values  = ["object_ids[]="+(this.value || this.form_element_value())];
		original_values.push("ui_object_id="+this.id);
		return original_values;
	},

	drop_down_target: function(){
		return document.id(this.drop_down_target_id).retrieve("question_chain:ui-object");
	},

	get_template: function(){
		return uiObjectsObjectReferenceDropDownTemplate;
	}
});