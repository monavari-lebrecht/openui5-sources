sap.ui.controller("sap.ui.demokit.explored.view.sample",{onInit:function(){this.router=sap.ui.core.UIComponent.getRouterFor(this);this.router.attachRoutePatternMatched(this.onRouteMatched,this)},onRouteMatched:function(e){if(e.getParameter("name")!=="sample"){return}this._sId=e.getParameter("arguments").id;var s=sap.ui.demokit.explored.data.samples[this._sId];if(!s){this.router.myNavToWithoutHash("sap.ui.demokit.explored.view.notFound","XML",false,{path:this._sId});return}var p=this.getView().byId("page");var h=sap.ui.core.routing.History.getInstance();var P=h.getPreviousHash();var S=sap.ui.Device.system.phone||!!P;p.setShowNavButton(S);p.setTitle("Sample: "+s.name);var c='sampleComp-'+this._sId;var C=this._sId;this._oComp=sap.ui.component(c);if(!this._oComp){this._oComp=sap.ui.getCore().createComponent({id:c,name:C})}var o;o=new sap.ui.core.ComponentContainer({component:this._oComp});var a=(this._oComp.getMetadata())?this._oComp.getMetadata().getConfig():null;var b=(a&&a.sample&&a.sample.stretch);var H=(b)?"100%":null;p.setEnableScrolling(!b);o.setHeight(H);p.removeAllContent();p.addContent(o);p.scrollTo(0)},onNavBack:function(e){this.router.myNavBack("home",{})},onNavToCode:function(e){this.router.navTo("code",{id:this._sId},false)}});
