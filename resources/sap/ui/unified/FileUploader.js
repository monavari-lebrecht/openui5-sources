/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.unified.FileUploader");jQuery.sap.require("sap.ui.unified.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.ui.unified.FileUploader",{metadata:{publicMethods:["upload"],library:"sap.ui.unified",properties:{"value":{type:"string",group:"Data",defaultValue:''},"enabled":{type:"boolean",group:"Behavior",defaultValue:true},"visible":{type:"boolean",group:"Behavior",defaultValue:true},"uploadUrl":{type:"sap.ui.core.URI",group:"Data",defaultValue:''},"name":{type:"string",group:"Data",defaultValue:null},"width":{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:''},"uploadOnChange":{type:"boolean",group:"Behavior",defaultValue:false},"additionalData":{type:"string",group:"Data",defaultValue:null},"sameFilenameAllowed":{type:"boolean",group:"Behavior",defaultValue:false},"buttonText":{type:"string",group:"Misc",defaultValue:null},"fileType":{type:"string[]",group:"Data",defaultValue:null},"multiple":{type:"boolean",group:"Behavior",defaultValue:false},"maximumFileSize":{type:"float",group:"Data",defaultValue:null},"mimeType":{type:"string[]",group:"Data",defaultValue:null},"sendXHR":{type:"boolean",group:"Behavior",defaultValue:false},"placeholder":{type:"string",group:"Appearance",defaultValue:null},"style":{type:"string",group:"Appearance",defaultValue:null},"buttonOnly":{type:"boolean",group:"Appearance",defaultValue:false},"useMultipart":{type:"boolean",group:"Behavior",defaultValue:true}},aggregations:{"parameters":{type:"sap.ui.unified.FileUploaderParameter",multiple:true,singularName:"parameter"},"headerParameters":{type:"sap.ui.unified.FileUploaderParameter",multiple:true,singularName:"headerParameter"}},events:{"change":{},"uploadComplete":{},"typeMissmatch":{},"fileSizeExceed":{},"fileAllowed":{}}}});sap.ui.unified.FileUploader.M_EVENTS={'change':'change','uploadComplete':'uploadComplete','typeMissmatch':'typeMissmatch','fileSizeExceed':'fileSizeExceed','fileAllowed':'fileAllowed'};
sap.ui.unified.FileUploader.prototype.init=function(){if(!!sap.ui.Device.browser.internet_explorer&&sap.ui.Device.browser.version==8){this.oFilePath=new sap.ui.commons.TextField(this.getId()+"-fu_input",{width:"225px"})}else{this.oFilePath=sap.ui.unified.FileUploaderHelper.createTextField(this.getId()+"-fu_input")}this.oFilePath.setParent(this);if(this.getButtonText()){var b=this.getButtonText()}else{var b=this.getBrowseText()}if(!!sap.ui.Device.browser.internet_explorer&&sap.ui.Device.browser.version==8){this.oBrowse=new sap.ui.commons.Button({enabled:this.getEnabled(),text:b,width:"0px",height:"0px"})}else{this.oBrowse=sap.ui.unified.FileUploaderHelper.createButton()}this.oBrowse.setParent(this);this.oFileUpload=null};
sap.ui.unified.FileUploader.prototype.getIdForLabel=function(){return this.oBrowse.getId()};
sap.ui.unified.FileUploader.prototype.exit=function(){this.oFilePath.destroy();this.oBrowse.destroy();if(this.oIFrameRef){jQuery(this.oIFrameRef).unbind();sap.ui.getCore().getStaticAreaRef().removeChild(this.oIFrameRef);this.oIFrameRef=null}};
sap.ui.unified.FileUploader.prototype.onBeforeRendering=function(){this._runOnce=false;if(this.getButtonText()){this.oBrowse.setText(this.getButtonText())}else{this.oBrowse.setText(this.getBrowseText())}var s=sap.ui.getCore().getStaticAreaRef();jQuery(this.oFileUpload).appendTo(s);jQuery(this.oFileUpload).unbind()};
sap.ui.unified.FileUploader.prototype.onAfterRendering=function(){this.prepareFileUploadAndIFrame();jQuery(this.oFileUpload).change(jQuery.proxy(this.handlechange,this));if((!!sap.ui.Device.browser.internet_explorer&&sap.ui.Device.browser.version<=8)){this.oBrowse.getDomRef().style.padding="0px";this.oBrowse.getDomRef().style.visibility="hidden";this.oFilePath.getDomRef().style.height="20px";this.oFilePath.getDomRef().style.visibility="hidden";jQuery(this.oFilePath.getDomRef()).removeClass('sapUiTfBrd')}else{this.oFilePath.$().attr("tabindex","-1");if((!!sap.ui.Device.browser.internet_explorer&&sap.ui.Device.browser.version==9)){this.oBrowse.$().attr("tabindex","-1")}if(this.getWidth()){if(!this._runOnce){this._runOnce=true;jQuery.sap.delayedCall(50,this,function(){this.onAfterRendering()})}else{if(this.getButtonOnly()){this.oBrowse.getDomRef().style.width=this.getWidth()}else{this._resizeDomElements()}}}}};
sap.ui.unified.FileUploader.prototype.getFocusDomRef=function(){return this.$("fu").get(0)};
sap.ui.unified.FileUploader.prototype._resizeDomElements=function(){var i=this.getId();this._oBrowseDomRef=this.oBrowse.getDomRef();var $=jQuery(this._oBrowseDomRef);var _=$.parent().outerWidth(true);this._oFilePathDomRef=this.oFilePath.getDomRef();var d=this._oFilePathDomRef;var w=this.getWidth();if(w.substr(-1)=="%"){while(d.id!=i){d.style.width="100%";d=d.parentNode}d.style.width=w}else{d.style.width=w;var a=jQuery(this._oFilePathDomRef);var b=a.outerWidth()-_;if(b<0){this.oFilePath.getDomRef().style.width="0px";if(!!!sap.ui.Device.browser.internet_explorer){this.oFileUpload.style.width=$.outerWidth(true)}}else{this.oFilePath.getDomRef().style.width=b+"px"}}};
sap.ui.unified.FileUploader.prototype.onresize=function(){this.onAfterRendering()};
sap.ui.unified.FileUploader.prototype.onThemeChanged=function(){this.onAfterRendering()};
sap.ui.unified.FileUploader.prototype.setEnabled=function(e){this.setProperty("enabled",e,true);this.oFilePath.setEnabled(e);this.oBrowse.setEnabled(e);if(e){this.$("fu").removeAttr('disabled')}else{this.$("fu").attr('disabled','disabled')}return this};
sap.ui.unified.FileUploader.prototype.setUploadUrl=function(v,f){this.setProperty("uploadUrl",v,true);var $=this.$("fu_form");$.attr("action",this.getUploadUrl());return this};
sap.ui.unified.FileUploader.prototype.setPlaceholder=function(p){this.setProperty("placeholder",p,true);this.oFilePath.setPlaceholder(p);return this};
sap.ui.unified.FileUploader.prototype.setStyle=function(s){this.setProperty("style",s,true);if(this.oBrowse.setType){this.oBrowse.setType(s)}else{if(s=="Emphasized"){s="Emph"}this.oBrowse.setStyle(s)}return this};
sap.ui.unified.FileUploader.prototype.setValue=function(v,f){var o=this.getValue();if((o!=v)||this.getSameFilenameAllowed()){var u=this.getUploadOnChange()&&v;this.setProperty("value",v,u);if(this.oFilePath){this.oFilePath.setValue(v);if(!(!!sap.ui.Device.browser.internet_explorer&&sap.ui.Device.browser.version==8)&&this.oFilePath.getFocusDomRef()){this.oFilePath.getFocusDomRef().focus()}}if(this.oFileUpload&&!v){this.getDomRef("fu_form").reset();this.$("fu_data").val(this.getAdditionalData())}if(f){this.fireChange({id:this.getId(),newValue:v})}if(u){this.upload()}}return this};
sap.ui.unified.FileUploader.prototype.onmouseover=function(){jQuery(this.oBrowse.getDomRef()).addClass('sapUiBtnStdHover')};
sap.ui.unified.FileUploader.prototype.onmouseout=function(){jQuery(this.oBrowse.getDomRef()).removeClass('sapUiBtnStdHover')};
sap.ui.unified.FileUploader.prototype.onfocusin=function(){jQuery(this.oBrowse.getDomRef()).addClass('sapUiBtnStdHover')};
sap.ui.unified.FileUploader.prototype.onfocusout=function(){jQuery(this.oBrowse.getDomRef()).removeClass('sapUiBtnStdHover')};
sap.ui.unified.FileUploader.prototype.setAdditionalData=function(a){this.setProperty("additionalData",a,true);var A=this.getDomRef("fu_data");if(A){var a=this.getAdditionalData()||"";A.value=a}return this};
sap.ui.unified.FileUploader.prototype.upload=function(){var u=this.getDomRef("fu_form");try{if(u){this._bUploading=true;if(this.getSendXHR()&&window.File){var f=jQuery.sap.domById(this.getId()+"-fu").files;if(f.length>0){var x=new window.XMLHttpRequest();x.open("POST",this.getUploadUrl(),true);if(this.getHeaderParameters()){var h=this.getHeaderParameters();for(var i=0;i<h.length;i++){var H=h[i].getName();var v=h[i].getValue();x.setRequestHeader(H,v)}}if(this.getUseMultipart()){var a=new window.FormData();var n=jQuery.sap.domById(this.getId()+"-fu").name;for(var i=0;i<f.length;i++){a.append(n,f[i])}a.append("_charset_","UTF-8");var d=jQuery.sap.domById(this.getId()+"-fu_data").name;if(this.getAdditionalData()){var D=this.getAdditionalData();a.append(d,D)}else{a.append(d,"")}if(this.getParameters()){var p=this.getParameters();for(var i=0;i<p.length;i++){var N=p[i].getName();var v=p[i].getValue();a.append(N,v)}}x.send(a)}else{x.send(f[0])}var t=this;x.onreadystatechange=function(){if(x.readyState==4){var r;r=x.responseXML.documentElement.textContent;t.fireUploadComplete({"response":r});t._bUploading=false}};this._bUploading=false}}else{u.submit()}jQuery.sap.log.info("File uploading to "+this.getUploadUrl());if(this.getSameFilenameAllowed()&&this.getUploadOnChange()){this.setValue("",true)}}}catch(e){jQuery.sap.log.error("File upload failed:\n"+e.message)}};
sap.ui.unified.FileUploader.prototype.onkeypress=function(e){this.onkeydown(e)};
sap.ui.unified.FileUploader.prototype.onclick=function(e){if(this.getSameFilenameAllowed()){this.setValue("",true)}};
sap.ui.unified.FileUploader.prototype.onkeydown=function(e){if(!this.getEnabled()){return}if(this.getSameFilenameAllowed()){this.setValue("",true)}var k=e.keyCode,a=jQuery.sap.KeyCodes;if(k==a.DELETE||k==a.BACKSPACE){if(this.oFileUpload){this.setValue("",true)}}else if(k==a.SPACE||k==a.ENTER){if(!(!!sap.ui.Device.browser.internet_explorer&&sap.ui.Device.browser.version<=9)&&this.oFileUpload){this.oFileUpload.click();e.preventDefault();e.stopPropagation()}}else if(k!=a.TAB&&k!=a.SHIFT&&k!=a.F6){e.preventDefault();e.stopPropagation()}};
sap.ui.unified.FileUploader.prototype.handlechange=function(e){if(this.oFileUpload&&this.getEnabled()){var m=this.getMaximumFileSize();var f=this.getFileType();var M=this.getMimeType();var F='';if(window.File){var o=e.target.files;for(var i=0;i<o.length;i++){var c=i+1;var n=o[i].name;var t=o[i].type;if(!t){t="unknown"}var s=((o[i].size/1024)/1024);if(m&&(s>m)){jQuery.sap.log.info("File: "+n+" is of size "+s+" MB which exceeds the file size limit of "+m+" MB.");this.fireFileSizeExceed({fileName:n,fileSize:s});return}if(M){var w=true;var a=M.split(",");for(var j=0;j<a.length;j++){if(t.match(a[j])){w=false}}if(w){jQuery.sap.log.info("File: "+n+" is of type "+t+" .Allowed types are: "+M+".");this.fireTypeMissmatch({fileName:n,fileType:t});return}}if(f){var W=true;var T=f.split(",");var I=n.lastIndexOf(".");var b=n.substring(I+1);for(var k=0;k<T.length;k++){if(b==T[k]){W=false}}if(W){jQuery.sap.log.info("File: "+n+" is of type "+b+" .Allowed types are: "+f+".");this.fireTypeMissmatch({fileName:n,fileType:b});return}}F=F+'"'+o[i].name+'" '}if(F){this.fireFileAllowed()}}else if(f){var W=true;var T=f.split(",");var n=this.oFileUpload.value||"";var I=n.lastIndexOf(".");var b=n.substring(I+1);for(var k=0;k<T.length;k++){if(b==T[k]){W=false}}if(W){jQuery.sap.log.info("File: "+n+" is of type "+b+" .Allowed types are: "+f+".");this.fireTypeMissmatch({fileName:n,fileType:b});return}if(n){this.fireFileAllowed()}}var v=this.oFileUpload.value||"";var d=v.lastIndexOf("\\");if(d>=0){v=v.substring(d+1)}if(this.getMultiple()&&!sap.ui.Device.browser.internet_explorer){v=F}if(v||sap.ui.Device.browser.chrome){this.setValue(v,true)}}};
sap.ui.unified.FileUploader.prototype.getBrowseText=function(){var r=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified");var t=undefined;if(r){t=r.getText("FILEUPLOAD_BROWSE")}return t?t:"Browse..."};
sap.ui.unified.FileUploader.prototype.getShortenValue=function(){return this.getValue()};
sap.ui.unified.FileUploader.prototype.prepareFileUploadAndIFrame=function(){if(!this.oFileUpload){var f=[];f.push('<input ');f.push('type="file" ');if(this.getName()){if(this.getMultiple()&&!sap.ui.Device.browser.internet_explorer){f.push('name="'+this.getName()+'[]" ')}else{f.push('name="'+this.getName()+'" ')}}else{if(this.getMultiple()&&!sap.ui.Device.browser.internet_explorer){f.push('name="'+this.getId()+'[]" ')}else{f.push('name="'+this.getId()+'" ')}}f.push('id="'+this.getId()+'-fu" ');if(!(!!sap.ui.Device.browser.internet_explorer&&sap.ui.Device.browser.version==8)){if(!(!!sap.ui.Device.browser.internet_explorer&&sap.ui.Device.browser.version==9)){f.push('tabindex="-1" ')}f.push('size="1" ')}if(this.getTooltip_AsString()){f.push('title="'+jQuery.sap.escapeHTML(this.getTooltip_AsString())+'" ')}else if(this.getTooltip()){}else if(this.getValue()!=""){f.push('title="'+jQuery.sap.escapeHTML(this.getValue())+'" ')}if(!this.getEnabled()){f.push('disabled="disabled" ')}if(this.getMultiple()&&!sap.ui.Device.browser.internet_explorer){f.push('multiple ')}f.push('>');this.oFileUpload=jQuery(f.join("")).prependTo(this.$().find(".sapUiFupInputMask")).get(0)}else{jQuery(this.oFileUpload).prependTo(this.$().find(".sapUiFupInputMask"))}if(!this.oIFrameRef){var u=this.getDomRef("fu_form");var i=document.createElement("iframe");i.style.display="none";i.src="javascript:''";i.id=this.sId+"-frame";sap.ui.getCore().getStaticAreaRef().appendChild(i);i.contentWindow.name=this.sId+"-frame";var t=this;this._bUploading=false;jQuery(i).load(function(e){if(t._bUploading){jQuery.sap.log.info("File uploaded to "+t.getUploadUrl());var r;try{r=t.oIFrameRef.contentDocument.body.innerHTML}catch(a){}t.fireUploadComplete({"response":r});t._bUploading=false}});this.oIFrameRef=i}};