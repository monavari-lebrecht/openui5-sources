/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.ui.table.AnalyticalTable.
jQuery.sap.declare("sap.ui.table.AnalyticalTable");
jQuery.sap.require("sap.ui.table.library");
jQuery.sap.require("sap.ui.table.Table");


/**
 * Constructor for a new AnalyticalTable.
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
 * <li>{@link #getSumOnTop sumOnTop} : boolean (default: false)</li>
 * <li>{@link #getNumberOfExpandedLevels numberOfExpandedLevels} : int (default: 0)</li>
 * <li>{@link #getColumnVisibilityMenuSorter columnVisibilityMenuSorter} : any</li>
 * <li>{@link #getDirty dirty} : boolean</li></ul>
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
 * In addition, all settings applicable to the base type {@link sap.ui.table.Table#constructor sap.ui.table.Table}
 * can be used as well.
 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * Table which handles analytical OData backends
 * @extends sap.ui.table.Table
 *
 * @author  
 * @version 1.22.4
 *
 * @constructor   
 * @public
 * @experimental Since version 1.21. 
 * The AnalyticalTable will be productized soon.
 * @name sap.ui.table.AnalyticalTable
 */
sap.ui.table.Table.extend("sap.ui.table.AnalyticalTable", { metadata : {

	// ---- object ----
	publicMethods : [
		// methods
		"getTotalSize"
	],

	// ---- control specific ----
	library : "sap.ui.table",
	properties : {
		"sumOnTop" : {type : "boolean", group : "Appearance", defaultValue : false},
		"numberOfExpandedLevels" : {type : "int", group : "Misc", defaultValue : 0},
		"columnVisibilityMenuSorter" : {type : "any", group : "Appearance", defaultValue : null},
		"dirty" : {type : "boolean", group : "Appearance", defaultValue : null, deprecated: true}
	}
}});


/**
 * Creates a new subclass of class sap.ui.table.AnalyticalTable with name <code>sClassName</code> 
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
 * @name sap.ui.table.AnalyticalTable.extend
 * @function
 */


/**
 * Getter for property <code>sumOnTop</code>.
 * Specifies if the total values should be displayed in the group headers or on bottom of the row. Does not affact the total sum.
 *
 * Default value is <code>false</code>
 *
 * @return {boolean} the value of property <code>sumOnTop</code>
 * @public
 * @name sap.ui.table.AnalyticalTable#getSumOnTop
 * @function
 */

/**
 * Setter for property <code>sumOnTop</code>.
 *
 * Default value is <code>false</code> 
 *
 * @param {boolean} bSumOnTop  new value for property <code>sumOnTop</code>
 * @return {sap.ui.table.AnalyticalTable} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.table.AnalyticalTable#setSumOnTop
 * @function
 */


/**
 * Getter for property <code>numberOfExpandedLevels</code>.
 * Number of levels, which should be opened initially (on first load of data).
 *
 * Default value is <code>0</code>
 *
 * @return {int} the value of property <code>numberOfExpandedLevels</code>
 * @public
 * @name sap.ui.table.AnalyticalTable#getNumberOfExpandedLevels
 * @function
 */

/**
 * Setter for property <code>numberOfExpandedLevels</code>.
 *
 * Default value is <code>0</code> 
 *
 * @param {int} iNumberOfExpandedLevels  new value for property <code>numberOfExpandedLevels</code>
 * @return {sap.ui.table.AnalyticalTable} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.table.AnalyticalTable#setNumberOfExpandedLevels
 * @function
 */


/**
 * Getter for property <code>columnVisibilityMenuSorter</code>.
 * Functions which is used to sort the column visibility menu entries e.g.: function(ColumnA, ColumnB) { return 0 = equals, <0 lower, >0 greater }; Other values than functions will be ignored.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {any} the value of property <code>columnVisibilityMenuSorter</code>
 * @public
 * @name sap.ui.table.AnalyticalTable#getColumnVisibilityMenuSorter
 * @function
 */

/**
 * Setter for property <code>columnVisibilityMenuSorter</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {any} oColumnVisibilityMenuSorter  new value for property <code>columnVisibilityMenuSorter</code>
 * @return {sap.ui.table.AnalyticalTable} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.table.AnalyticalTable#setColumnVisibilityMenuSorter
 * @function
 */


/**
 * Getter for property <code>dirty</code>.
 * If dirty the content of the Table will be overlayed.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {boolean} the value of property <code>dirty</code>
 * @public
 * @deprecated Since version 1.21.2. 
 * Please use setShowOverlay instead.
 * @name sap.ui.table.AnalyticalTable#getDirty
 * @function
 */

/**
 * Setter for property <code>dirty</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {boolean} bDirty  new value for property <code>dirty</code>
 * @return {sap.ui.table.AnalyticalTable} <code>this</code> to allow method chaining
 * @public
 * @deprecated Since version 1.21.2. 
 * Please use setShowOverlay instead.
 * @name sap.ui.table.AnalyticalTable#setDirty
 * @function
 */


