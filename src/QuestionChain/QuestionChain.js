// How to make sure of this namespace?
// just make sure we have the namespace

if (typeof QuestionChain == "undefined"){
	var QuestionChain = {};
};

QuestionChain = new Class({
	Implements: [Events, Options],
	
	options: {
	},
	
	initialize: function(question_json, options){
		this.setOptions(this.options);
		this.question = question_json;
		this.label = this.question.label;
		this.description = this.question.description;
		if (!(this.loaded = (this.parse_ui_groups()))){
			this.show_load_error("Question Could Not Be Loaded; Parsing Error");
		}
	},
	
	build_ui_groups: function(ui_groups){
		return ui_groups.each(function(ui_group){
			return new QuestionChain.UiGroup(ui_group);
		});
	},
	
	parse_ui_groups: function(){
		var result = $try(function(){
			this.ui_groups = this.build_ui_groups(this.question.ui_groups);
			return true;
		}.bind(this),
		function(){
			return false;
		});
		return result;
	},
	
	show_load_error: function(message){
		document.id("global_notice").set("html", message).highlight('#ddf', '#ccc');
	},
	
	view_hash: function(){
		return {"label" : this.label, "description" : this.description};
	},
		
	render: function(){
	}
});




