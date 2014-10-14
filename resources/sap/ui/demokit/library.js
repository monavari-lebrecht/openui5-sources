/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.demokit.library");jQuery.sap.require("sap.ui.core.Core");jQuery.sap.require("sap.ui.core.library");jQuery.sap.require("sap.ui.commons.library");sap.ui.getCore().initLibrary({name:"sap.ui.demokit",dependencies:["sap.ui.core","sap.ui.commons"],types:["sap.ui.demokit.UI5EntityCueCardStyle"],interfaces:[],controls:["sap.ui.demokit.CodeSampleContainer","sap.ui.demokit.CodeViewer","sap.ui.demokit.FileUploadIntrospector","sap.ui.demokit.HexagonButton","sap.ui.demokit.HexagonButtonGroup","sap.ui.demokit.IndexLayout","sap.ui.demokit.TagCloud","sap.ui.demokit.UI5EntityCueCard"],elements:["sap.ui.demokit.Tag","sap.ui.demokit.UIAreaSubstitute"],version:"1.22.10"});jQuery.sap.declare("sap.ui.demokit.UI5EntityCueCardStyle");sap.ui.demokit.UI5EntityCueCardStyle={Standard:"Standard",Demokit:"Demokit"};jQuery.sap.require("sap.ui.demokit.js.highlight-query-terms");sap.ui.lazyRequire("sap.ui.demokit.UI5EntityCueCard","attachToContextMenu detachFromContextMenu");sap.ui.lazyRequire("sap.ui.demokit.DemokitApp","new getInstance");sap.ui.lazyRequire("sap.ui.demokit.IndexPage");sap.ui.getCore().attachInitEvent(function(){if(jQuery("body").hasClass("sapUiDemokitBody")){jQuery("h1").each(function(){var $=jQuery(this),t=$.text(),s="Gray",i=$.attr('icon'),I=$.attr('iconPos')||'left:40px;top:20px;',a=jQuery("<div class='sapUiDemokitTitle'><span>"+t+"</span></div>");$.replaceWith(a);if(s||i){a.prepend("<div id='sap-demokit-icon'></div>");new sap.ui.demokit.HexagonButton({color:s,imagePosition:'position: relative;'+I,icon:i}).placeAt("sap-demokit-icon")}});var b=jQuery("h2");var c=jQuery('h2[id="settings"]');var C=jQuery("html").attr('data-sap-ui-dk-controls');if(c.size()===0&&b.size()>=2&&C){jQuery(b[1]).before(jQuery("<h2 id='settings'>Settings (Overview)</h2><div cue-card='"+C.split(',')[0]+"'></div>"));b=jQuery("h2")}var d=jQuery("ul.sapDkTLN");if(b.size()>0&&d.size()==0){b.first().before(d=jQuery("<ul class='sapDkTLN'></ul>"))}if(true){b.each(function(i){var $=jQuery(this);if($.css('display')==='none'){return}if(!$.attr('id')){$.attr('id','__'+i)}var a=jQuery("<a></a>").attr("href","#"+$.attr('id')).text($.text()).addClass('sapDkLnk');var l=jQuery("<li></li>").append(a);d.append(l)})}jQuery("[code-sample]").each(function(){var $=jQuery(this),u=$.attr('code-sample'),s=$.attr('script')||$.children('script').attr('id')||u+"-script";$.addClass("sapUiDemokitSampleCont");new sap.ui.demokit.CodeSampleContainer("code-sample-"+u,{scriptElementId:s,uiAreaId:u}).placeAt(this)});jQuery("[cue-card]").each(function(){var $=jQuery(this),e=$.attr('cue-card');new sap.ui.demokit.UI5EntityCueCard({entityName:e,collapsible:false,expanded:true,style:'Demokit',navigable:true,navigate:function(E){top.sap.ui.demokit.DemokitApp.getInstance().navigateToType(E.getParameter("entityName"));E.preventDefault()},title:'Settings (Overview)'}).placeAt(this)})}});
sap.ui.demokit._getAppInfo=function(c){var u=sap.ui.resource("","sap-ui-version.json");jQuery.ajax({url:u,dataType:"json",error:function(x,s,e){jQuery.sap.log.error("failed to load library list from '"+u+"': "+s+", "+e);c(null)},success:function(a,s,x){if(!a){jQuery.sap.log.error("failed to load library list from '"+u+"': "+s+", Data: "+aLibraries);c(null);return}c(a)}})};
sap.ui.demokit._loadAllLibInfo=function(a,I,c){jQuery.sap.require("sap.ui.core.util.LibraryInfo");var l=new sap.ui.core.util.LibraryInfo();sap.ui.demokit._getAppInfo(function(A){if(!(A&&A.libraries)){c(null,null)}var b=0,L=A.libraries,d=L.length,o={},e={},f=[],g,h;for(var i=0;i<d;i++){g=L[i].name;h=L[i].version;f.push(g);e[g]=h;l[I](g,function(E){o[E.library]=E;var v=e[E.library];if(v){o[E.library].version=v}b++;if(b==d){c(f,o,A)}})}})};