/**
 * Returns the total size of the data entries.
 *
 * @name sap.ui.table.AnalyticalTable.prototype.getTotalSize
 * @function

 * @type int
 * @public
 */


// Start of sap\ui\table\AnalyticalTable.js
// =====================================================================
// WE START WITH A COPY OF THE TREETABLE AND REFACTOR THE CODING!
// =====================================================================

jQuery.sap.require("sap.ui.model.analytics.TreeBindingAdapter");
jQuery.sap.require("sap.ui.table.AnalyticalColumn");

/**
 * Initialization of the AnalyticalTable control
 * @private
 */
sap.ui.table.AnalyticalTable.prototype.init = function() {
	sap.ui.table.Table.prototype.init.apply(this, arguments);
	
	this.addStyleClass("sapUiAnalyticalTable");
	
	this.attachBrowserEvent("contextmenu", this._onContextMenu);
	
	// defaulting properties
	this.setSelectionMode(sap.ui.table.SelectionMode.MultiToggle);
	this.setShowColumnVisibilityMenu(true);
	this.setEnableColumnFreeze(true);
	this.setEnableCellFilter(true);
	this._aGroupedColumns = [];
	
	// adopting properties and load icon fonts for bluecrystal
	if (sap.ui.getCore().getConfiguration().getTheme() === "sap_bluecrystal") {
	
		// add the icon fonts
		jQuery.sap.require("sap.ui.core.IconPool");
		sap.ui.core.IconPool.insertFontFaceStyle();
		
		// defaulting the rowHeight
		this.setRowHeight(32);
		
	}
	
};

sap.ui.table.AnalyticalTable.prototype.setFixedRowCount = function() {
	jQuery.sap.log.error("The property fixedRowCount is not supported by the AnalyticalTable and must not be set!");
	return this;
};

sap.ui.table.AnalyticalTable.prototype.setFixedBottomRowCount = function() {
	jQuery.sap.log.error("The property fixedBottomRowCount is managed by the AnalyticalTable and must not be set!");
	return this;
};

/**
 * Rerendering handling
 * @private
 */
sap.ui.table.AnalyticalTable.prototype.onAfterRendering = function() {
	sap.ui.table.Table.prototype.onAfterRendering.apply(this, arguments);
	this.$().find("[role=grid]").attr("role", "treegrid");
};

sap.ui.table.AnalyticalTable.prototype.setDirty = function(bDirty) {
	jQuery.sap.log.error("The property \"dirty\" is deprecated. Please use \"showOverlay\".");
	this.setProperty("dirty", bDirty, true);
	this.setShowOverlay(this.getDirty());
	return this;
};

sap.ui.table.AnalyticalTable.prototype.getModel = function(oModel, sName) {
	var oModel = sap.ui.table.Table.prototype.getModel.apply(this, arguments);
	if (oModel && sap.ui.model.odata && oModel instanceof sap.ui.model.odata.ODataModel) {
		jQuery.sap.require("sap.ui.model.analytics.ODataModelAdapter");
		sap.ui.model.analytics.ODataModelAdapter.apply(oModel);
	}
	return oModel;
};

sap.ui.table.AnalyticalTable.prototype._bindAggregation = function(sName, sPath, oTemplate, oSorter, aFilters) {
	if (sName === "rows") {
		// make sure to reset the first visible row (currently needed for the analytical binding)
		// TODO: think about a boundary check to reset the firstvisiblerow if out of bounds
		this.setProperty("firstVisibleRow", 0, true);
	}
	return sap.ui.table.Table.prototype._bindAggregation.apply(this, arguments);
};

sap.ui.table.AnalyticalTable.prototype.bindRows = function(oBindingInfo) {
	var sPath,
		oTemplate,
		aSorters,
		aFilters;
	
	// Old API compatibility (sName, sPath, oTemplate, oSorter, aFilters)
	if (typeof oBindingInfo == "string") {
		sPath = arguments[0];
		oTemplate = arguments[1];
		aSorters = arguments[2];
		aFilters = arguments[3];
		oBindingInfo = {path: sPath, sorter: aSorters, filters: aFilters};
		// allow either to pass the template or the factory function as 3rd parameter
		if (oTemplate instanceof sap.ui.base.ManagedObject) {
			oBindingInfo.template = oTemplate;
		} else if (typeof oTemplate === "function") {
			oBindingInfo.factory = oTemplate;
		}
	}
	
	// extract the sorters from the columns (TODO: reconsider this!)
	var aColumns = this.getColumns();
	for (var i = 0, l = aColumns.length; i < l; i++) {
		if (aColumns[i].getSorted()) {
			oBindingInfo.sorter = oBindingInfo.sorter || [];
			oBindingInfo.sorter.push(new sap.ui.model.Sorter(aColumns[i].getSortProperty() || aColumns[i].getLeadingProperty(), aColumns[i].getSortOrder() === sap.ui.table.SortOrder.Descending));
		}
	}
	
	oBindingInfo.parameters = oBindingInfo.parameters || {};
	oBindingInfo.parameters.analyticalInfo = this._getColumnInformation();
	oBindingInfo.parameters.sumOnTop = this.getSumOnTop();
	oBindingInfo.parameters.numberOfExpandedLevels = this.getNumberOfExpandedLevels();
	
	var vReturn = this.bindAggregation("rows", oBindingInfo);
	this._bSupressRefresh = true;
	this._updateColumns();
	this._bSupressRefresh = false;
	return vReturn;
};

