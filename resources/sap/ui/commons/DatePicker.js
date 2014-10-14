/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.commons.DatePicker");jQuery.sap.require("sap.ui.commons.library");jQuery.sap.require("sap.ui.commons.TextField");sap.ui.commons.TextField.extend("sap.ui.commons.DatePicker",{metadata:{library:"sap.ui.commons",properties:{"locale":{type:"string",group:"Misc",defaultValue:null},"yyyymmdd":{type:"string",group:"Misc",defaultValue:null}}}});jQuery.sap.require("sap.ui.model.type.Date");(function(){sap.ui.commons.DatePicker.prototype.init=function(){sap.ui.commons.TextField.prototype.init.apply(this,arguments);this._oFormatYyyymmdd=sap.ui.core.format.DateFormat.getInstance({pattern:"yyyyMMdd"});if(sap.ui.Device.browser.mobile){this._bMobile=true;this._oFormatMobile=sap.ui.core.format.DateFormat.getInstance({pattern:"yyyy-MM-dd"})}};sap.ui.commons.DatePicker.prototype.exit=function(){this._oDate=undefined;this._oLocale=undefined;if(this._oPopup){if(this._oPopup.isOpen()){this._oPopup.close()}delete this._oPopup}if(this._oCalendar){this._oCalendar.destroy();delete this._oCalendar}};sap.ui.commons.DatePicker.prototype.onAfterRendering=function(){if(this._bMobile){if(this._oDate){var i=jQuery(this.getInputDomRef());var o=this._oFormatMobile.format(this._oDate);i.val(o)}}};sap.ui.commons.DatePicker.prototype.invalidate=function(o){if(!o||o!=this._oCalendar){sap.ui.core.Control.prototype.invalidate.apply(this,arguments)}};sap.ui.commons.DatePicker.prototype.onsapshow=function(E){var t=this;d(t);E.preventDefault()};sap.ui.commons.DatePicker.prototype.onsaphide=sap.ui.commons.DatePicker.prototype.onsapshow;sap.ui.commons.DatePicker.prototype.onsappageup=function(E){var t=this;h(t,1,"day");E.preventDefault()};sap.ui.commons.DatePicker.prototype.onsappageupmodifiers=function(E){var t=this;if(!E.ctrlKey&&E.shiftKey){h(t,1,"month")}else{h(t,1,"year")}E.preventDefault()};sap.ui.commons.DatePicker.prototype.onsappagedown=function(E){var t=this;h(t,-1,"day");E.preventDefault()};sap.ui.commons.DatePicker.prototype.onsappagedownmodifiers=function(E){var t=this;if(!E.ctrlKey&&E.shiftKey){h(t,-1,"month")}else{h(t,-1,"year")}E.preventDefault()};sap.ui.commons.DatePicker.prototype.onclick=function(E){if(jQuery(E.target).hasClass("sapUiTfDateIcon")&&!this._bMobile){var t=this;d(t)}};sap.ui.commons.DatePicker.prototype.onsapfocusleave=function(E){if(this._oCalendar&&E.relatedControlId&&(jQuery.sap.containsOrEquals(this._oCalendar.getDomRef(),sap.ui.getCore().byId(E.relatedControlId).getFocusDomRef())||this.getId()==E.relatedControlId)){return}sap.ui.commons.TextField.prototype.onsapfocusleave.apply(this,arguments)};sap.ui.commons.DatePicker.prototype.setValue=function(v){var o=this.getValue();if(v==o){return this}var t=this;b(t);this.setProperty("value",v,true);this._bValueSet=true;if(v){this._oDate=this._parseValue(v)}else{this._oDate=undefined}var y="";if(this._oDate){y=this._oFormatYyyymmdd.format(this._oDate)}this.setProperty("yyyymmdd",y,true);if(this.getDomRef()){var O="";var i=jQuery(this.getInputDomRef());if(this._bMobile&&this._oDate){O=this._oFormatMobile.format(this._oDate)}else{O=v}i.val(O)}return this};sap.ui.commons.DatePicker.prototype.setYyyymmdd=function(y){var o=this.getYyyymmdd();if(y==o){return this}this.setProperty("yyyymmdd",y,true);this._bValueSet=false;var v="";if(y){this._oDate=this._oFormatYyyymmdd.parse(y)}else{this._oDate=undefined}if(this._oDate){v=this._formatValue(this._oDate)}this.setProperty("value",v,true);if(this.getDomRef()){var O="";var i=jQuery(this.getInputDomRef());if(this._bMobile&&this._oDate){O=this._oFormatMobile.format(this._oDate)}else{O=v}i.val(O)}return this};sap.ui.commons.DatePicker.prototype.setLocale=function(l){var o=this.getLocale();if(l==o){return this}this.setProperty("locale",l,true);var t=this;b(t);this._oLocale=new sap.ui.core.Locale(l);this._sUsedPattern=undefined;var v="";if(this._bValueSet){v=this.getValue();if(v){this._oDate=this._parseValue(v)}else{this._oDate=undefined}var y="";if(this._oDate){y=this._oFormatYyyymmdd.format(this._oDate)}this.setProperty("yyyymmdd",y,true)}else{if(this._oDate){v=this._formatValue(this._oDate)}this.setProperty("value",v,true)}if(this.getDomRef()){var O="";var i=jQuery(this.getInputDomRef());if(this._bMobile&&this._oDate){O=this._oFormatMobile.format(this._oDate)}else{O=v}i.val(O)}return this};sap.ui.commons.DatePicker.prototype._checkChange=function(E){var i=this.getInputDomRef();var n=i&&i.value;if(this._bMobile&&n!=""){this._oDate=this._oFormatMobile.parse(n);n=this._formatValue(this._oDate)}if(this.getEditable()&&this.getEnabled()&&n!=this.getValue()){var w=false;if(n!=""){if(!this._bMobile){this._oDate=this._parseValue(n);if(this._oDate){n=this._formatValue(this._oDate);i.value=n;if(this._oPopup&&this._oPopup.isOpen()){this._oCalendar.focusDate(this._oDate);if(!this._oDateRange.getStartDate()||this._oDateRange.getStartDate().getTime()!=this._oDate.getTime()){this._oDateRange.setStartDate(new Date(this._oDate.getTime()))}}}else{w=true}}}else{this._oDate=undefined}this.setProperty("value",n,true);this._bValueSet=false;if(!w){var y="";if(this._oDate){y=this._oFormatYyyymmdd.format(this._oDate)}this.setProperty("yyyymmdd",y,true)}this.fireChange(w)}else if(this.getEditable()&&this.getEnabled()&&n==this.getYyyymmdd()){i.value=this.getValue()}};sap.ui.commons.DatePicker.prototype.fireChange=function(i){this.fireEvent("change",{newValue:this.getValue(),newYyyymmdd:this.getYyyymmdd(),invalidValue:i});return this};sap.ui.commons.DatePicker.prototype._parseValue=function(v){var t=this;var F=_(t);var D=F.parse(v);return D};sap.ui.commons.DatePicker.prototype._formatValue=function(D){var t=this;var F=_(t);var v=F.format(D);return v};function _(t){var p="";var B=t.getBinding("value");var l;if(B&&B.oType&&(B.oType instanceof sap.ui.model.type.Date)){p=B.oType.getOutputPattern()}if(!p){l=a(t);var L=sap.ui.core.LocaleData.getInstance(l);p=L.getDatePattern("medium")}if(p!=this._sUsedPattern){t._sUsedPattern=p;if(p=="short"||p=="medium"||p=="long"){t._oFormat=sap.ui.core.format.DateFormat.getInstance({style:p},l)}else{t._oFormat=sap.ui.core.format.DateFormat.getInstance({pattern:p},l)}}return t._oFormat}function a(t){var l=t.getLocale();var L;if(l){L=t._oLocale}else{L=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale()}return L}function b(t){var B=t.getBinding("value");var l=t.getLocale();if(B&&B.oType&&(B.oType instanceof sap.ui.model.type.Date)&&l){jQuery.sap.log.warning("DatePicker "+t.getId()+": Using a locale and Databinding at the same time is not supported");t._bIgnoreLocale=true}}function c(t){if(!t._oPopup){jQuery.sap.require("sap.ui.core.Popup");t._oPopup=new sap.ui.core.Popup();t._oPopup.setAutoClose(true);t._oPopup.setDurations(0,0);t._oPopup.attachClosed(g,t)}if(!t._oCalendar){sap.ui.getCore().loadLibrary("sap.ui.unified");jQuery.sap.require("sap.ui.unified.library");t._oCalendar=new sap.ui.unified.Calendar(t.getId()+"-cal");t._oDateRange=new sap.ui.unified.DateRange();t._oCalendar.addSelectedDate(t._oDateRange);t._oCalendar.attachSelect(e,t);t._oCalendar.attachCancel(f,t);t._oPopup.setContent(t._oCalendar);t._oCalendar.addStyleClass("sapUiSizeCompact");t._oCalendar.setPopupMode(true);t._oCalendar.setParent(t,undefined,true)}t._checkChange();var D=t._oDate;if(D){t._oCalendar.focusDate(D);if(!t._oDateRange.getStartDate()||t._oDateRange.getStartDate().getTime()!=D.getTime()){t._oDateRange.setStartDate(new Date(D.getTime()))}}else{if(t._oDateRange.getStartDate()){t._oDateRange.setStartDate(undefined)}}if(!this._bIgnoreLocale){t._oCalendar.setLocale(t.getLocale())}t._oPopup.setAutoCloseAreas([t.getDomRef()]);var i=sap.ui.core.Popup.Dock;t._oPopup.open(0,i.BeginTop,i.BeginBottom,t,null,null,true)}function d(t){if(t.getEditable()&&t.getEnabled()){if(!t._oPopup||!t._oPopup.isOpen()){c(t)}else{t._oPopup.close();t.focus()}}}function e(E){var s=this._oCalendar.getSelectedDates();var o="";if(s.length>0){this._oDate=s[0].getStartDate();o=this._formatValue(this._oDate)}this._oPopup.close();this.focus();var n=this._formatValue(this._oDate);this.setProperty("value",n,true);this._bValueSet=false;var y=this._oFormatYyyymmdd.format(this._oDate);this.setProperty("yyyymmdd",y,true);var i=this.$("input");if(i.val()!==o){i.val(o);this._curpos=o.length;i.cursorPos(this._curpos)}this.fireChange()}function f(E){if(this._oPopup&&this._oPopup.isOpen()){this._oPopup.close();this.focus()}}function g(E){if(!jQuery.sap.containsOrEquals(this.getDomRef(),document.activeElement)&&this.getRenderer().onblur){this.getRenderer().onblur(this)}}function h(t,n,u){var o=t._oDate;if(o&&t.getEditable()&&t.getEnabled()){var D=new Date(o.getTime());var i=jQuery(t.getInputDomRef());var p=i.cursorPos();switch(u){case"day":D.setDate(D.getDate()+n);break;case"month":D.setMonth(D.getMonth()+n);break;case"year":D.setFullYear(D.getFullYear()+n);break;default:break}t._oDate=D;var O=t._formatValue(D);i.val(O);i.cursorPos(p)}}}());
