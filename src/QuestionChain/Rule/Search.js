QuestionChain.Rule.Search = new Class({
	Extends: QuestionChain.Rule,
	
	initialize: function(rule){
		this.parent(rule);
	},
		
	ui_object_input_id: function(){
		return this.ui_object().input_id();
	},
	
	ui_object_search_id: function(){
		return this.ui_object().search_id();
	},
	
	group_loaded: function(){
		this.rules.each(function(rule){
			rule._fire();
		});
	},
	
	fire_param_string: function(){
		var original = this.ui_object().fire_param_string();
		original.push({"name": "rule_id", "value" : this.id});
		return original;
	},
		
	fire: function(){
		this.autocomplete = new Meio.Autocomplete.Select(
			this.ui_object_search_id(),
			"/answers/fire_object_search",
			{
				minChars: 3,
				syncName: false,
				valueField: document.id(this.ui_object_input_id()),
				valueFilter: function(data){
					return data.value;
				},
				filter: {
					type: 'contains',
				  path: 'name'
				},
				urlOptions: {
					extraParams : this.fire_param_string()
				}
		});
	}
});