sap.ui.table.AnalyticalTable.prototype._getColumnInformation = function() {
	var aColumns = [],
		aTableColumns = this.getColumns();
	
	for (var i = 0; i < this._aGroupedColumns.length; i++) {
		var oColumn = sap.ui.getCore().byId(this._aGroupedColumns[i]);
		
		if (!oColumn) continue;
		
		aColumns.push({
			name: oColumn.getLeadingProperty(),
			visible: oColumn.getVisible(),
			grouped: oColumn.getGrouped(),
			total: oColumn.getSummed(),
			sorted: oColumn.getSorted(),
			sortOrder: oColumn.getSortOrder(),
			inResult: oColumn.getInResult(),
			formatter: oColumn.getGroupHeaderFormatter()
		});
	}
	
	for (var i = 0; i < aTableColumns.length; i++) {
		var oColumn = aTableColumns[i];
		
		if (jQuery.inArray(oColumn.getId(), this._aGroupedColumns) > -1) {
			continue;
		}
		if (!oColumn instanceof sap.ui.table.AnalyticalColumn) {
			jQuery.sap.log.error("You have to use AnalyticalColumns for the Analytical table");
		}
		
		aColumns.push({
			name: oColumn.getLeadingProperty(),
			visible: oColumn.getVisible(),
			grouped: oColumn.getGrouped(),
			total: oColumn.getSummed(),
			sorted: oColumn.getSorted(),
			sortOrder: oColumn.getSortOrder(),
			inResult: oColumn.getInResult(),
			formatter: oColumn.getGroupHeaderFormatter()
		});
	}
	
	return aColumns;
};

sap.ui.table.AnalyticalTable.prototype._updateTableContent = function() {
	sap.ui.table.Table.prototype._updateTableContent.apply(this, arguments);
	
	var oBinding = this.getBinding("rows"),
		iFirstRow = this.getFirstVisibleRow(),
		iFixedBottomRowCount = this.getFixedBottomRowCount(),
		iCount = this.getVisibleRowCount();
	
	if (!oBinding) {
		return;
	}
	
	var iFirstMeasureColumnIndex = this._getFirstMeasureColumnIndex(),
		sMaxGroupHeaderWidth;
	if (iFirstMeasureColumnIndex > -1) {
		var bHasRowHeader = this.getSelectionMode() !== sap.ui.table.SelectionMode.None && this.getSelectionBehavior() !== sap.ui.table.SelectionBehavior.RowOnly;
		var $ths = this.$().find(".sapUiTableCtrlFirstCol > th");
		if (bHasRowHeader) {
			$ths = $ths.not(":nth-child(1)");
		}
		var iOffset = $ths.get(0).getBoundingClientRect().left;
		var iMaxGroupHeaderWidth = 32 + $ths.get(this._getFirstMeasureColumnIndex()).getBoundingClientRect().left - iOffset;
		sMaxGroupHeaderWidth = iMaxGroupHeaderWidth + "px";
	} else {
		sMaxGroupHeaderWidth = "none";
	}

	for (var iRow = 0; iRow < iCount; iRow++) {
		var bIsFixedRow = iRow > (iCount - iFixedBottomRowCount - 1) && oBinding.getLength() > iCount,
			iRowIndex = bIsFixedRow ? (oBinding.getLength() - 1 - (iCount - 1 - iRow)) : iFirstRow + iRow,
			oContextInfo = this.getContextInfoByIndex(iRowIndex),
			oRow = this.getRows()[iRow],
			$row = oRow.$(),
			$fixedRow = oRow.$("fixed"),
			$rowHdr = this.$().find("div[data-sap-ui-rowindex=" + $row.attr("data-sap-ui-rowindex") + "]"),
			iLevel = oContextInfo ? oContextInfo.level : 0;
			
		if (!oContextInfo || !oContextInfo.context) {
			$row.removeAttr("data-sap-ui-level");
			$row.removeAttr('aria-level');
			$row.removeAttr('aria-expanded');
			$row.removeClass("sapUiTableGroupHeader");
			$row.removeClass("sapUiAnalyticalTableSum");
			$row.removeClass("sapUiAnalyticalTableDummy");
			$fixedRow.removeAttr("data-sap-ui-level");
			$fixedRow.removeAttr('aria-level');
			$fixedRow.removeAttr('aria-expanded');
			$fixedRow.removeClass("sapUiTableGroupHeader");
			$rowHdr.removeClass("sapUiTableGroupHeader");
			$rowHdr.html("");
			$rowHdr.removeAttr("data-sap-ui-level");
			$rowHdr.removeClass("sapUiAnalyticalTableSum");
			$rowHdr.removeClass("sapUiAnalyticalTableDummy");
			if (oContextInfo && !oContextInfo.context) {
				$row.addClass("sapUiAnalyticalTableDummy");
				$rowHdr.addClass("sapUiAnalyticalTableDummy");
				$rowHdr.html('<div class="sapUiAnalyticalTableLoading">Loading...</div>');
			}
			continue;
		}
	
		if (oBinding.indexHasChildren && oBinding.indexHasChildren(iRowIndex)) {
			// modify the rows
			$row.addClass("sapUiTableGroupHeader");
			$fixedRow.addClass("sapUiTableGroupHeader");
			var sClass = oContextInfo.expanded ? "sapUiTableGroupIconOpen" : "sapUiTableGroupIconClosed";
			$row.attr('aria-expanded', oContextInfo.expanded);
			$fixedRow.attr('aria-expanded', oContextInfo.expanded);
			var sGroupHeaderText = oBinding.getGroupName(oContextInfo.context, oContextInfo.level);
			$rowHdr.html("<div class=\"sapUiTableGroupIcon " + sClass + "\" tabindex=\"-1\" title=\"" + sGroupHeaderText + "\" style=\"max-width:"  + sMaxGroupHeaderWidth + "\">" + sGroupHeaderText + "</div>");
			if (oContextInfo.expanded && !this.getSumOnTop()) {
				$row.addClass("sapUiTableRowHidden");
			}
			$row.removeClass("sapUiAnalyticalTableSum");
			$rowHdr.removeClass("sapUiAnalyticalTableSum");
			$row.removeClass("sapUiAnalyticalTableDummy");
			$rowHdr.removeClass("sapUiAnalyticalTableDummy");
			$rowHdr.addClass("sapUiTableGroupHeader").removeAttr("title");
		} else {
			$row.attr('aria-expanded', false);
			$row.removeClass("sapUiTableGroupHeader");
			$row.removeClass("sapUiTableRowHidden");
			$row.removeClass("sapUiAnalyticalTableSum");
			$row.removeClass("sapUiAnalyticalTableDummy");
			
			$fixedRow.attr('aria-expanded', false);
			$fixedRow.removeClass("sapUiTableGroupHeader");

			$rowHdr.html("");
			$rowHdr.removeClass("sapUiTableGroupHeader");
			$rowHdr.removeClass("sapUiAnalyticalTableDummy");
			$rowHdr.removeClass("sapUiAnalyticalTableSum");
			
			if (oContextInfo.sum && oContextInfo.context && oContextInfo.context.getObject()) {
				$row.addClass("sapUiAnalyticalTableSum");
				$rowHdr.addClass("sapUiAnalyticalTableSum");
			}
		}
		$row.attr("data-sap-ui-level", iLevel);
		$fixedRow.attr("data-sap-ui-level", iLevel);
		$rowHdr.attr("data-sap-ui-level", iLevel);
		$row.attr('aria-level', iLevel + 1);
		$fixedRow.attr('aria-level', iLevel + 1);
	}
};

