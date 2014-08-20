sap.ui.controller("sap.m.sample.DateRangeSelection.C", {

	onInit: function () {
		var dateFrom = new Date();
		dateFrom.setUTCDate(2);
		dateFrom.setUTCMonth(1);
		dateFrom.setUTCFullYear(2014);

		var dateTo = new Date();
		dateTo.setUTCDate(17);
		dateTo.setUTCMonth(1);
		dateTo.setUTCFullYear(2014);

		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setData({
			fromDRS1: new Date(),
			toDRS1: new Date(),

			delimiterDRS2: "#",
			fromDRS2: dateFrom,
			toDRS2: dateTo,
			dateFormatDRS2: "dd.MM.yyyy",

			delimiterDRS3: "@",
			dateValueDRS3: dateFrom,
			secondDateValueDRS3: dateTo,
			dateFormatDRS3: "yyyy/MM/dd"
		});
		this.getView().setModel(oModel);

		this._iEvent = 0;
	},

	handleChange: function (oEvent) {
		var sFrom = oEvent.getParameter("from");
		var sTo = oEvent.getParameter("to");

		this._iEvent++;

		var oText = this.byId("TextEvent");
		oText.setText("Id: " + oEvent.oSource.getId() + "\nFrom: " + sFrom + "\nTo: " + sTo);
	}

});