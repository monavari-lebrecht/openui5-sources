/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides default renderer for control sap.ui.commons.Label
jQuery.sap.declare("sap.ui.commons.LabelRenderer");
jQuery.sap.require("sap.ui.core.Renderer");


/**
 * @class
 *
 * @author SAP - TD Core UI&AM UI Infra
 * @version 0.1
 * @static
 */
sap.ui.commons.LabelRenderer = {
//	sap.ui.core.Renderer.apply(this, arguments);
};

/**
 * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
 *
 * @param {sap.ui.core.RenderManager} oRenderManager The RenderManager that can be used for writing to the render-output-buffer.
 * @param {sap.ui.core.Control} oLabel An object representation of the control that should be rendered.
 */
sap.ui.commons.LabelRenderer.render = function(oRenderManager, oLabel) {
	// Some convenience variables.
	var rm = oRenderManager;
	var r = sap.ui.commons.LabelRenderer;

	// Return immediately if control is invisible
	if (!oLabel.getVisible()) {
		return;
	}

	rm.write("<label");
	rm.writeControlData(oLabel);

	var sTooltip = oLabel.getTooltip_AsString();

	if (oLabel.getLabelForRendering()) {
		var oFor = sap.ui.getCore().byId(oLabel.getLabelForRendering());
		rm.write(" for=\"");
		// for some controls the label must point to an special HTML element, not the outer one.
		if ( oFor && oFor.getIdForLabel) {
			rm.write(oFor.getIdForLabel());
		} else{
			rm.write(oLabel.getLabelForRendering());
		}
		rm.write("\"");

		if ((!sTooltip || sTooltip == "") && oFor && oFor.getTooltip_AsString() && oFor.getTooltip_AsString() != "") {
			// If label has no own tooltip use tooltip of the labeled control
			sTooltip = oFor.getTooltip_AsString();
		}
	}

	// check whether a 'required' marker is needed
	if ( oLabel.isRequired() ) {
		rm.addClass('sapUiLblReq');
		if (oLabel.getRequiredAtBegin()) {
			rm.addClass('sapUiLblReqBeg');
		} else {
			rm.addClass('sapUiLblReqEnd');
		}
	}

	if(sTooltip) {
		rm.writeAttributeEscaped('title', sTooltip);
	}

	// Styles
	rm.addClass("sapUiLbl");
	if (oLabel.getDesign() == sap.ui.commons.LabelDesign.Bold) {
		rm.addClass("sapUiLblEmph");
	}

	// Text direction
	var sTextDir = oLabel.getTextDirection();
	if (sTextDir) {
		rm.addStyle("direction", sTextDir.toLowerCase());
	}

	// Style for text alignment
	var oTextAlign = oLabel.getTextAlign();
	if(oTextAlign) {
		rm.addStyle("text-align", r.getTextAlign(oTextAlign, sTextDir));
	}

	// Style for width
	var sWidth = oLabel.getWidth();
	if(sWidth) {
		rm.addStyle("width", sWidth);
	}

	if(!oLabel.getWrapping()){
		rm.addClass("sapUiLblNowrap");
	}

	rm.writeStyles();
	rm.writeClasses();

	// Close start tag
	rm.write(">");

	// Get image fragment if there is one, and write
	if (oLabel.getIcon()) {
		this.writeImgHtml(rm, oLabel);
	}

	// Write the label text
	if (oLabel.getText()) {
		rm.writeEscaped(oLabel.getText());
	}

	// Close tag
	rm.write("</label>");
};


sap.ui.commons.LabelRenderer.writeImgHtml = function(oRenderManager, oLabel) {
	var rm = oRenderManager;
	var sIconUrl = oLabel.getIcon();
	var oConfig = oRenderManager.getConfiguration();
	var aClasses = [];
	var mAttributes = {};

	aClasses.push("sapUiLblIco");
	if ((oLabel.getTextDirection()==sap.ui.core.TextDirection.RTL && !oConfig.getRTL()) || (oLabel.getTextDirection()==sap.ui.core.TextDirection.LTR && oConfig.getRTL())) {
		// if text direction is different to global text direction, icon margin must be switched.
		aClasses.push("sapUiLblIcoR");
	} else {
		aClasses.push("sapUiLblIcoL");
	}

	rm.writeIcon(sIconUrl, aClasses, mAttributes);

};

/**
 * Dummy inheritance of static methods/functions.
 * @see sap.ui.core.Renderer.getTextAlign
 * @private
 */
sap.ui.commons.LabelRenderer.getTextAlign = sap.ui.core.Renderer.getTextAlign;
