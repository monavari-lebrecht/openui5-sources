/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides default renderer for control sap.ui.commons.FileUploader
jQuery.sap.declare("sap.ui.commons.FileUploaderRenderer");
jQuery.sap.require("sap.ui.core.Renderer");
jQuery.sap.require("sap.ui.unified.FileUploaderRenderer");

sap.ui.commons.FileUploaderRenderer = sap.ui.core.Renderer.extend(sap.ui.unified.FileUploaderRenderer);