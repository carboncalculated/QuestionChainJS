QuestionChain.UiObject.RelatableCategoryDropDown = new Class({
	Extends: QuestionChain.UiObject.DropDown,

	initialize: function(json_bundle, ui_group, index){
		this.drop_down_target_id = "ui_object_"+json_bundle.drop_down_target_id;
		this.drop_down_target_is_relatable = json_bundle.drop_down_target_is_relatable;
		this.parent(json_bundle, ui_group, index);
		if ($defined(json_bundle.drop_down_target_id)) this.has_drop_down_target = true;
	},

	drop_down_target: function(){
		return document.id(this.drop_down_target_id).retrieve("question_chain:ui-object");
	},

	target_drop_down_param_string: function(){
	  var original_values;
		if (this.drop_down_target_is_relatable){
			original_values = this.ui_group.relatable_category_ids_with_related_attribute(this);
		} else {
			original_values = this.ui_group.relatable_category_ids();
		}
		original_values.push("ui_object_id="+this.id);
		return original_values;
	},

	get_template: function(){
		return uiObjectsRelatableCategoryDropDownTemplate;
	}
});