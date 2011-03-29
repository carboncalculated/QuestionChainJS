QuestionChain.UiObject.DropDown = new Class({
	Extends: QuestionChain.UiObject,

	initialize: function(json_bundle, ui_group, index){
		this.parent(json_bundle, ui_group, index);
		this.selected_value = json_bundle.selected_value;
		this.populate = json_bundle.populate;
		this.prompt = json_bundle.prompt;
		this.ui_options = json_bundle.options;
		this.has_drop_down_target = false;
		this.parse_options();
	},

	parse_options: function(){
		this.ui_options = this.ui_options.map(function(option){
			if (!!this.value){
				var selected = (option.value.toString() == this.value.toString());
				return {"name" :  option.name, "value" : option.value, "selected": selected};
			} else {
				return {"name" : option.name, "value" : option.value};
			}
		}, this);
	},

	add_element_listner: function(){
		this.form_element().addEvent("change", this.element_listener);
	},

	element_listener: function(event){
		event.stop();
		var element = $(event.target);
		var value = element.getSelected()[0].value;
		if (value !== ""){
			this.rules.each(function(rule){
				rule._fire(value, this.value_text());
			}, this);
		}
	},

	selected_option: function(){
		return this.form_element().getSelected()[0];
	},
	
	remote_rules: function(){
		return this.rules.filter(function(rule){
			return rule.remote === true;
		});
	},
	
	non_remote_rules: function(){
		return this.rules.filter(function(rule){
			return rule.remote === false;
		});
	},

	remote_rules: function(){
		return this.rules.filter(function(rule){
			return rule.remote === true;
		});
	},

	group_loaded: function(){
		if (this.value){
			this.remote_rules().each(function(rule){
				rule._fire(this.value, this.value_text());
			}, this);
			this.check_completed_remote_rules.periodical(1000, this);
		}
	},

	check_completed_remote_rules: function(){
		var completed = this.remote_rules().every(function(rule){
			return rule.fired === true;
		});

		if (completed) {
			$clear(this.check_completed_remote_rules);
			this.non_remote_rules().each(function(rule){
				rule._fire(this.value, this.value_text());
			}, this);
		}
	},

	value_text: function(){
		return this.selected_option_text();
	},

	selected_option_text: function(){
		return this.selected_option().get("html");
	},

	get_template: function(){
		return uiObjectsDropDownTemplate;
	},

	clear_target_options: function(){
		if (this.has_drop_down_target){
			if (this.ui_group.fired_all_ui_object_rules()){
				var target = this.drop_down_target();
				target.ui_options = [];
				target.render();
				target.clear_target_options();
			}
		}
	},

	view_hash: function(){
		return $extend(this.parent(), {prompt: this.prompt, label : this.label, options: this.ui_options});
	}
});