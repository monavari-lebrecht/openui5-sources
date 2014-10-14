/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.ui.commons.DatePicker.
jQuery.sap.declare("sap.ui.commons.DatePicker");
jQuery.sap.require("sap.ui.commons.library");
jQuery.sap.require("sap.ui.commons.TextField");


/**
 * Constructor for a new DatePicker.
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
 * <ul>
 * <li>{@link #getLocale locale} : string</li>
 * <li>{@link #getYyyymmdd yyyymmdd} : string</li></ul>
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
 * In addition, all settings applicable to the base type {@link sap.ui.commons.TextField#constructor sap.ui.commons.TextField}
 * can be used as well.
 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * Allows end users to interact with dates.
 * Entries can directly be written in, or selected from a calendar pad.
 * Note: Dates can always be manually entered in the fix YYYYMMDD format, on top of the flexible "locale" format.
 * If the value is provided via data binding, using a Date.type the formatter of the Date.type is used.
 * Since version 1.22 the unified.Calendar is used inside the datePicker. So applications using the DatePicker should load the unified library. Otherwise it will be loaded the first time a DatePicker is opened.
 * @extends sap.ui.commons.TextField
 *
 * @author SAP AG 
 * @version 1.22.10
 *
 * @constructor   
 * @public
 * @name sap.ui.commons.DatePicker
 */
sap.ui.commons.TextField.extend("sap.ui.commons.DatePicker", { metadata : {

	// ---- object ----

	// ---- control specific ----
	library : "sap.ui.commons",
	properties : {
		"locale" : {type : "string", group : "Misc", defaultValue : null},
		"yyyymmdd" : {type : "string", group : "Misc", defaultValue : null}
	}
}});


/**
 * Creates a new subclass of class sap.ui.commons.DatePicker with name <code>sClassName</code> 
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
 * @name sap.ui.commons.DatePicker.extend
 * @function
 */


/**
 * Getter for property <code>locale</code>.
 * Defines the locale (language and country), e.g. "en-US", whose translations and Date formatters should be used to render the DatePicker.If the value property is bound to a model using a Date type the locale will be ignored, because the locale information of the model are used.
 * 
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>locale</code>
 * @public
 * @name sap.ui.commons.DatePicker#getLocale
 * @function
 */

/**
 * Setter for property <code>locale</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sLocale  new value for property <code>locale</code>
 * @return {sap.ui.commons.DatePicker} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.commons.DatePicker#setLocale
 * @function
 */


/**
 * Getter for property <code>yyyymmdd</code>.
 * Defines the date as a "yyyymmdd" string, independent from the format used. The inherited textField "value" attribute uses the date format as configured via the locale.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>yyyymmdd</code>
 * @public
 * @name sap.ui.commons.DatePicker#getYyyymmdd
 * @function
 */

/**
 * Setter for property <code>yyyymmdd</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sYyyymmdd  new value for property <code>yyyymmdd</code>
 * @return {sap.ui.commons.DatePicker} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.commons.DatePicker#setYyyymmdd
 * @function
 */


// Start of sap\ui\commons\DatePicker.js
jQuery.sap.require("sap.ui.model.type.Date");