sap.ui.table.AnalyticalTable.prototype.onclick = function(oEvent) {
	if (jQuery(oEvent.target).hasClass("sapUiTableGroupIcon")) {
		this._onNodeSelect(oEvent);
	} else if (jQuery(oEvent.target).hasClass("sapUiAnalyticalTableSum")) {
		//Summs connot be selected
		oEvent.preventDefault();
		return;
	} else {
		if (sap.ui.table.Table.prototype.onclick) {
			sap.ui.table.Table.prototype.onclick.apply(this, arguments);
		}
	}
};

sap.ui.table.AnalyticalTable.prototype.onsapselect = function(oEvent) {
	if (jQuery(oEvent.target).hasClass("sapUiTableGroupIcon")) {
		this._onNodeSelect(oEvent);
	} else if (jQuery(oEvent.target).hasClass("sapUiAnalyticalTableSum")) {
		//Summs connot be selected
		oEvent.preventDefault();
		return;
	} else {
		var $Target = jQuery(oEvent.target),
			$TargetDIV = $Target.closest('div.sapUiTableRowHdr');
		if ($TargetDIV.hasClass('sapUiTableGroupHeader') && $TargetDIV.hasClass('sapUiTableRowHdr')) {
			var iRowIndex = this.getFirstVisibleRow() + parseInt($TargetDIV.attr("data-sap-ui-rowindex"), 10);
			var oBinding = this.getBinding("rows"),
				oContextInfo = oBinding.getContextInfo(iRowIndex);
			
			if (oContextInfo.childCount > 0) {
				this._oSelection.sliceSelectionInterval(iRowIndex + 1, Math.max(iRowIndex + 1, iRowIndex + oContextInfo.childCount));
			}
			oBinding.toggleIndex(iRowIndex);
			this.updateRows();
			return;
		}
		if (sap.ui.table.Table.prototype.onsapselect) {
			sap.ui.table.Table.prototype.onsapselect.apply(this, arguments);
		}
	}
};

