/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.ui.commons.Menu.
jQuery.sap.declare("sap.ui.commons.Menu");
jQuery.sap.require("sap.ui.commons.library");
jQuery.sap.require("sap.ui.unified.Menu");


/**
 * Constructor for a new Menu.
 * 
 * Accepts an object literal <code>mSettings</code> that defines initial 
 * property values, aggregated and associated objects as well as event handlers. 
 * 
 * If the name of a setting is ambiguous (e.g. a property has the same name as an event), 
 * then the framework assumes property, aggregation, association, event in that order. 
 * To override this automatic resolution, one of the prefixes "aggregation:", "association:" 
 * or "event:" can be added to the name of the setting (such a prefixed name must be
 * enclosed in single or double quotes).
 *
 * The supported settings are:
 * <ul>
 * <li>Properties
 * <ul></ul>
 * </li>
 * <li>Aggregations
 * <ul></ul>
 * </li>
 * <li>Associations
 * <ul></ul>
 * </li>
 * <li>Events
 * <ul></ul>
 * </li>
 * </ul> 
 *
 * 
 * In addition, all settings applicable to the base type {@link sap.ui.unified.Menu#constructor sap.ui.unified.Menu}
 * can be used as well.
 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * A container for menu items. When the space in the browser is not large enough to display all defined items, a scroll bar is provided.
 * @extends sap.ui.unified.Menu
 *
 * @author SAP AG 
 * @version 1.22.10
 *
 * @constructor   
 * @public
 * @deprecated Since version 1.21.0. 
 * Please use the control sap.ui.unified.Menu of the library sap.ui.unified instead.
 * @name sap.ui.commons.Menu
 */
sap.ui.unified.Menu.extend("sap.ui.commons.Menu", { metadata : {

	// ---- object ----
	deprecated : true,

	// ---- control specific ----
	library : "sap.ui.commons"
}});


/**
 * Creates a new subclass of class sap.ui.commons.Menu with name <code>sClassName</code> 
 * and enriches it with the information contained in <code>oClassInfo</code>.
 * 
 * <code>oClassInfo</code> might contain the same kind of informations as described in {@link sap.ui.core.Element.extend Element.extend}.
 *   
 * @param {string} sClassName name of the class to be created
 * @param {object} [oClassInfo] object literal with informations about the class  
 * @param {function} [FNMetaImpl] constructor function for the metadata object. If not given, it defaults to sap.ui.core.ElementMetadata.
 * @return {function} the created class / constructor function
 * @public
 * @static
 * @name sap.ui.commons.Menu.extend
 * @function
 */


// Start of sap\ui\commons\Menu.js
jQuery.sap.require("sap.ui.commons.MenuItemBase"); /*Ensure MenuItemBase is loaded (incl. loading of unified library)*/