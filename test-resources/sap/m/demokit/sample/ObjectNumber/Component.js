jQuery.sap.declare("sap.m.sample.ObjectNumber.Component");

sap.ui.core.UIComponent.extend("sap.m.sample.ObjectNumber.Component", {

	metadata : {
		rootView : "sap.m.sample.ObjectNumber.V",
		dependencies : {
			libs : [
				"sap.m",
				"sap.ui.layout"
			]
		},
		config : {
			sample : {
				files : [
					"V.view.xml",
					"C.controller.js"
				]
			}
		}
	}
});