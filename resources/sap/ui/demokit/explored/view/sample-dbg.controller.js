sap.ui.controller("sap.ui.demokit.explored.view.sample", {

	onInit : function () {
		this.router = sap.ui.core.UIComponent.getRouterFor(this);
		this.router.attachRoutePatternMatched(this.onRouteMatched, this);
	},

	onRouteMatched : function (oEvt) {

		if (oEvt.getParameter("name") !== "sample") {
			return;
		}

		this._sId = oEvt.getParameter("arguments").id;

		// retrieve sample object
		var oSample = sap.ui.demokit.explored.data.samples[this._sId];
		if (!oSample) {
			this.router.myNavToWithoutHash("sap.ui.demokit.explored.view.notFound", "XML", false, { path: this._sId });
			return;
		}

		// set nav button visibility
		var oPage = this.getView().byId("page");
		var oHistory = sap.ui.core.routing.History.getInstance();
		var oPrevHash = oHistory.getPreviousHash();
		var bShowNavButton = sap.ui.Device.system.phone || !!oPrevHash;
		oPage.setShowNavButton(bShowNavButton);

		// set page title
		oPage.setTitle("Sample: " + oSample.name);

		// create component only once
		var sCompId = 'sampleComp-' + this._sId;
		var sCompName = this._sId;
		this._oComp = sap.ui.component(sCompId);
		if (!this._oComp) {
			this._oComp = sap.ui.getCore().createComponent({
				id : sCompId,
				name : sCompName
			});
		}

		// create component container
		var oContent;
		oContent = new sap.ui.core.ComponentContainer({
			component: this._oComp
		});

		// handle stretch content
		var oConfig = (this._oComp.getMetadata()) ? this._oComp.getMetadata().getConfig() : null;
		var bStretch = (oConfig && oConfig.sample && oConfig.sample.stretch);
		var sHeight = (bStretch) ? "100%" : null;
		oPage.setEnableScrolling(!bStretch);
		oContent.setHeight(sHeight);

		// add content
		oPage.removeAllContent();
		oPage.addContent(oContent);

		// scroll to top of page
		oPage.scrollTo(0);
	},

	onNavBack : function (oEvt) {
		this.router.myNavBack("home", {});
	},

	onNavToCode : function (evt) {
		this.router.navTo("code", {
			id : this._sId
		}, false);
	}
});