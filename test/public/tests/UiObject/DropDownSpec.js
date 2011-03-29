describe('DropDownSpec : Given the questionBundle has drop_down', {
	before_each: function(){
		drop_down = questionBundle.question.ui_objects[0]
		drop_down = new .QuestionChain.UiObject.DropDown(drop_down)
	},
	
	'It should be cool to create from the drop down form the json' : function() {
		value_of(drop_down.label).should_be("flight origin");
		value_of(drop_down.ui_options).should_be([{"name":"one"}, {"name":"two"}, {"name":"three"}]);
		value_of(drop_down.html_template).should_not_be_null();
	},
	
	'It should be able to render correctly replacing using some mistache' : function() {
		var view = drop_down.render()[0].get("html");
		value_of(view).should_match(/flight origin/);
		value_of(view).should_match(/one/);
		value_of(view).should_match(/three/);
	}
});
