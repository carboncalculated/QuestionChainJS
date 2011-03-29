describe('QuestionChain : When Initialzing', {
	before_each: function(){
		questionChain = new QuestionChain();
	},
	
	'It should questionBundle available' : function() {
		value_of(questionBundle).should_not_be_undefined();
	},
	
	'It should assign to the question' : function() {
		value_of(questionChain.question).should_not_be_undefined();
	},
	
	'It should be in a loaded state' : function() {
		value_of(questionChain.loaded).should_be_true();
	}
});

describe('QuestionChain : When Initialzing : Given questionBundle is valid ', {
	before_each: function(){
		questionChain = new QuestionChain();
	},
	'It should have a question defined' : function() {
		value_of(questionChain.question).should_not_be_undefined();
	},
	'It should be in a loaded state' : function() {
		value_of(questionChain.loaded).should_be_true();
	},
	'It should have ui_objects' : function() {
		value_of(questionChain.ui_objects).should_not_be_null();
		value_of(questionChain.ui_objects.length).should_be(4);
	}
});