sap.ui.table.AnalyticalTable.prototype._onNodeSelect = function(oEvent) {

	var $parent = jQuery(oEvent.target).parent();
	if ($parent.length > 0) {
		var iRowIndex = this.getFirstVisibleRow() + parseInt($parent.attr("data-sap-ui-rowindex"), 10);
		var oBinding = this.getBinding("rows"),
			oContextInfo = oBinding.getContextInfo(iRowIndex);
		
		if (oContextInfo.childCount > 0) {
			this._oSelection.sliceSelectionInterval(iRowIndex + 1, Math.max(iRowIndex + 1, iRowIndex + oContextInfo.childCount));
		}
		oBinding.toggleIndex(iRowIndex);
		this.updateRows();
	}

	oEvent.preventDefault();
	oEvent.stopPropagation();

};

sap.ui.table.AnalyticalTable.prototype._onContextMenu = function(oEvent) {
	if (jQuery(oEvent.target).closest('tr').hasClass('sapUiTableGroupHeader') ||
			jQuery(oEvent.target).closest('.sapUiTableRowHdr.sapUiTableGroupHeader').length > 0) {
		this._iGroupedLevel = jQuery(oEvent.target).closest('[data-sap-ui-level]').data('sap-ui-level');
		var oMenu = this._getGroupHeaderMenu();
		var eDock = sap.ui.core.Popup.Dock;
		oMenu.open(false, oEvent.target, eDock.LeftTop, eDock.LeftTop, document, (oEvent.pageX-2) +" "+ (oEvent.pageY-2));
	
		oEvent.preventDefault();
		oEvent.stopPropagation();
		return;
	}

	return true;
};

