jQuery.sap.declare("sap.ui.demokit.explored.util.ObjectSearch");

sap.ui.demokit.explored.util.ObjectSearch = {

	getEntityPath : function (oData, sId) {
		if (!oData.entities) {
			return null;
		}
		var oResult = null;
		jQuery.each(oData.entities, function (i, oEnt) {
			if (oEnt.id === sId) {
				oResult = "/entities/" + i + "/";
				return false;
			}
		});
		return oResult;
	}
};