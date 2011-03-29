QuestionChain.UiObject = new Class({
	Binds: ['element_listener', 'render'],

	initialize: function(json_object, ui_group, index){
		this.id = json_object.id;
		this.ui_group = ui_group;
		this.index = index;
		this.name = "answer["+json_object.name+"]";
		this.label = json_object.label;
		this.description = json_object.description;
		this.value = json_object.value;
		this.extra_info = json_object.extra_info;
		this.has_extra_info = $defined(this.extra_info);
		this.ui_attributes = json_object.ui_attributes;
		this.default_value = json_object.default_value;
		this.visible = this.ui_attributes.visible;
		this.enabled = this.ui_attributes.enabled;
		this.rules = this.buildRules(json_object.rules);
		this.html_template = this.get_template();
		this.element = document.id(this.dom_id());

		if (!$defined(this.element)){
			this.render(true);
			this.element = document.id(this.dom_id());
		}
		
		this.element.store("question_chain:ui-object", this);
		if (this.rules.length > 0){
			this.add_element_listner();
		}
	},

	add_element_listner: function(){
	},

	element_listener: function(){
	},

	all_rules_fired: function(){
		if (this.rules.length === 0) return true;
		return this.rules.every(function(rule){
			return rule.fired === true;
		});
	},

	value_text: function(){
		return this.value;
	},

	group_loaded: function(){

	},

	form_element_value: function(){
		return this.form_element().get("value");
	},

	form_element_name: function(){
		return this.form_element().get("name");
	},

	form_element: function(){
		return document.id(this.input_id());
	},

	dom_id: function(){
		return ("ui_object_" + this.id);
	},

	input_id: function(){
		return ("ui_input_" + this.id);
	},

	buildRules: function(rules){
		return rules.map(function(rule, index){
			switch(rule._type){
				case "Rules::AttributeChange":
				return new QuestionChain.Rule.AttributeChange(rule);
				case "Rules::PopulateDropDown":
				return new QuestionChain.Rule.PopulateDropDown(rule);
				case "Rules::ValueChange":
				return new QuestionChain.Rule.ValueChange(rule);
				case "Rules::Search":
				return new QuestionChain.Rule.Search(rule);
				break;
			}
		}, this);
	},

	get_template: function(){
	},

	view_hash: function(){
		return {extra_info: this.extra_info, has_extra_info: this.has_extra_info, input_id: this.input_id(), dom_id: this.dom_id(), default_styles: "", name: this.name};
	},

	render: function(force){
		html = Mustache.to_html(this.html_template, this.view_hash());
		if (force){
			document.id("ui_objects").adopt(html_elements);
		} else {
			this.element.set("html", html.stripTags('dl'));
			this.add_element_listner();
		}
	}
});