sap.ui.table.AnalyticalTable.prototype._getGroupHeaderMenu = function() {

	var that = this;
	function getGroupColumnInfo() {
		var aColumns = that.getColumns(),
			iFoundGroups = 0,
			oColumn;

		for (var i=0; i<aColumns.length; i++) {
			oColumn = aColumns[i];
			if (oColumn.getGrouped()) {
				iFoundGroups++;
				if (iFoundGroups == that._iGroupedLevel) {
					return {
						column: oColumn,
						index: i
					};
				}
			}
		}
		
		return undefined;
	}

	if (!this._oGroupHeaderMenu) {
		this._oGroupHeaderMenu = new sap.ui.unified.Menu();
		this._oGroupHeaderMenuVisibilityItem = new sap.ui.unified.MenuItem({
			text: this._oResBundle.getText("TBL_SHOW_COLUMN"),
			select: function() {
				var oGroupColumnInfo = getGroupColumnInfo();

				if (oGroupColumnInfo) {
					var oColumn = oGroupColumnInfo.column;
					oColumn.setShowIfGrouped(!oColumn.getShowIfGrouped());
				}
			}
		});
		this._oGroupHeaderMenu.addItem(this._oGroupHeaderMenuVisibilityItem);
		this._oGroupHeaderMenu.addItem(new sap.ui.unified.MenuItem({
			text: this._oResBundle.getText("TBL_UNGROUP"),
			select: function() {
				var aColumns = that.getColumns(),
					iFoundGroups = 0,
					iLastGroupedIndex = -1,
					iUngroudpedIndex = -1,
					oColumn;
				for (var i=0; i<aColumns.length; i++) {
					oColumn = aColumns[i];
					if (oColumn.getGrouped()) {
						iFoundGroups++;
						if (iFoundGroups == that._iGroupedLevel) {
							oColumn._bSkipUpdateAI = true;
							oColumn.setGrouped(false);
							oColumn._bSkipUpdateAI = false;
							iUngroudpedIndex = i;
						} else {
							iLastGroupedIndex = i;
						}
					}
				}
				if (iLastGroupedIndex > -1 && iUngroudpedIndex > -1 && iUngroudpedIndex < iLastGroupedIndex) {
					var oUngroupedColumn = aColumns[iUngroudpedIndex];
					var iHeaderSpan = oUngroupedColumn.getHeaderSpan();
					if (jQuery.isArray(iHeaderSpan)) {
						iHeaderSpan = iHeaderSpan[0];
					}
					var aRemovedColumns = [];
					for (var i=iUngroudpedIndex; i<iUngroudpedIndex+iHeaderSpan; i++) {
						aRemovedColumns.push(aColumns[i]);
					}
					jQuery.each(aRemovedColumns, function(iIndex, oColumn) {
						that.removeColumn(oColumn);
						that.insertColumn(oColumn, iLastGroupedIndex);
					});
				}
				that._updateTableColumnDetails();
				that.updateAnalyticalInfo();
			}
		}));
		this._oGroupHeaderMenu.addItem(new sap.ui.unified.MenuItem({
			text: this._oResBundle.getText("TBL_UNGROUP_ALL"),
			select: function() {
				var aColumns = that.getColumns();
				for (var i=0; i<aColumns.length; i++) {
					aColumns[i]._bSkipUpdateAI = true;
					aColumns[i].setGrouped(false);
					aColumns[i]._bSkipUpdateAI = false;
				}
				that._bSupressRefresh = true;
				that._updateTableColumnDetails();
				that.updateAnalyticalInfo();
				that._bSupressRefresh = false;
			}
		}));
		this._oGroupHeaderMoveUpItem = new sap.ui.unified.MenuItem({
			text: this._oResBundle.getText("TBL_MOVE_UP"),
			select: function() {
				var oGroupColumnInfo = getGroupColumnInfo();

				if (oGroupColumnInfo) {
					var oColumn = oGroupColumnInfo.column;
					var iIndex = jQuery.inArray(oColumn.getId(), that._aGroupedColumns);
					if (iIndex > 0) {
						that._aGroupedColumns[iIndex] = that._aGroupedColumns.splice(iIndex - 1, 1, that._aGroupedColumns[iIndex])[0];
						that.updateAnalyticalInfo();
					}
				}
			},
			icon: "sap-icon://arrow-top"
		});
		this._oGroupHeaderMenu.addItem(this._oGroupHeaderMoveUpItem);
		this._oGroupHeaderMoveDownItem = new sap.ui.unified.MenuItem({
			text: this._oResBundle.getText("TBL_MOVE_DOWN"),
			select: function() {
				var oGroupColumnInfo = getGroupColumnInfo();

				if (oGroupColumnInfo) {
					var oColumn = oGroupColumnInfo.column;
					var iIndex = jQuery.inArray(oColumn.getId(), that._aGroupedColumns);
					if (iIndex < that._aGroupedColumns.length) {
						that._aGroupedColumns[iIndex] = that._aGroupedColumns.splice(iIndex + 1, 1, that._aGroupedColumns[iIndex])[0];
						that.updateAnalyticalInfo();
					}
				}
			},
			icon: "sap-icon://arrow-bottom"
		});
		this._oGroupHeaderMenu.addItem(this._oGroupHeaderMoveDownItem);
		this._oGroupHeaderMenu.addItem(new sap.ui.unified.MenuItem({
			text: this._oResBundle.getText("TBL_SORT_ASC"),
			select: function() {
				var oGroupColumnInfo = getGroupColumnInfo();

				if (oGroupColumnInfo) {
					var oColumn = oGroupColumnInfo.column;

					oColumn.sort(false); //update Analytical Info triggered by aftersort in column
				}
			},
			icon: "sap-icon://up"
		}));
		this._oGroupHeaderMenu.addItem(new sap.ui.unified.MenuItem({
			text: this._oResBundle.getText("TBL_SORT_DESC"),
			select: function() {
				var oGroupColumnInfo = getGroupColumnInfo();

				if (oGroupColumnInfo) {
					var oColumn = oGroupColumnInfo.column;

					oColumn.sort(true); //update Analytical Info triggered by aftersort in column
				}
			},
			icon: "sap-icon://down"
		}));
		this._oGroupHeaderMenu.addItem(new sap.ui.unified.MenuItem({
			text: this._oResBundle.getText("TBL_COLLAPSE_LEVEL"),
			select: function() {
				that.getBinding("rows").collapseAll(that._iGroupedLevel);
				that._oSelection.clearSelection();
				that.updateRows();
			}
		}));
		this._oGroupHeaderMenu.addItem(new sap.ui.unified.MenuItem({
			text: this._oResBundle.getText("TBL_COLLAPSE_ALL"),
			select: function() {
				that.getBinding("rows").collapseAll();
				that._oSelection.clearSelection();
				that.updateRows();
			}
		}));
	}
	
	var oGroupColumnInfo = getGroupColumnInfo();
	if (oGroupColumnInfo) {
		var oColumn = oGroupColumnInfo.column;
		if (oColumn.getShowIfGrouped()) {
			this._oGroupHeaderMenuVisibilityItem.setText(this._oResBundle.getText("TBL_HIDE_COLUMN"));
		} else {
			this._oGroupHeaderMenuVisibilityItem.setText(this._oResBundle.getText("TBL_SHOW_COLUMN"));
		}
		this._oGroupHeaderMoveUpItem.setEnabled(oGroupColumnInfo.index > 0);
		this._oGroupHeaderMoveDownItem.setEnabled(oGroupColumnInfo.index < this._aGroupedColumns.length - 2);
	} else {
		this._oGroupHeaderMoveUpItem.setEnabled(true);
		this._oGroupHeaderMoveDownItem.setEnabled(true);
	}

	return this._oGroupHeaderMenu;

};

sap.ui.table.AnalyticalTable.prototype.expand = function(iRowIndex) {
	var oBinding = this.getBinding("rows");
	if (oBinding) {
		var oContext = this.getContextByIndex(iRowIndex);
		oBinding.expand(oContext);
		this.updateRows();
	}
};

sap.ui.table.AnalyticalTable.prototype.collapse = function(iRowIndex) {
	var oBinding = this.getBinding("rows");
	if (oBinding) {
		var oContext = this.getContextByIndex(iRowIndex);
		var oContextInfo = oBinding.getContextInfo(iRowIndex);
		if (oContextInfo.childCount > 0) {
			this._oSelection.sliceSelectionInterval(iRowIndex + 1, iRowIndex + 1 + oContextInfo.childCount);
		}
		oBinding.collapse(oContext);
		this.updateRows();
	}
};

