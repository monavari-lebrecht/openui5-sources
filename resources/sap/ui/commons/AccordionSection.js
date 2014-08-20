/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.commons.AccordionSection");jQuery.sap.require("sap.ui.commons.library");jQuery.sap.require("sap.ui.core.Element");sap.ui.core.Element.extend("sap.ui.commons.AccordionSection",{metadata:{library:"sap.ui.commons",properties:{"maxHeight":{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},"enabled":{type:"boolean",group:"Behavior",defaultValue:true},"collapsed":{type:"boolean",group:"Behavior",defaultValue:false},"title":{type:"string",group:"Misc",defaultValue:null}},defaultAggregation:"content",aggregations:{"content":{type:"sap.ui.core.Control",multiple:true,singularName:"content"}},events:{"scroll":{}}}});sap.ui.commons.AccordionSection.M_EVENTS={'scroll':'scroll'};
sap.ui.commons.AccordionSection.prototype.init=function(){this.bIgnoreScrollEvent=true;this.oScrollDomRef=null};
sap.ui.commons.AccordionSection.prototype.focusFirstControl=function(){var c=this.getContent();if(c[0]){c[0].focus()}};
sap.ui.commons.AccordionSection.prototype.focus=function(){var h=this.getDomRef("hdr");h.focus()};
sap.ui.commons.AccordionSection.prototype.onThemeChanged=function(){var h=this.getDomRef("hdrL");if(h){h.style.width="auto";var o=this;setTimeout(function(){o.onAfterRendering()},0)}};
sap.ui.commons.AccordionSection.prototype.onAfterRendering=function(){this.oScrollDomRef=this.getDomRef("cont");var c=this.oScrollDomRef;var r=this.getDomRef();var a=this.getParent().getDomRef();if(!sap.ui.commons.AccordionSection._isSizeSet(this.getParent().getWidth())&&sap.ui.commons.AccordionSection._isSizeSet(this.getMaxHeight())){if(c){var b=c.offsetTop;var t=(r.offsetHeight-b);c.style.height=t+"px";var d=c.offsetHeight;if(d>t){c.style.height=t-(d-t)+"px"}}}var l=jQuery(a).css("border-left-width");var e=jQuery(a).css("border-right-width");var f=parseFloat(l.substring(0,l.indexOf("px")))+parseFloat(e.substring(0,e.indexOf("px")));var D=this.getDomRef("lbl");r.style.width=a.offsetWidth-f+"px";D.style.width=a.offsetWidth-30+"px";var s=this.__scrollproxy__;if(!s){s=this.__scrollproxy__=jQuery.proxy(this.onscroll,this)}this.$("cont").bind("scroll",s)};
sap.ui.commons.AccordionSection.prototype.onBeforeRendering=function(){var s=this.__scrollproxy__;if(s){this.$("cont").unbind("scroll",s)}};
sap.ui.commons.AccordionSection.prototype.setEnabled=function(e){this.setProperty("enabled",e,true);var r=this.getDomRef();if(r){if(e){jQuery(r).removeClass("sapUiAcdSectionDis")}else{jQuery(r).addClass("sapUiAcdSectionDis")}}return this};
sap.ui.commons.AccordionSection.prototype._setCollapsed=function(c){this.setProperty("collapsed",c,true);this._setCollapsedState(c)};
sap.ui.commons.AccordionSection.prototype.setCollapsed=function(c){if(this.getParent()){if(!c){this.getParent().openSection(this.getId())}else{this.getParent().closeSection(this.getId())}}else{this._setCollapsed(c)}return this};
sap.ui.commons.AccordionSection.prototype._setCollapsedState=function(c){if(this.getDomRef()){if(c){var a=sap.ui.getCore().getConfiguration().getAccessibility();if(!this.getParent().getWidth()){this.getDomRef().style.width=this.getDomRef().offsetWidth+"px"}jQuery(this.getDomRef()).addClass("sapUiAcdSectionColl");var t=this.getDomRef("tb");if(t){t.style.display="none"}var b=this.getDomRef("cont");b.style.display="none";if(a){b.setAttribute("aria-expanded","false");b.setAttribute("aria-hidden","true")}this.rerender()}else{if(!this.getDomRef("cont")){this.rerender()}else{jQuery(this.getDomRef()).removeClass("sapUiAcdSectionColl");var t=this.getDomRef("tb");if(t){t.style.display="block"}var b=this.getDomRef("cont");b.style.display="block";if(a){b.setAttribute("aria-expanded","true")}if(this.getMaxHeight()){this.getDomRef().style.height=this.getMaxHeight()}}}}};
sap.ui.commons.AccordionSection._isSizeSet=function(c){return(c&&!(c=="auto")&&!(c=="inherit"))};
sap.ui.commons.AccordionSection.prototype._handleTrigger=function(e){if((e.target.id===this.getId()+"-minL")||(e.target.id===this.getId()+"-minR")){var c=!this.getProperty("collapsed");this._setCollapsed(c);e.preventDefault();e.stopPropagation()}};
sap.ui.commons.AccordionSection.prototype.onscroll=function(e){};
