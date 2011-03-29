QuestionChain.UiGroup = new Class({

	initialize: function(json_ui_group){
		this.id = json_ui_group.id;
		this.name = json_ui_group.name;
		this.label = json_ui_group.label;
		this.description = json_ui_group.description;
		this.json_ui_objects = json_ui_group.ui_objects;
		this.relatable_category_drop_downs = [];
		if ($defined(json_ui_group.relatable_category_filter)) {
		  this.relatable_category_filters = json_ui_group.relatable_category_filter.filters;
		} else {
		  this.relatable_category_filters = [];
		}
		this.loaded = this.parse_ui_objects();
		if (this.loaded){
			this.ui_objects.each(function(ui_object){
				ui_object.group_loaded();
			});
		}
		this.element = document.id(this.dom_id());
		this.element.store("question_chain:ui-object", this);
	},

	enabled_relatable_category_drop_downs: function(){
	  return this.relatable_category_drop_downs.filter(function(rc){
	    return rc.enabled;
	  });
	},

	dom_id: function(){
		return ("ui_object_" + this.id);
	},

	relatable_category_ids: function(){
		var ids = this.enabled_relatable_category_drop_downs().map(function(rcat, index){
			return "object_ids[]="+(rcat.value || rcat.form_element_value());
		}, this);
		return ids.combine(this.get_relatable_category_filters());
	},

	relatable_category_ids_with_related_attribute: function(base_relatable_category){
		var index = base_relatable_category.index;
		var start_index = this.enabled_relatable_category_drop_downs()[0].index;
		var size = (index - start_index)+1;
		params = this.enabled_relatable_category_drop_downs().slice(0,size).map(function(rcat, index){
			if ((base_relatable_category.id != rcat.id)) {
					if ((rcat.value || rcat.form_element_value()) !== ""){
						return "object_ids[]="+(rcat.value || rcat.form_element_value());
					}
				}
		}, this);
		params.unshift("object_ids[]="+(base_relatable_category.value || base_relatable_category.form_element_value()));
    params.combine(this.get_relatable_category_filters());
		return params;
	},
	
	get_relatable_category_filters: function(){
	  return this.relatable_category_filters.map(function(filter){
	    return "object_ids[]=" + filter;
	  });
	},

	relatable_category_values: function(){
		return this.relatable_category_drop_downs.map(function(rcat, index){
			return {"name" : "relatable_category_values[]", "value" : function(){return ($defined(rcat.form_element_value()) && rcat.form_element_value() !== "") ? rcat.selected_option_text() : ""}};
		}, this);
	},

	parse_ui_objects: function(){
		var result = $try(function(){
			this.ui_objects = this.build_ui_objects(this.json_ui_objects);
			return true;
		}.bind(this),
		function(){
			return false;
		});
		return result;
	},

	fired_all_ui_object_rules: function(){
		return this.ui_objects.every(function(ui_object){
			return ui_object.all_rules_fired();
		});
	},

	build_ui_objects: function(ui_objects){
		return ui_objects.map(function(ui_object, index){
			switch(ui_object._type){
			case "UiObjects::DropDown":
				return new QuestionChain.UiObject.DropDown(ui_object, this, index);
			  break;
		 	case "UiObjects::CheckBox":
				return new QuestionChain.UiObject.CheckBox(ui_object, this, index);
			  break;
		 	case "UiObjects::TextField":
				return new QuestionChain.UiObject.TextField(ui_object, this, index);
			  break;
		 	case "UiObjects::ObjectSearch":
				return new QuestionChain.UiObject.ObjectSearch(ui_object, this, index);
			  break;
		 	case "UiObjects::HiddenField":
				return new QuestionChain.UiObject.HiddenField(ui_object, this, index);
			  break;
		 	case "UiObjects::ObjectReferenceDropDown":
				var obj_ref = new QuestionChain.UiObject.ObjectReferenceDropDown(ui_object, this, index);
				this.object_reference_drop_down = obj_ref;
				return this.object_reference_drop_down;
			  break;
		 	case "UiObjects::RelatableCategoryDropDown":
				var relatable_dd = new QuestionChain.UiObject.RelatableCategoryDropDown(ui_object, this, index);
				this.relatable_category_drop_downs.push(relatable_dd);
				return relatable_dd;
			  break;
			}
		}.bind(this));
	}

});