sap.ui.table.AnalyticalTable.prototype.isExpanded = function(iRowIndex) {
	var oBinding = this.getBinding("rows");
	if (oBinding) {
		var oContext = this.getContextByIndex(iRowIndex);
		return oBinding.isExpanded(oContext);
	}
	return false;
};

sap.ui.table.AnalyticalTable.prototype.getContextInfoByIndex = function(iIndex) {
	var oBinding = this.getBinding("rows");
	return iIndex >= 0 && oBinding ? oBinding.getContextInfo(iIndex) : null;
};

sap.ui.table.AnalyticalTable.prototype._onColumnMoved = function(oEvent) {
	sap.ui.table.Table.prototype._onColumnMoved.apply(this, arguments);
	this.updateAnalyticalInfo();
};

sap.ui.table.AnalyticalTable.prototype.addColumn = function(vColumn, bSuppressInvalidate) {
	var oColumn = this._getColumn(vColumn);
	if (oColumn.getGrouped()) {
		this._aGroupedColumns.push(oColumn.getId());
	}
	return sap.ui.table.Table.prototype.addColumn.call(this, oColumn, bSuppressInvalidate);
};

sap.ui.table.AnalyticalTable.prototype.insertColumn = function(vColumn, iIndex, bSuppressInvalidate) {
	var oColumn = this._getColumn(vColumn);
	if (oColumn.getGrouped()) {
		this._aGroupedColumns.push(oColumn.getId());
	}
	return sap.ui.table.Table.prototype.insertColumn.call(this, oColumn, iIndex, bSuppressInvalidate);
};

sap.ui.table.AnalyticalTable.prototype.removeColumn = function(vColumn, bSuppressInvalidate) {
	var oColumn = sap.ui.table.Table.prototype.removeColumn.apply(this, arguments);
	if (oColumn) {
		this._aGroupedColumns = jQuery.grep(this._aGroupedColumns, function(value) {
			return value != oColumn.getId();
		});
	}
	return oColumn;
};

sap.ui.table.AnalyticalTable.prototype.removeAllColumns = function(bSuppressInvalidate) {
	this._aGroupedColumns = [];
	return sap.ui.table.Table.prototype.removeColumn.apply(this, arguments);
};

sap.ui.table.AnalyticalTable.prototype._getColumn = function(vColumn) {
	if (typeof vColumn === "string") {
		var oColumn =  new sap.ui.table.AnalyticalColumn({
			leadingProperty: vColumn,
			template: vColumn,
			managed: true
		});
		var oModel = this.getModel();
		if (oModel) {
			this._updateColumn(oColumn);
		}
		return oColumn;
	} else if (vColumn instanceof sap.ui.table.AnalyticalColumn) {
		return vColumn;
	} else {
		throw new Error("Wrong column type. You need to define a string (property) or pass an AnalyticalColumnObject");
	}
};

sap.ui.table.AnalyticalTable.prototype._updateColumns = function() {
	var that = this;
	jQuery.each(this.getColumns(), function(iIndex, oColumn) {
		oColumn._bSkipUpdateAI = true;
		that._updateColumn(oColumn);
		oColumn._bSkipUpdateAI = false;
	});
	this._updateTableColumnDetails();
	this.updateAnalyticalInfo();
};

sap.ui.table.AnalyticalTable.prototype._updateColumn = function(oColumn) {
	var sLeadingProperty = oColumn.getLeadingProperty(),
		oBinding = this.getBinding("rows"),
		oResultSet = oBinding && oBinding.getAnalyticalQueryResult(),
		oEntityType = oResultSet && oResultSet.getEntityType(),
		aFilterablePropertyNames = oEntityType && oEntityType.getFilterablePropertyNames(),
		aSortablePropertyNames = oEntityType && oEntityType.getSortablePropertyNames(),
		mProperties = oEntityType && oEntityType.getProperties();
	
	if (jQuery.inArray(sLeadingProperty, aFilterablePropertyNames) > -1) {
		oColumn.setFilterProperty(sLeadingProperty);
	} else {
		oColumn.setFilterProperty("");
	}
	
	if (jQuery.inArray(sLeadingProperty, aSortablePropertyNames) > -1) {
		oColumn.setSortProperty(sLeadingProperty);
	} else {
		oColumn.setSortProperty("");
	}
	
	// support to determine the FilterType for the leading property
	var oProperty = mProperties && mProperties[sLeadingProperty];
	if (oProperty) {
		var sType = undefined;
		switch (oProperty.type) {
			case "Edm.Time":
				sType = "sap.ui.model.type.Time";
				break;
			case "Edm.DateTime":
			case "Edm.DateTimeOffset":
				sType = "sap.ui.model.type.DateTime";
				break;
			case "Edm.Single":
			case "Edm.Double":
			case "Edm.Decimal":
				sType = "sap.ui.model.type.Float";
				break;
			case "Edm.SByte":
			case "Edm.Int16":
			case "Edm.Int32":
			case "Edm.Int64":
				sType = "sap.ui.model.type.Integer";
				break;
			case "Edm.Boolean":
				sType = "sap.ui.model.type.Boolean";
				break;
		}
		oColumn.setFilterType(sType);
	} else {
		oColumn.setFilterType(undefined);
	}
	
};