(function() {

	sap.ui.commons.DatePicker.prototype.init = function(){

		sap.ui.commons.TextField.prototype.init.apply(this, arguments);

		this._oFormatYyyymmdd = sap.ui.core.format.DateFormat.getInstance({pattern: "yyyyMMdd"});

		if (sap.ui.Device.browser.mobile) {
			this._bMobile = true;
			this._oFormatMobile = sap.ui.core.format.DateFormat.getInstance({pattern: "yyyy-MM-dd"});
		}

	};

	sap.ui.commons.DatePicker.prototype.exit = function() {

		this._oDate = undefined;
		this._oLocale = undefined;

		if(this._oPopup) {
			if (this._oPopup.isOpen()) {
				this._oPopup.close();
			}
			delete this._oPopup;
		}

		if (this._oCalendar) {
			this._oCalendar.destroy();
			delete this._oCalendar;
		}

	};

	sap.ui.commons.DatePicker.prototype.onAfterRendering = function() {

		if (this._bMobile) {
			// convert output to mobile format
			if (this._oDate) {
				var $Input = jQuery(this.getInputDomRef());
				var sOutputValue = this._oFormatMobile.format(this._oDate);
				$Input.val(sOutputValue);
			}
		}

	};

	sap.ui.commons.DatePicker.prototype.invalidate = function(oOrigin) {

		if(!oOrigin || oOrigin != this._oCalendar){
			// Calendar is only invalidated by DatePicker itself -> so don't invalidate DatePicker
			sap.ui.core.Control.prototype.invalidate.apply(this, arguments);
		}

	};

	sap.ui.commons.DatePicker.prototype.onsapshow = function(oEvent) {

		var that = this;

		_toggleOpen(that);

		oEvent.preventDefault(); // otherwise IE opens the address bar history

	};

	sap.ui.commons.DatePicker.prototype.onsaphide = sap.ui.commons.DatePicker.prototype.onsapshow;

	sap.ui.commons.DatePicker.prototype.onsappageup = function(oEvent){

		//increase by one day
		var that = this;
		_incraseDate(that, 1, "day");

		oEvent.preventDefault(); // do not move cursor

	};

	sap.ui.commons.DatePicker.prototype.onsappageupmodifiers = function(oEvent){

		var that = this;
		if (!oEvent.ctrlKey && oEvent.shiftKey) {
			// increase by one month
			_incraseDate(that, 1, "month");
		} else {
			// increase by one year
			_incraseDate(that, 1, "year");
		}

		oEvent.preventDefault(); // do not move cursor

	};

	sap.ui.commons.DatePicker.prototype.onsappagedown = function(oEvent){

		//decrease by one day
		var that = this;
		_incraseDate(that, -1, "day");

		oEvent.preventDefault(); // do not move cursor

	};

	sap.ui.commons.DatePicker.prototype.onsappagedownmodifiers = function(oEvent){

		var that = this;
		if (!oEvent.ctrlKey && oEvent.shiftKey) {
			// decrease by one month
			_incraseDate(that, -1, "month");
		} else {
			// decrease by one year
			_incraseDate(that, -1, "year");
		}

		oEvent.preventDefault(); // do not move cursor

	};

	sap.ui.commons.DatePicker.prototype.onclick = function(oEvent) {

		if (jQuery(oEvent.target).hasClass("sapUiTfDateIcon") && !this._bMobile) {
			var that = this;
			_toggleOpen(that);
		}

	};

	sap.ui.commons.DatePicker.prototype.onsapfocusleave = function(oEvent){

		// Ignore event if DatePicker is opening or clicked on opener.
		if(this._oCalendar && oEvent.relatedControlId &&
		  (jQuery.sap.containsOrEquals(this._oCalendar.getDomRef(), sap.ui.getCore().byId(oEvent.relatedControlId).getFocusDomRef()) ||
		  this.getId() == oEvent.relatedControlId)){
			return;
		}

		sap.ui.commons.TextField.prototype.onsapfocusleave.apply(this, arguments);

	};

	sap.ui.commons.DatePicker.prototype.setValue = function(sValue) {

		var sOldValue = this.getValue();
		if (sValue == sOldValue) {
			return this;
		}

		var that = this;
		_checkLocaleAllowed(that);

		this.setProperty("value", sValue, true);
		this._bValueSet = true;

		if (sValue) {
			this._oDate = this._parseValue(sValue);
		} else {
			this._oDate = undefined;
		}

		var sYyyymmdd = "";
		if (this._oDate) {
			sYyyymmdd = this._oFormatYyyymmdd.format(this._oDate);
		}

		this.setProperty("yyyymmdd", sYyyymmdd, true);

		if (this.getDomRef()) {
			// update value in input field
			var sOutputValue = "";
			var $Input = jQuery(this.getInputDomRef());
			if (this._bMobile && this._oDate) {
				// on mobile devices the date is displayed in native pattern, so it must be
				// converted into control pattern for value property
				sOutputValue = this._oFormatMobile.format(this._oDate);
			}else{
				// format date again - maybe value uses not the right pattern ???
				sOutputValue = sValue;
			}
			$Input.val(sOutputValue);
		}

		return this;

	};

	sap.ui.commons.DatePicker.prototype.setYyyymmdd = function(sYyyymmdd) {

		var sOldYyyymmdd = this.getYyyymmdd();
		if (sYyyymmdd == sOldYyyymmdd) {
			return this;
		}

		this.setProperty("yyyymmdd", sYyyymmdd, true);
		this._bValueSet = false;

		var sValue = "";

		if (sYyyymmdd) {
			this._oDate = this._oFormatYyyymmdd.parse(sYyyymmdd);
		} else {
			this._oDate = undefined;
		}

		if (this._oDate) {
			sValue = this._formatValue(this._oDate);
		}
		this.setProperty("value", sValue, true);

		if (this.getDomRef()) {
			// update value in input field
			var sOutputValue = "";
			var $Input = jQuery(this.getInputDomRef());
			if (this._bMobile && this._oDate) {
				// on mobile devices the date is displayed in native pattern, so it must be
				// converted into control pattern for value property
				sOutputValue = this._oFormatMobile.format(this._oDate);
			}else{
				// format date again - maybe value uses not the right pattern ???
				sOutputValue = sValue;
			}
			$Input.val(sOutputValue);
		}

		return this;

	};

	sap.ui.commons.DatePicker.prototype.setLocale = function(sLocale) {

		// Worth checking if there is any change to process:
		var sOldLoc = this.getLocale();
		if(sLocale == sOldLoc) {
			return this;
		}

		// Saving the supplied locale:
		// "true" to suppress rendering. Rendering done on VALUE change.
		this.setProperty("locale", sLocale, true);

		var that = this;
		_checkLocaleAllowed(that);

		// get locale object and save it as it is used in the formatter
		this._oLocale = new sap.ui.core.Locale(sLocale);

		// to create new formatter according to locale
		this._sUsedPattern = undefined;

		// format value according to new locale
		var sValue = "";
		if (this._bValueSet) {
			// value was set, maybe locale set later -> parse again
			sValue = this.getValue();

			if (sValue) {
				this._oDate = this._parseValue(sValue);
			} else {
				this._oDate = undefined;
			}

			var sYyyymmdd = "";
			if (this._oDate) {
				sYyyymmdd = this._oFormatYyyymmdd.format(this._oDate);
			}

			this.setProperty("yyyymmdd", sYyyymmdd, true);
		}else{
			// yyyymmdd set or date set by calendar -> format to value again
			if (this._oDate) {
				sValue = this._formatValue(this._oDate);
			}
			this.setProperty("value", sValue, true);
		}

		if (this.getDomRef()) {
			// update value in input field
			var sOutputValue = "";
			var $Input = jQuery(this.getInputDomRef());
			if (this._bMobile && this._oDate) {
				// on mobile devices the date is displayed in native pattern, so it must be
				// converted into control pattern for value property
				sOutputValue = this._oFormatMobile.format(this._oDate);
			}else{
				// format date again - maybe value uses not the right pattern ???
				sOutputValue = sValue;
			}
			$Input.val(sOutputValue);
		}

		return this;

	};

	/*
	 * Overwrites the method in TextField to add additional YYYYMMDD parameter
	 */
	sap.ui.commons.DatePicker.prototype._checkChange = function(oEvent) {

		var oInput = this.getInputDomRef();
		var sNewValue = oInput && oInput.value;

		if (this._bMobile && sNewValue != "") {
			// on mobile devices the date is displayed in native pattern, so it must be
			// converted into control pattern for value property
			this._oDate = this._oFormatMobile.parse(sNewValue);
			sNewValue = this._formatValue(this._oDate);
		}

		if(this.getEditable() && this.getEnabled() && sNewValue != this.getValue()) {
			// check if input in valid pattern
			var bWrong = false;
			if (sNewValue != "") {
				if (!this._bMobile) {
					// in mobile case no wrong input is possible
					this._oDate = this._parseValue(sNewValue);
					if (this._oDate) {
						// just format date to right pattern, because maybe a fallback pattern is used in the parsing
						sNewValue = this._formatValue(this._oDate);
						oInput.value = sNewValue;
						if(this._oPopup && this._oPopup.isOpen()) {
							this._oCalendar.focusDate(this._oDate);
							if (!this._oDateRange.getStartDate() || this._oDateRange.getStartDate().getTime() != this._oDate.getTime()) {
								this._oDateRange.setStartDate(new Date(this._oDate.getTime()));
							}
						}
					}else{
						bWrong = true;
					}
				}
			}else{
				this._oDate = undefined;
			}

			// set the value in any case
			// in DataBinding case a parsing error is thrown if date can not be parsed
			this.setProperty("value", sNewValue, true);
			this._bValueSet = false;
			if (!bWrong) {
				var sYyyymmdd = "";
				if (this._oDate) {
					sYyyymmdd = this._oFormatYyyymmdd.format(this._oDate);
				}

				this.setProperty("yyyymmdd", sYyyymmdd, true);
			}

			this.fireChange( bWrong );
		}else if(this.getEditable() && this.getEnabled() && sNewValue == this.getYyyymmdd()){
			// the same date is entered as yyyymmdd again -> just set converted value to input field
			oInput.value = this.getValue();
		}

	};

	/**
	 * Fire event change to attached listeners.
	 *
	 * Expects following event parameters:
	 * <ul>
	 * <li>'newValue' of type <code>string</code> The new / changed value of the DatePicker.</li>
	 * <li>'newYyyymmdd' of type <code>string</code> The new / changed Yyyymmdd of the DatePicker. </li>
	 * <li>'invalidValue' of type <code>boolean</code> The new / changed value of the DatePicker is not a valid date. </li>
	 * </ul>
	 *
	 * @param {boolean} bInvalidValue true is value is invalid
	 * @return {sap.ui.commons.DatePicker} <code>this</code> to allow method chaining
	 * @protected
	 * @name sap.ui.commons.DatePicker#fireChange
	 * @function
	 */
	sap.ui.commons.DatePicker.prototype.fireChange = function(bInvalidValue) {

		this.fireEvent("change", {newValue:this.getValue(),
			newYyyymmdd: this.getYyyymmdd(),
			invalidValue: bInvalidValue});

		return this;

	};

	sap.ui.commons.DatePicker.prototype._parseValue = function(sValue) {

		var that = this;

		var oFormat = _getFormatter(that);

		// convert to date object
		var oDate = oFormat.parse(sValue);
		return oDate;

	};

	sap.ui.commons.DatePicker.prototype._formatValue = function(oDate) {

		var that = this;

		var oFormat = _getFormatter(that);

		// convert to date object
		var sValue = oFormat.format(oDate);
		return sValue;

	};

	function _getFormatter(oThis){

		var sPattern = "";
		var oBinding = oThis.getBinding("value");
		var oLocale;

		if (oBinding && oBinding.oType && (oBinding.oType instanceof sap.ui.model.type.Date)) {
			sPattern = oBinding.oType.getOutputPattern();
		}

		if (!sPattern) {
			// no databinding is used -> use pattern from locale
			oLocale = _getUsedLocale(oThis);
			var oLocaleData = sap.ui.core.LocaleData.getInstance(oLocale);
			sPattern = oLocaleData.getDatePattern("medium");
		}

		if (sPattern != this._sUsedPattern) {
			oThis._sUsedPattern = sPattern;

			if (sPattern == "short" || sPattern == "medium" || sPattern == "long") {
				oThis._oFormat = sap.ui.core.format.DateFormat.getInstance({style: sPattern}, oLocale);
			} else {
				oThis._oFormat = sap.ui.core.format.DateFormat.getInstance({pattern: sPattern}, oLocale);
			}
		}

		return oThis._oFormat;

	}

	function _getUsedLocale(oThis) {

		// Fetch and check if the Control locale can be supported:
		var sLocale = oThis.getLocale();
		var oLocale;
		if (sLocale) {
			oLocale = oThis._oLocale;
		}else {
			oLocale = sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale();
		}

		return oLocale;

	}

	function _checkLocaleAllowed(oThis) {

		var oBinding = oThis.getBinding("value");
		var sLocale = oThis.getLocale();

		if (oBinding && oBinding.oType && (oBinding.oType instanceof sap.ui.model.type.Date) && sLocale) {
			jQuery.sap.log.warning("DatePicker " + oThis.getId() + ": Using a locale and Databinding at the same time is not supported");
			oThis._bIgnoreLocale = true;
		}

	}

	function _open(oThis){

		if(!oThis._oPopup) {
			jQuery.sap.require("sap.ui.core.Popup");
			oThis._oPopup = new sap.ui.core.Popup();
			oThis._oPopup.setAutoClose(true);
			oThis._oPopup.setDurations(0, 0); // no animations
			oThis._oPopup.attachClosed(_handleClosed, oThis);
		}

		if (!oThis._oCalendar) {
			sap.ui.getCore().loadLibrary("sap.ui.unified");
			jQuery.sap.require("sap.ui.unified.library");
			oThis._oCalendar = new sap.ui.unified.Calendar(oThis.getId()+"-cal");
			oThis._oDateRange = new sap.ui.unified.DateRange();
			oThis._oCalendar.addSelectedDate(oThis._oDateRange);
			oThis._oCalendar.attachSelect(_selectDate, oThis);
			oThis._oCalendar.attachCancel(_cancel, oThis);
			oThis._oPopup.setContent(oThis._oCalendar);
			// use compact design in commons
			oThis._oCalendar.addStyleClass("sapUiSizeCompact");
			oThis._oCalendar.setPopupMode(true);
			oThis._oCalendar.setParent(oThis, undefined, true); // don't invalidate DatePicker
		}

		oThis._checkChange(); // to prove is something was typed in manually

		var oDate = oThis._oDate;

		if (oDate) {
			oThis._oCalendar.focusDate(oDate);
			if (!oThis._oDateRange.getStartDate() || oThis._oDateRange.getStartDate().getTime() != oDate.getTime()) {
				oThis._oDateRange.setStartDate(new Date(oDate.getTime()));
			}
		} else {
			if (oThis._oDateRange.getStartDate()) {
				oThis._oDateRange.setStartDate(undefined);
			}
		}

		if (!this._bIgnoreLocale) {
			oThis._oCalendar.setLocale(oThis.getLocale());
		}

		oThis._oPopup.setAutoCloseAreas([oThis.getDomRef()]);

		var eDock = sap.ui.core.Popup.Dock;
		oThis._oPopup.open(0, eDock.BeginTop, eDock.BeginBottom, oThis, null, null, true);

	}

	function _toggleOpen(oThis){

		if (oThis.getEditable() && oThis.getEnabled()) {
			if(!oThis._oPopup || !oThis._oPopup.isOpen()) {
				_open(oThis);
			} else {
				oThis._oPopup.close();
				oThis.focus();
			}
		}

	}

	function _selectDate(oEvent){

		var aSelectedDates = this._oCalendar.getSelectedDates();
		var sOutputValue = "";

		if (aSelectedDates.length > 0) {
			this._oDate = aSelectedDates[0].getStartDate();
			sOutputValue = this._formatValue(this._oDate);
		}

		this._oPopup.close();
		this.focus();
		// do not call this._checkChange(); because we already have the date object and no wrong entry is possible
		var sNewValue = this._formatValue(this._oDate);
		this.setProperty("value", sNewValue, true);
		this._bValueSet = false;
		var sYyyymmdd = this._oFormatYyyymmdd.format(this._oDate);
		this.setProperty("yyyymmdd", sYyyymmdd, true);

		// set inputs value after properties because of placeholder logic for IE
		var $Input = this.$("input");
		if ($Input.val() !== sOutputValue) {
			$Input.val(sOutputValue);
			this._curpos = sOutputValue.length;
			$Input.cursorPos(this._curpos);
		}

		this.fireChange();

	}

	function _cancel(oEvent) {

		if(this._oPopup && this._oPopup.isOpen()) {
			this._oPopup.close();
			this.focus();
		}

	}

	function _handleClosed(oEvent) {

		// remove focus from DatePicker field
		if(!jQuery.sap.containsOrEquals(this.getDomRef(), document.activeElement) && this.getRenderer().onblur) {
			this.getRenderer().onblur(this);
		}

	}

	function _incraseDate(oThis, iNumber, sUnit) {

		var oOldDate = oThis._oDate;

		if (oOldDate && oThis.getEditable() && oThis.getEnabled()) {
			// use a new date object to have a real updated property
			var oDate = new Date(oOldDate.getTime());
			var $Input = jQuery(oThis.getInputDomRef());
			var iPos = $Input.cursorPos();

			switch (sUnit) {
			case "day":
				oDate.setDate(oDate.getDate() + iNumber);
				break;
			case "month":
				oDate.setMonth(oDate.getMonth() + iNumber);
				break;
			case "year":
				oDate.setFullYear(oDate.getFullYear() + iNumber);
				break;

			default:
				break;
			}

			oThis._oDate = oDate;

			// update value in input field
			var sOutputValue = oThis._formatValue(oDate);
			$Input.val(sOutputValue);
			$Input.cursorPos(iPos);

		}

	}

}());
