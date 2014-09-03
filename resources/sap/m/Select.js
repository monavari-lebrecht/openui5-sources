/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.Select");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.m.Select",{metadata:{publicMethods:["isOpen","close","getItemByKey","getFirstItem","getLastItem","getItemAt","getEnabledItems"],library:"sap.m",properties:{"name":{type:"string",group:"Misc",defaultValue:null},"visible":{type:"boolean",group:"Appearance",defaultValue:true},"enabled":{type:"boolean",group:"Behavior",defaultValue:true},"width":{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'auto'},"maxWidth":{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'100%'},"selectedKey":{type:"string",group:"Data",defaultValue:null},"selectedItemId":{type:"string",group:"Misc",defaultValue:null},"icon":{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},"type":{type:"sap.m.SelectType",group:"Appearance",defaultValue:sap.m.SelectType.Default},"autoAdjustWidth":{type:"boolean",group:"Appearance",defaultValue:false}},defaultAggregation:"items",aggregations:{"items":{type:"sap.ui.core.Item",multiple:true,singularName:"item",bindable:"bindable"},"popup":{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},associations:{"selectedItem":{type:"sap.ui.core.Item",multiple:false}},events:{"change":{}}}});sap.m.Select.M_EVENTS={'change':'change'};jQuery.sap.require("sap.ui.core.EnabledPropagator");jQuery.sap.require("sap.m.SelectRenderer");jQuery.sap.require("sap.m.InputBase");jQuery.sap.require("sap.m.Bar");jQuery.sap.require("sap.m.List");jQuery.sap.require("sap.m.Popover");jQuery.sap.require("sap.m.Dialog");jQuery.sap.require("sap.ui.core.IconPool");sap.ui.core.IconPool.insertFontFaceStyle();sap.ui.core.EnabledPropagator.apply(sap.m.Select.prototype,[true]);
sap.m.Select.prototype._getParentPopup=function(){var s=this.$();return(s&&s.closest("[data-sap-ui-popup]"))||null};
sap.m.Select.prototype._synchronizeSelection=function(i,k,I){if(k!==(i&&i.getKey())){i=this.getItemByKey(""+k);if(i&&(k!=="")){this.setAssociation("selectedItem",i,true);this.setProperty("selectedItemId",i.getId(),true);return}i=this.getDefaultSelectedItem();this._setSelectedItem({item:i||null,id:i?i.getId():"",key:i?i.getKey():"",suppressInvalidate:true})}else if(I.indexOf(i)===-1){jQuery.sap.log.warning('Warning: _synchronizeSelection() the sap.ui.core.Item instance or sap.ui.core.Item id is not a valid aggregation on',this)}};
sap.m.Select.prototype._findFirstEnabledItem=function(I){var I=I||this.getItems();for(var i=0;i<I.length;i++){if(I[i].getEnabled()){return I[i]}}return null};
sap.m.Select.prototype._findLastEnabledItem=function(i){var i=i||this.getItems();return this._findFirstEnabledItem(i.reverse())};
sap.m.Select.prototype._setSelectedItem=function(o){var l;if((o.item===this.getSelectedItem())&&(this.getSelectedKey()===o.key)){return}this.setAssociation("selectedItem",o.item,o.suppressInvalidate);this.setProperty("selectedItemId",o.id,o.suppressInvalidate);this.setProperty("selectedKey",o.key,o.suppressInvalidate);if(o.fireChange){this.fireChange({selectedItem:this.getSelectedItem()})}if(!o.listItemUpdated){l=this._getSelectedListItem();if(l){this.getList().setSelectedItem(l,true)}else if(this.getList()){if(this.getDefaultSelectedItem()){this.getList().setSelectedItem(this.getDefaultSelectedItem().data(sap.m.SelectRenderer.CSS_CLASS+"ListItem"),true)}else if(this.getList().getSelectedItem()){this.getList().setSelectedItem(this.getList().getSelectedItem(),false)}}}};
sap.m.Select.prototype.setSelectedIndex=function(i,I){var I=I||this.getItems(),o;i=(i>I.length-1)?I.length-1:Math.max(0,i);o=I[i];if(o){this._setSelectedItem({item:o,id:o.getId(),key:o.getKey(),fireChange:true,suppressInvalidate:true})}};
sap.m.Select.prototype._getSelectedListItem=function(){var i=this.getSelectedItem();return(i&&i.data(sap.m.SelectRenderer.CSS_CLASS+"ListItem"))||null};
sap.m.Select.prototype._addFocusableParentPopup=function(d){sap.m.Select._publishEventToPopup({action:"add",child:this.getAggregation("popup"),parent:d})};
sap.m.Select.prototype._removeFocusableParentPopup=function(d){sap.m.Select._publishEventToPopup({action:"remove",child:this.getAggregation("popup"),parent:d})};
sap.m.Select._publishEventToPopup=function(o){var p,e;if(!o.parent||!o.child){return}p=o.parent.attr("data-sap-ui-popup");e="sap.ui.core.Popup."+o.action+"FocusableContent"+"-"+p;sap.ui.getCore().getEventBus().publish("sap.ui",e,{id:o.child.getId()})};
sap.m.Select.prototype.scrollToItem=function(l){var p=this.getPopup(),P=p.$().children(".sapMPopoverCont")[0],L=l.getDomRef();if(!p||!P||!l||!L){return}var i=P.scrollTop,a=L.offsetTop,b=jQuery(P).height(),c=jQuery(L).height();if(i>a){P.scrollTop=a}else if((a+c)>(i+b)){P.scrollTop=Math.ceil(a+c-b)}};
sap.m.Select.prototype.setValue=function(v){var l=this.$().children("."+sap.m.SelectRenderer.CSS_CLASS+"Label");if(l&&l.length){l.text(v)}};
sap.m.Select.prototype._mapItemToListItem=function(i){if(!i){return null}var C=sap.m.SelectRenderer.CSS_CLASS,l=C+"Item",L=i.getEnabled()?"Enabled":"Disabled",s=(i===this.getSelectedItem())?l+"Selected":"";var o=new sap.m.StandardListItem().addStyleClass(l+" "+l+L+" "+s);o.setTitle(i.getText());o.setType(i.getEnabled()?sap.m.ListType.Active:sap.m.ListType.Inactive);o.setTooltip(i.getTooltip());i.data(C+"ListItem",o);return o};
sap.m.Select.prototype._findMappedItem=function(l,I){for(var i=0,I=I||this.getItems(),a=I.length;i<a;i++){if(I[i].data(sap.m.SelectRenderer.CSS_CLASS+"ListItem")===l){return I[i]}}return null};
sap.m.Select.prototype._updateSelectedItem=function(i){this._setSelectedItem({item:i||null,id:i?i.getId():"",key:i?i.getKey():"",fireChange:true,suppressInvalidate:true})};
sap.m.Select.prototype._fillList=function(i){var s=this.getSelectedItem();i.forEach(function(I){var l=this._mapItemToListItem(I);this.getList().addAggregation("items",l,true);if(I===s){this.getList().setSelectedItem(l,true)}},this)};
sap.m.Select.prototype._clearList=function(){if(this.getList()){this.getList().destroyAggregation("items",true)}};
sap.m.Select.prototype._isRequiredSelectElement=function(){if(this.getAutoAdjustWidth()){return false}else if(this.getWidth()==="auto"){return true}};
sap.m.Select.prototype._findItemByFirstCharacter=function(c){for(var i=0,I=this.getItems();i<I.length;i++){if(I[i].getText().charAt(0).toUpperCase()===c.toUpperCase()){return I[i]}}};
sap.m.Select.prototype._createList=function(){this._oList=new sap.m.List({width:"100%",mode:sap.m.ListMode.SingleSelectMaster,rememberSelections:false}).addStyleClass(sap.m.SelectRenderer.CSS_CLASS+"List").addEventDelegate({ontap:function(e){this.close()}},this).attachSelectionChange(this.onSelectionChange,this)};
sap.m.Select.prototype.onBeforeOpen=function(){var p=this.getPopup(),P=this["_onBeforeOpen"+this._getPopupType()];this.addStyleClass(sap.m.SelectRenderer.CSS_CLASS+"Pressed");p.addContent(this.getList());this.addContent();P&&P.call(this)};
sap.m.Select.prototype.onAfterOpen=function(){};
sap.m.Select.prototype.onBeforeClose=function(){};
sap.m.Select.prototype.onAfterClose=function(){this.removeStyleClass(sap.m.SelectRenderer.CSS_CLASS+"Pressed")};
sap.m.Select.prototype._setPopup=function(p){this._oPopup=p};
sap.m.Select.prototype._setPopupType=function(p){this._sPopupType=p};
sap.m.Select.prototype._getPopupType=function(){return this._sPopupType};
sap.m.Select.prototype._createPopover=function(){var p=new sap.m.Popover({showHeader:false,placement:sap.m.PlacementType.Vertical,offsetX:0,offsetY:0,initialFocus:this,bounce:false});this._decoratePopover(p);return p};
sap.m.Select.prototype._decoratePopover=function(p){var s=this;p._removeArrow=function(){this._marginTop=0;this._marginLeft=0;this._marginRight=0;this._marginBottom=0;this._arrowOffset=0;this._offsets=["0 0","0 0","0 0","0 0"]};p._setPosition=function(){this._myPositions=["begin bottom","begin center","begin top","end center"];this._atPositions=["begin top","end center","begin bottom","begin center"]};p._setArrowPosition=function(){};p._setMinWidth=function(w){this.getDomRef().style.minWidth=w};p._setWidth=function(w){var a=s.getAutoAdjustWidth(),i=s.getType()==="IconOnly",P;if(sap.ui.Device.system.desktop||sap.ui.Device.system.tablet){P=this.getContent()[0];if(a){P.setWidth("auto");P.getDomRef().style.minWidth=w}else{P.setWidth(w)}}if(!i){this.getDomRef().style.minWidth=w}};p.open=function(){return this.openBy(s)}};
sap.m.Select.prototype._onAfterRenderingPopover=function(){var p=this.getPopup(),w=(this.$().outerWidth()/parseFloat(sap.m.BaseFontSize))+"rem";p._removeArrow();p._setPosition();if(sap.ui.Device.system.phone){p._setMinWidth("100%")}else{p._setWidth(w)}};
sap.m.Select.prototype._createDialog=function(){var C=sap.m.SelectRenderer.CSS_CLASS;var d=new sap.m.Dialog({stretchOnPhone:true,customHeader:new sap.m.Bar({contentLeft:new sap.m.InputBase({value:this.getSelectedItem().getText(),width:"100%",editable:false}).addStyleClass(C+"Input")}).addStyleClass(C+"Bar")});d.getAggregation("customHeader").attachBrowserEvent("tap",function(){d.close()},this);return d};
sap.m.Select.prototype._onBeforeOpenDialog=function(){var h=this.getPopup().getCustomHeader();h.getContentLeft()[0].setValue(this.getSelectedItem().getText())};
sap.m.Select.prototype.init=function(){this._createList()};
sap.m.Select.prototype.onBeforeRendering=function(){var i=this.getItems();this._synchronizeSelection(this.getSelectedItem(),this.getSelectedKey(),i);this._clearList();this._fillList(i)};
sap.m.Select.prototype.onAfterRendering=function(){var h=!!this.$().closest(".sapMBar-CTX").length;this._setPopupType(sap.ui.Device.system.phone&&!h?"Dialog":"Popover")};
sap.m.Select.prototype.exit=function(){this._removeFocusableParentPopup(this._getParentPopup());if(this.getList()){this.getList().destroy();this._oList=null}};
sap.m.Select.prototype.ontouchstart=function(e){e.setMarked();if(this.getEnabled()&&this.isOpenArea(e.target)){this.addStyleClass(sap.m.SelectRenderer.CSS_CLASS+"Pressed")}};
sap.m.Select.prototype.ontouchend=function(e){e.setMarked();if(this.getEnabled()&&(!this.isOpen()||!this.hasContent())&&this.isOpenArea(e.target)){this.removeStyleClass(sap.m.SelectRenderer.CSS_CLASS+"Pressed")}};
sap.m.Select.prototype.ontap=function(e){var C=sap.m.SelectRenderer.CSS_CLASS;e.setMarked();if(!this.getEnabled()){return}if(this.isOpenArea(e.target)){if(this.isOpen()){this.close();this.removeStyleClass(C+"Pressed");return}if(this.hasContent()){this.open()}}if(this.isOpen()){this.addStyleClass(C+"Pressed")}};
sap.m.Select.prototype.onSelectionChange=function(c){var l=c.getParameter("listItem"),n=this._findMappedItem(l);if(l.getType()==="Inactive"){return}this.close();if(n){this._setSelectedItem({item:n,id:n.getId(),key:n.getKey(),fireChange:true,suppressInvalidate:true,listItemUpdated:true});this.setValue(n.getText())}};
sap.m.Select.prototype.onkeypress=function(e){e.setMarked();if(!this.getEnabled()){return}var i=this._findItemByFirstCharacter(String.fromCharCode(e.which));if(i){this._updateSelectedItem(i);this.setValue(i.getText());this.scrollToItem(this.getList().getSelectedItem())}};
sap.m.Select.prototype.onsapshow=function(e){e.setMarked();if(e.keyCode===jQuery.sap.KeyCodes.F4){e.preventDefault()}if(this.isOpen()){this.close();return}if(this.hasContent()){this.open()}};
sap.m.Select.prototype.onsaphide=sap.m.Select.prototype.onsapshow;
sap.m.Select.prototype.onsapescape=function(e){if(this.isOpen()){e.setMarked();this.close()}};
sap.m.Select.prototype.onsapenter=function(e){e.setMarked();this.close()};
sap.m.Select.prototype.onsapdown=function(e){e.setMarked();e.preventDefault();var n,s=this.getSelectableItems();n=s[s.indexOf(this.getSelectedItem())+1];if(n){this._updateSelectedItem(n);this.setValue(n.getText());this.scrollToItem(this.getList().getSelectedItem())}};
sap.m.Select.prototype.onsapup=function(e){e.setMarked();e.preventDefault();var p,s=this.getSelectableItems();p=s[s.indexOf(this.getSelectedItem())-1];if(p){this._updateSelectedItem(p);this.setValue(p.getText());this.scrollToItem(this.getList().getSelectedItem())}};
sap.m.Select.prototype.onsaphome=function(e){e.setMarked();e.preventDefault();var f=this.getSelectableItems()[0];if(f){this._updateSelectedItem(f);this.setValue(f.getText());this.scrollToItem(this.getList().getSelectedItem())}};
sap.m.Select.prototype.onsapend=function(e){e.setMarked();e.preventDefault();var l=this._findLastEnabledItem(this.getSelectableItems());if(l){this._updateSelectedItem(l);this.setValue(l.getText());this.scrollToItem(this.getList().getSelectedItem())}};
sap.m.Select.prototype.onsappagedown=function(e){e.setMarked();e.preventDefault();var s=this.getSelectableItems(),i;this.setSelectedIndex(s.indexOf(this.getSelectedItem())+20,s);i=this.getSelectedItem();if(i){this.setValue(i.getText())}this.scrollToItem(this.getList().getSelectedItem())};
sap.m.Select.prototype.onsappageup=function(e){e.setMarked();e.preventDefault();var s=this.getSelectableItems(),i;this.setSelectedIndex(s.indexOf(this.getSelectedItem())-20,s);i=this.getSelectedItem();if(i){this.setValue(i.getText())}this.scrollToItem(this.getList().getSelectedItem())};
sap.m.Select.prototype.onsapfocusleave=function(e){var p=this.getAggregation("popup");if(!e.relatedControlId||!p){return}var c=sap.ui.getCore().byId(e.relatedControlId),f=c&&c.getFocusDomRef();if(jQuery.sap.containsOrEquals(p.getFocusDomRef(),f)){this.focus()}};
sap.m.Select.prototype.addContent=function(p){};
sap.m.Select.prototype.createPopup=function(p){var P=this.getAggregation("popup");if(P){return P}P=this["_create"+p]();this.setAggregation("popup",P,true);P.setHorizontalScrolling(false).addStyleClass(sap.m.SelectRenderer.CSS_CLASS+"Popup").attachBeforeOpen(this.onBeforeOpen,this).attachAfterOpen(this.onAfterOpen,this).attachBeforeClose(this.onBeforeClose,this).attachAfterClose(this.onAfterClose,this).addEventDelegate({onBeforeRendering:this.onBeforeRenderingPopup,onAfterRendering:this.onAfterRenderingPopup},this);return P};
sap.m.Select.prototype.getPopup=function(){if(this.bIsDestroyed){return null}return this.createPopup(this._getPopupType())};
sap.m.Select.prototype.hasContent=function(){return!!this.getItems().length};
sap.m.Select.prototype.onBeforeRenderingPopup=function(){var o=this["_onBeforeRendering"+this._getPopupType()];this._removeFocusableParentPopup(this._getParentPopup());o&&o.call(this)};
sap.m.Select.prototype.onAfterRenderingPopup=function(){var o=this["_onAfterRendering"+this._getPopupType()];this._addFocusableParentPopup(this._getParentPopup());o&&o.call(this)};
sap.m.Select.prototype.open=function(){var p=this.getPopup();if(p){p.open()}return this};
sap.m.Select.prototype.getVisibleItems=function(){return this.getItems().filter(function(i){return i.data(sap.m.SelectRenderer.CSS_CLASS+"ItemVisible")})};
sap.m.Select.prototype.getDefaultSelectedItem=function(i){return this._findFirstEnabledItem()};
sap.m.Select.prototype.getList=function(){return this._oList};
sap.m.Select.prototype.getSelectableItems=function(){return this.getEnabledItems(this.getVisibleItems())};
sap.m.Select.prototype.getOpenArea=function(){return this.getDomRef()};
sap.m.Select.prototype.isOpenArea=function(d){var o=this.getOpenArea();return o&&o.contains(d)};
sap.m.Select.prototype.findItem=function(p,v){for(var i=0,I=this.getItems();i<I.length;i++){if(I[i]["get"+p]()===v){return I[i]}}return null};
sap.m.Select.prototype.clearSelection=function(){this._setSelectedItem({item:null,id:"",key:""})};
sap.m.Select.prototype.addItem=function(i){this.addAggregation("items",i);i.data(sap.m.SelectRenderer.CSS_CLASS+"ItemVisible",true);if(this.getList()){this.getList().addItem(this._mapItemToListItem(i))}return this};
sap.m.Select.prototype.insertItem=function(i,I){this.insertAggregation("items",i,I);i.data(sap.m.SelectRenderer.CSS_CLASS+"ItemVisible",true);if(this.getList()){this.getList().insertItem(this._mapItemToListItem(i),I)}return this};
sap.m.Select.prototype.setSelectedItem=function(i){if(typeof i==="string"){i=sap.ui.getCore().byId(i)}if(!(i instanceof sap.ui.core.Item)&&i!==null){jQuery.sap.log.warning('Warning: setSelectedItem() "vItem" has to be an instance of sap.ui.core.Item, a valid sap.ui.core.Item id, or null on',this);return this}if(!i){i=this.getDefaultSelectedItem()}this._setSelectedItem({item:i||null,id:i?i.getId():"",key:i?i.getKey():"",suppressInvalidate:true});this.setValue(i?i.getText():((i=this.getDefaultSelectedItem())?i.getText():""));return this};
sap.m.Select.prototype.setSelectedItemId=function(i){var I=sap.ui.getCore().byId(i);if(!(I instanceof sap.ui.core.Item)&&i!==""&&i!==undefined){jQuery.sap.log.warning('Warning: setSelectedItemId() "sItem" has to be a string id of an sap.ui.core.Item instance, an empty string or undefined on',this);return this}if(!I){I=this.getDefaultSelectedItem()}this._setSelectedItem({item:I||null,id:I?I.getId():"",key:I?I.getKey():"",suppressInvalidate:true});this.setValue(I?I.getText():((I=this.getDefaultSelectedItem())?I.getText():""));return this};
sap.m.Select.prototype.setSelectedKey=function(k){var k=this.validateProperty("selectedKey",k),i=this.getItemByKey(k);if(i||(k==="")){if(!i&&k===""){i=this.getDefaultSelectedItem()}this._setSelectedItem({item:i||null,id:i?i.getId():"",key:i?i.getKey():"",suppressInvalidate:true});this.setValue(i?i.getText():((i=this.getDefaultSelectedItem())?i.getText():""));return this}return this.setProperty("selectedKey",k)};
sap.m.Select.prototype.getItemAt=function(i){return this.getItems()[+i]||null};
sap.m.Select.prototype.getSelectedItem=function(){var s=this.getAssociation("selectedItem");return(s===null)?null:sap.ui.getCore().byId(s)||null};
sap.m.Select.prototype.getFirstItem=function(){return this.getItems()[0]||null};
sap.m.Select.prototype.getLastItem=function(){var i=this.getItems();return i[i.length-1]||null};
sap.m.Select.prototype.getEnabledItems=function(i){var i=i||this.getItems();return i.filter(function(I){return I.getEnabled()})};
sap.m.Select.prototype.getItemByKey=function(k){return this.findItem("Key",k)};
sap.m.Select.prototype.removeItem=function(i){var C=sap.m.SelectRenderer.CSS_CLASS,I;i=this.removeAggregation("items",i);if(this.getList()){this.getList().removeItem(i&&i.data(C+"ListItem"))}if(this.getItems().length===0){this.clearSelection()}else if(i&&(i.getId()===this.getAssociation("selectedItem"))){I=this._findFirstEnabledItem();if(I){this._setSelectedItem({item:I,id:I.getId(),key:I.getKey()});this.setValue(I?I.getText():((I=this.getDefaultSelectedItem())?I.getText():""))}}return i};
sap.m.Select.prototype.removeAllItems=function(){var i=this.removeAllAggregation("items");this.clearSelection();if(this.getList()){this.getList().removeAllItems()}return i};
sap.m.Select.prototype.destroyItems=function(){this.destroyAggregation("items");if(this.getList()){this.getList().destroyItems()}return this};
sap.m.Select.prototype.isOpen=function(){var p=this.getAggregation("popup");return!!(p&&p.isOpen())};
sap.m.Select.prototype.close=function(){var p=this.getAggregation("popup");if(p){p.close()}return this};
