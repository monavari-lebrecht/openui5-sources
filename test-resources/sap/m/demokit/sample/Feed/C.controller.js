jQuery.sap.require("sap.m.MessageToast");

sap.ui.controller("sap.m.sample.Feed.C", {

	onInit: function () {
		// set explored app's demo model on this sample
		var oModel = new sap.ui.model.json.JSONModel("test-resources/sap/ui/demokit/explored/feed.json");
		this.getView().setModel(oModel);
	},

	onPost: function (oEvent) {

		// create new entry
		var sValue = oEvent.getParameter("value");
		var oEntry = {
			Author : "Sara O'Connors",
			AuthorPicUrl : "test-resources/sap/ui/demokit/explored/img/Woman_10.png",
			Type : "Reply",
			Date : "" + new Date(),
			Text : sValue
		};

		// update model
		var oModel = this.getView().getModel();
		var aEntries = oModel.getData().EntryCollection;
		aEntries.unshift(oEntry);
		oModel.setData({
			EntryCollection : aEntries
		});
	}
});