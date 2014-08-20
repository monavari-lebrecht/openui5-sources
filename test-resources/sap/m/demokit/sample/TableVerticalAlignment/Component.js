jQuery.sap.declare("sap.m.sample.TableVerticalAlignment.Component");

sap.ui.core.UIComponent.extend("sap.m.sample.TableVerticalAlignment.Component", {

	metadata : {
		rootView : "sap.m.sample.TableVerticalAlignment.Table",
		dependencies : {
			libs : [
				"sap.m",
				"sap.ui.layout"
			]
		},
		config : {
			sample : {
				files : [
					"Table.view.xml",
					"Table.controller.js",
					"Formatter.js"
				]
			}
		}
	}
});