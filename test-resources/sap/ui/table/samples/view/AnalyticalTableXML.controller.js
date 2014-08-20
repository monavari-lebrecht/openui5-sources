sap.ui.controller("view.AnalyticalTableXML", {

	onInit : function () {

		// define the model properties
		this.sServiceUrl = "https://ldai1e91.wdf.sap.corp:44300/sap/opu/odata/sap/ZMK_FIORI_ALV2_SRV";
		this.sProxyUrl = "../../../../../proxy/" + this.sServiceUrl.replace("://", "/");
		
		
	},
	
	doConnect: function(oEvent) {
		
		// create the ODataModel
		jQuery.sap.require("sap.ui.model.odata.ODataModel");
		var oModel = new sap.ui.model.odata.ODataModel(this.sProxyUrl);
		
		// connect the model and the table
		var oTable = this.byId("table");
		oTable.setModel(oModel);
		
		// bind the rows to the "LineItemsSet" 
		oTable.bindRows("/LineItemsSet");
		
		// attach to data loaded events to update total size!
		oTable.getBinding("rows").attachDataReceived(function() {
			oTable.getTitle().setText("E91 LineItems (" + oTable.getTotalSize() + ")");
		});
		
		// set the sorter function for the visibility menu:
		oTable.setColumnVisibilityMenuSorter(function(a, b) {
			var fnGetColumnName = function(oColumn) {
				return oColumn.getName() || (oColumn.getLabel() && oColumn.getLabel().getText ? oColumn.getLabel().getText() : "");
			};
			return fnGetColumnName(a).localeCompare(fnGetColumnName(b));
		});
		
	}

});
