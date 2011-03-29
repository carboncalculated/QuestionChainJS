describe('Rule : Generally : Given we are calling the attribute handlers', {
	before_each: function(){
		rule_json = questionBundle.question.ui_objects[3].rules[0];
		rule = new .QuestionChain.Rule(rule_json);
	},
	
	'It should make an element hidden : Given {visible: false}' : function() {
		var element = new Element("div");
		rule.call_attribute_handler(element, {visible: false});
		value_of(element.getStyle("visibility")).should_be("hidden");
	},
	
	'it should make element visible : Given {visible: true}' : function() {
		var element = new Element("div");
		rule.call_attribute_handler(element, {visible: true});
		value_of(element.getStyle("visibility")).should_be("visible");
	}
});