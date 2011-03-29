describe('CheckBox : Given the questionBundle has checkbox', {
	before_each: function(){
		check_box = questionBundle.question.ui_objects[3]
		ui_check_box = new .QuestionChain.UiObject.CheckBox(check_box)
	},
	
	'It should be cool to create from the check box form the json' : function() {
		value_of(ui_check_box.label).should_be("return flight");
	},
	
	'It should be able to render correctly replacing using some mistache' : function() {
		var view = ui_check_box.render()[0].get("html");
		value_of(view).should_match(/type="checkbox"/);
	}
});

describe('CheckBox : Given it has a rule', {
	before_each: function(){
		check_box = questionBundle.question.ui_objects[3]
		ui_check_box = new .QuestionChain.UiObject.CheckBox(check_box)
	},
	
	'It should have some rules' : function() {
		value_of(ui_check_box.rules).should_not_be([]);
	},
	
	'It should set attach an event listener to the form element' : function() {
		value_of(ui_check_box.form_element).should_not_be_undefined();
	}
});
