jQuery.sap.declare("sap.m.sample.ToolbarActive.Component");

sap.ui.core.UIComponent.extend("sap.m.sample.ToolbarActive.Component", {

	metadata : {
		rootView : "sap.m.sample.ToolbarActive.Toolbar",
		dependencies : {
			libs : [
				"sap.m"
			]
		},
		config : {
			sample : {
				stretch : true,
				files : [
					"Toolbar.view.xml",
					"Toolbar.controller.js"
				]
			}
		}
	}
});