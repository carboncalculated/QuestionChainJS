QuestionChain.Rule.PopulateDropDown = new Class({
	Extends: QuestionChain.Rule,

	initialize: function(rule){
		this.parent(rule);
		this.remote = true;
		this.ui_object_attribute_check = rule.ui_object_attribute_check;
		this.drop_down_target_id = rule.drop_down_target_id;
	},

	drop_down_target: function(){
		var target = this.drop_down_target_element().retrieve("question_chain:ui-object");
		return target;
	},

	drop_down_target_element: function(){
		var target_element =  document.id("ui_object_"+this.drop_down_target_id);
		return target_element;
	},

	_fire: function(value){
		var ui_object = this.ui_object();
		if (ui_object.all_rules_fired()){
			ui_object.value = undefined;
		}
		if (typeof this.ui_object_attribute_check != "undefined") {
			var can_get_options = $H(this.ui_object_attribute_check).every(function(value, key){
			var ui_object = document.id("ui_object_"+key);
			return ui_object.getStyle(value["attribute"]) == value["value"];
			}, this);
			if (can_get_options) {
				this.disable_target();
				this.get_options(value);
			}
		} else {
			this.disable_target();
			this.get_options(value);
		}
	},

	disable_target: function(){
		this.drop_down_target_element().addClass("loading");
		this.drop_down_target().form_element().set("disabled", "disabled");
	},

	enable_target: function(){
		this.drop_down_target_element().removeClass("loading");
		this.drop_down_target().form_element().set("disabled", "");
	},

	fire: function(options){
		var target_drop_down = this.drop_down_target();
		target_drop_down.ui_options = options;
		target_drop_down.parse_options();
		target_drop_down.render();
		target_drop_down.clear_target_options();
		this.fired = true;
	},

	get_options: function(value){
		var request = new Request.JSON({
			data: ["rule_id="+this.id, this.ui_object().target_drop_down_param_string()].flatten().join("&"),
			url: "/answers/fire_populate_drop_down",
			onComplete: function(){
				this.enable_target();
			}.bind(this),
			onSuccess : function(responseJSON){
				this.fire(responseJSON.options);
			}.bind(this)
		}).send();
	}
});