sap.ui.table.AnalyticalTable.prototype.updateAnalyticalInfo = function(bSupressRefresh) {
	var oBinding = this.getBinding("rows");
	if (oBinding) {
		var aColumnInfo = this._getColumnInformation();
		oBinding.updateAnalyticalInfo(aColumnInfo);
		this._updateTotalRow(aColumnInfo, true);
		if (bSupressRefresh || this._bSupressRefresh) {
			return;
		}
		this.refreshRows();
	}
};

sap.ui.table.AnalyticalTable.prototype._updateTotalRow = function(aColumnInfo, bSuppressInvalidate) {

	var bHasTotal = false;
	for (var i = 0, l = aColumnInfo ? aColumnInfo.length : 0; i < l; i++) {
		if (aColumnInfo[i].total) {
			bHasTotal = true;
			break;
		}
	}
	
	var oBinding = this.getBinding("rows");
	if (oBinding && !oBinding.bProvideGrandTotals) {
		bHasTotal = false;
	}
	
	if (bHasTotal) {
		this.setProperty("fixedBottomRowCount", 1, bSuppressInvalidate);
	} else {
		this.setProperty("fixedBottomRowCount", 0, bSuppressInvalidate);
	}
	
};

sap.ui.table.AnalyticalTable.prototype._updateTableColumnDetails = function() {
	var oBinding = this.getBinding("rows"),
		oResult = oBinding && oBinding.getAnalyticalQueryResult();

	if (oResult) {
		var aColumns = this.getColumns(),
			iColCount = aColumns.length,
			bLastAndGroupedFound = false,
			aGroupedDimensions = [],
			iGroupedColumns = 0,
			iGroupableColumns = 0,
			oColumn,
			oDimension,
			iDimensionIndex;

		for (var i=iColCount-1; i>=0; i--) {
			oColumn = aColumns[i];
			oColumn._isLastGroupableLeft = false;
			oColumn._bLastGroupAndGrouped = false;
			oColumn._bDependendGrouped = false;
			
			if (!oColumn.getVisible()) {
				continue;
			}
			
			oDimension = oResult.findDimensionByPropertyName(oColumn.getLeadingProperty());
			
			if (oDimension) {
				iGroupableColumns++;
				if (oColumn.getGrouped()) {
					aGroupedDimensions[i] = oDimension;
					iGroupedColumns++;
				}
			}
			
			if (!bLastAndGroupedFound && oDimension) {
				if (oColumn.getGrouped()) {
					oColumn._bLastGroupAndGrouped = true;
				}
				bLastAndGroupedFound = true;
			}
			
		}
		
		for (var i=iColCount-1; i>=0; i--) {
			oColumn = aColumns[i];
			
			if (!oColumn.getVisible()) {
				continue;
			}
			
			oDimension = oResult.findDimensionByPropertyName(oColumn.getLeadingProperty());
			iDimensionIndex = jQuery.inArray(oDimension, aGroupedDimensions);
			
			if (iDimensionIndex > -1 && iDimensionIndex != i && !oColumn._bLastGroupAndGrouped) {
				oColumn._bDependendGrouped = true;
			}
			
			if (oDimension && !oColumn.getGrouped() && oColumn.getVisible() && iGroupedColumns + 1 == iGroupableColumns) {
				oColumn._isLastGroupableLeft = true;
			}
		}
		
	}
};

sap.ui.table.AnalyticalTable.prototype._getFirstMeasureColumnIndex = function() {
	var oBinding = this.getBinding("rows"),
		oResultSet = oBinding && oBinding.getAnalyticalQueryResult(),
		aColumns = this._getVisibleColumns();
	
	if (!oResultSet) {
		return -1;
	}
	
	for(var i=0; i < aColumns.length; i++) {
		var oColumn = aColumns[i],
			sLeadingProperty = oColumn.getLeadingProperty();

		if (oResultSet.findMeasureByName(sLeadingProperty) || oResultSet.findMeasureByPropertyName(sLeadingProperty)) {
			return i;
		}
	}
};

sap.ui.table.AnalyticalTable.prototype.getTotalSize = function() {
	var oBinding = this.getBinding("rows");
	if (oBinding) {
		return oBinding.getTotalSize();
	}
	return 0;
};

sap.ui.table.AnalyticalTable.prototype._onPersoApplied = function() {
	sap.ui.table.Table.prototype._onPersoApplied.apply(this, arguments);
	this._aGroupedColumns = [];
	var aColumns = this.getColumns();
	for (var i = 0, l = aColumns.length; i < l; i++) {
		if (aColumns[i].getGrouped()) {
			this._aGroupedColumns.push(aColumns[i].getId());
		}
	}
	this._updateTableColumnDetails();
	this.updateAnalyticalInfo();
};
