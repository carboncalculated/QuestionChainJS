QuestionChain.Rule = new Class({

	initialize: function(rule){
		this.id = rule.id;
		this.fired = false;
		this.remote = false;
		this.compare_text_value = rule.compare_text_value;
		this.ui_object_id = rule.ui_object_id;
		this.fire_value = rule.fire_value;
	},

	ui_object: function(){
		this.ui_object_element = $("ui_object_"+this.ui_object_id);
		return this.ui_object_element.retrieve("question_chain:ui-object");
	},

	_fire: function(value, value_text){
		var ui_object = this.ui_object();
		if (ui_object.all_rules_fired()){
			ui_object.value = undefined;
		}
		this.fire(value, value_text);
	},

	parse_hash_keys: function(key){
		var keys = [];
		var parsed_key = "";
		$H(key).each(function(value, key){
			keys.push((key + "." + value));
		});
		return keys;
	}
});