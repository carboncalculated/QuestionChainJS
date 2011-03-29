QuestionChain.Rule.AttributeChange = new Class({
	Extends: QuestionChain.Rule,
	
	initialize: function(rule){
		this.parent(rule);
		this.negate_value = rule.negate_value;
		this.compare_text_value = rule.compare_text_value;
		this.affecting_ui_objects = $H(rule.affecting_ui_objects);
		this.attribute_handlers = $H({
				visible: {
					"false": function(ui_object){
						var element = ui_object.element;
						element.setStyle("visibility", "hidden");
						element.hide();
					},
				 	 "true": function(ui_object){
					  var element = ui_object.element;
						element.setStyle("visibility", "visible");
						element.show();
					}
				},
				enabled:{
					"false": function(ui_object){
						ui_object.enabled = false;
						ui_object.form_element().setProperty("disabled", "disabled");
					},
					"true": function(ui_object){
						ui_object.enabled = true;
						ui_object.form_element().removeProperty("disabled");
					}
				}
			});
	},

	call_attribute_handler: function(element, key){
		var keys = this.parse_hash_keys(key);
		keys.each(function(key){
			if (this.attribute_handlers.getFromPath(key)){
				this.attribute_handlers.getFromPath(key)(element);
			}
		},this);
	},
	
	call_handlers: function(){
		this.affecting_ui_objects.each(function(value, key){
			var ui_object_element = document.id("ui_object_"+key);
			var ui_object =  ui_object_element.retrieve("question_chain:ui-object");
			if (ui_object) this.call_attribute_handler(ui_object, value);
		}, this);
	},
	
	fire: function(value, value_text){
		if (this.compare_text_value){
			if (this.negate_value){
				if (this.fire_value != value_text) this.call_handlers();
			} else {
				if (this.fire_value == value_text) this.call_handlers();
			}
		} else {
			if (this.negate_value){
				if (this.fire_value != (value || "").toString()) this.call_handlers();
			} else{
				if (this.fire_value == (value || "").toString()) this.call_handlers();
			}
		}
		this.fired = true;
	}
});