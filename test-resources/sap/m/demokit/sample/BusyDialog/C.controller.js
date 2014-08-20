sap.ui.controller("sap.m.sample.BusyDialog.C", {
	handlePress: function (oEvent) {
		if (! this._dialog) {
			this._dialog = sap.ui.xmlfragment("sap.m.sample.BusyDialog.BusyDialog", this);
			this.getView().addDependent(this._dialog);
		}

		// toggle compact style
		jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._dialog);
		this._dialog.open();
	}
});
