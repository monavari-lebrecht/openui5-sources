/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/ManagedObject','./Core','./ElementMetadata','sap/ui/model/SimpleType','jquery.sap.strings'],function(q,M,C,E,S){"use strict";var a=M.extend("sap.ui.core.Element",{metadata:{stereotype:"element","abstract":true,publicMethods:["getId","getMetadata","getTooltip_AsString","getTooltip_Text","getModel","setModel","hasModel","bindElement","unbindElement","getElementBinding","prop","getLayoutData","setLayoutData"],library:"sap.ui.core",properties:{},aggregations:{tooltip:{name:"tooltip",type:"sap.ui.core.TooltipBase",altTypes:["string"],multiple:false},customData:{name:"customData",type:"sap.ui.core.CustomData",multiple:true,singularName:"customData"},layoutData:{name:"layoutData",type:"sap.ui.core.LayoutData",multiple:false,singularName:"layoutData"},dependents:{name:"dependents",type:"sap.ui.core.Control",multiple:true}},associations:{},events:{}},constructor:function(i,s){M.apply(this,arguments)},renderer:null},E);a.defineClass=function(c,s,m){return sap.ui.base.Object.defineClass(c,s,m||E)};a.prototype.getInterface=function(){return this};a.prototype._handleEvent=function(e){var h="on"+e.type;this._callEventHandles(this.aBeforeDelegates.slice(0),h,e,true);this._callEventHandles([this],h,e);this._callEventHandles(this.aDelegates.slice(0),h,e,true)};a.prototype._callEventHandles=function(h,H,e,d){if(h.length>0){for(var i=0;i<h.length;i++){if(e.isImmediateHandlerPropagationStopped()){break}var o=d?h[i].oDelegate:h[i];var t=(d&&h[i].vThis)?h[i].vThis:o;if(t===true){t=this}if(o[H]){o[H].call(t,e)}}}};a.create=function(d,k){if(!d||d instanceof a||typeof d!=="object"||d instanceof String){return d}function g(t){if(typeof t==="function"){return t}if(typeof t==="string"){return q.sap.getObject(t)}}var c=g(d.Type)||g(k&&k.type);if(typeof c==="function"){return new c(d)}var m="Don't know how to create an Element from "+d+" ("+(typeof d)+")";q.sap.log.fatal(m);throw new Error(m)};a.prototype.toString=function(){if(this.getMetadata){return"Element "+this.getMetadata().getName()+"#"+this.sId}else{return"Element {unknown class}#"+this.sId}};a.prototype.getDomRef=function(s){return q.sap.domById(s?this.getId()+"-"+s:this.getId())};a.prototype.$=function(s){return q(this.getDomRef(s))};a.prototype.isActive=function(){return this.oParent&&this.oParent.isActive()};a.prototype.prop=function(p,v){var P=this.getMetadata().getJSONKeys()[p];if(P){if(arguments.length==1){return this[P._sGetter]()}else{this[P._sMutator](v);return this}}};a.prototype.insertDependent=function(c,i){return this.insertAggregation("dependents",c,i,true)};a.prototype.addDependent=function(c){return this.addAggregation("dependents",c,true)};a.prototype.removeDependent=function(c){return this.removeAggregation("dependents",c,true)};a.prototype.removeAllDependents=function(){return this.removeAllAggregation("dependents",true)};a.prototype.destroyDependents=function(){return this.destroyAggregation("dependents",true)};a.prototype.rerender=function(){if(this.oParent){this.oParent.rerender()}};a.prototype.getUIArea=function(){return this.oParent?this.oParent.getUIArea():null};a.prototype.destroy=function(s){M.prototype.destroy.call(this,s);this.$().remove()};a.prototype.fireEvent=function(e,p){var A=Array.prototype.slice.apply(arguments);A[1]=p=p||{};p.id=p.id||this.getId();return sap.ui.base.EventProvider.prototype.fireEvent.apply(this,A)};a.prototype.addDelegate=function(d,c,t,b){this.removeDelegate(d);if(typeof c==="object"){b=t;t=c;c=false}if(typeof t==="boolean"){b=t;t=undefined}(c?this.aBeforeDelegates:this.aDelegates).push({oDelegate:d,bClone:!!b,vThis:((t===this)?true:t)});return this};a.prototype.removeDelegate=function(d){for(var i=0;i<this.aDelegates.length;i++){if(this.aDelegates[i].oDelegate==d){this.aDelegates.splice(i,1)}}for(var i=0;i<this.aBeforeDelegates.length;i++){if(this.aBeforeDelegates[i].oDelegate==d){this.aBeforeDelegates.splice(i,1)}}return this};a.prototype.addEventDelegate=function(d,t){return this.addDelegate(d,false,t,true)};a.prototype.removeEventDelegate=function(d){return this.removeDelegate(d)};a.prototype.getFocusDomRef=function(){return this.getDomRef()||null};a.prototype.focus=function(){var f=this.getFocusDomRef();if(f){try{f.focus()}catch(e){var i=f.id?" (id: "+f.id+")":" ";q.sap.log.warning("DOM element"+i+" in "+this.toString()+" which should be focused cannot be focused: "+e.message)}}};a.prototype.getFocusInfo=function(){return{id:this.getId()}};a.prototype.applyFocusInfo=function(f){this.focus();return this};a.prototype._refreshTooltipBaseDelegate=function(t){var o=this.getTooltip();if(o instanceof sap.ui.core.TooltipBase){this.removeDelegate(o)}if(t instanceof sap.ui.core.TooltipBase){t._currentControl=this;this.addDelegate(t)}};a.prototype.setTooltip=function(t){this._refreshTooltipBaseDelegate(t);this.setAggregation("tooltip",t);return this};a.prototype.getTooltip=function(){return this.getAggregation("tooltip")};a.runWithPreprocessors=M.runWithPreprocessors;a.prototype.getTooltip_AsString=function(){var t=this.getTooltip();if(typeof t==="string"||t instanceof String){return t}return undefined};a.prototype.getTooltip_Text=function(){var t=this.getTooltip();if(t&&typeof t.getText==="function"){return t.getText()}return t};(function(){var g=function(e,k){var d=e.getAggregation("customData");if(d){for(var i=0;i<d.length;i++){if(d[i].getKey()==k){return d[i]}}}return null};var s=function(e,k,v,w){if(v===null){var d=g(e,k);if(!d){return}var b=e.getAggregation("customData").length;if(b==1){e.destroyAggregation("customData",true)}else{e.removeAggregation("customData",d,true);d.destroy()}}else{var d=g(e,k);if(d){d.setValue(v);d.setWriteToDom(w)}else{var d=new sap.ui.core.CustomData({key:k,value:v,writeToDom:w});e.addAggregation("customData",d,true)}}};a.prototype.data=function(){var b=arguments.length;if(b==0){var d=this.getAggregation("customData"),r={};if(d){for(var i=0;i<d.length;i++){r[d[i].getKey()]=d[i].getValue()}}return r}else if(b==1){var c=arguments[0];if(c===null){this.destroyAggregation("customData",true);return this}else if(typeof c=="string"){var e=g(this,c);return e?e.getValue():null}else if(typeof c=="object"){for(var k in c){s(this,k,c[k])}return this}else{throw new Error("When data() is called with one argument, this argument must be a string, an object or null, but is "+(typeof c)+":"+c+" (on UI Element with ID '"+this.getId()+"')")}}else if(b==2){s(this,arguments[0],arguments[1]);return this}else if(b==3){s(this,arguments[0],arguments[1],arguments[2]);return this}else{throw new Error("data() may only be called with 0-3 arguments (on UI Element with ID '"+this.getId()+"')")}}})();a.prototype.clone=function(I,l){var c=M.prototype.clone.apply(this,arguments);for(var i=0;i<this.aDelegates.length;i++){if(this.aDelegates[i].bClone){c.aDelegates.push(this.aDelegates[i])}}for(var i=0;i<this.aBeforeDelegates.length;i++){if(this.aBeforeDelegates[i].bClone){c.aBeforeDelegates.push(this.aBeforeDelegates[i])}}return c};a.prototype.findElements=function(r){var c=M.prototype.findAggregatedObjects.call(this,r);return c};a.prototype.setLayoutData=function(l){this.setAggregation("layoutData",l,true);var L=this.getParent();if(L){var e=q.Event("LayoutDataChange");e.srcControl=this;L._handleEvent(e)}return this};a.prototype.bindElement=function(p,P){return this.bindObject(p,P)};a.prototype.unbindElement=function(m){return this.unbindObject(m)};a.prototype.getElementBinding=function(m){return this.getObjectBinding(m)};return a},true);
