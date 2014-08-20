jQuery.sap.require("jquery.sap.storage");sap.ui.controller("sap.ui.demokit.explored.view.master",{_bIsViewUpdatedAtLeastOnce:false,_oVSDialog:null,_oViewSettings:null,_oStorage:jQuery.sap.storage(jQuery.sap.storage.Type.local),_sStorageKey:"UI5_EXPLORED_VIEW_SETTINGS",_mGroupFunctions:{"name":function(c){var k=c.getProperty("name").charAt(0);return{key:k,text:k}},"namespace":true,"category":true,"appComponent":true,"since":true,"formFactors":true},onInit:function(){this.router=sap.ui.core.UIComponent.getRouterFor(this);this.router.attachRoutePatternMatched(this.onRouteMatched,this);this._component=sap.ui.component(sap.ui.core.Component.getOwnerIdFor(this.getView()));this._component.getEventBus().subscribe("app","selectEntity",this.onSelectEntity,this);this.getView().addEventDelegate({onBeforeFirstShow:jQuery.proxy(this.onBeforeFirstShow,this)})},onBeforeFirstShow:function(){if(!this._bIsViewUpdatedAtLeastOnce){this._updateView()}},onRouteMatched:function(e){var r=e.getParameter("name");if("home"!==r&&"notFound"!==r){return}this._updateView()},onToggleCompactMode:function(e){this._oViewSettings.compactOn=(!this._oViewSettings.compactOn);var s=JSON.stringify(this._oViewSettings);this._oStorage.put(this._sStorageKey,s);jQuery.sap.require("sap.m.MessageToast");if(this._oViewSettings.compactOn){sap.m.MessageToast.show("Now displaying content in 'Compact' Size")}else{sap.m.MessageToast.show("Now displaying content in default size ('Condensed' or 'Cozy')")}this._component.getEventBus().publish("app","setCompact",{compactOn:this._oViewSettings.compactOn})},onSelectEntity:function(c,e,d){var v=this.getView(),l=v.byId("list"),m=v.getModel("entity");var s=null;var I=l.getItems();jQuery.each(I,function(i,o){var C=o.getBindingContext("entity");if(C){var p=C.getPath();var E=m.getProperty(p);if(E.id===d.id){s=o;return false}}});if(s){l.setSelectedItem(s)}else{l.removeSelections()}},onOpenViewSettings:function(){if(!this._oVSDialog){this._oVSDialog=sap.ui.xmlfragment("sap.ui.demokit.explored.view.viewSettingsDialog",this);this.getView().addDependent(this._oVSDialog)}jQuery.sap.delayedCall(0,this,function(){var f={};jQuery.each(this._oViewSettings.filter,function(p,v){jQuery.each(v,function(i,V){f[V]=true})});this._oVSDialog.setSelectedFilterKeys(f);this._oVSDialog.setSelectedGroupItem(this._oViewSettings.groupProperty);this._oVSDialog.setGroupDescending(this._oViewSettings.groupDescending);this._oVSDialog.toggleStyleClass("sapUiSizeCompact",this._oViewSettings.compactOn);this._oVSDialog.open()})},onConfirmViewSettings:function(e){var t=this;this._oViewSettings.filter={};var f=e.getParameter("filterItems");jQuery.each(f,function(i,I){var k=I.getKey();var p=I.getParent().getKey();if(!t._oViewSettings.filter.hasOwnProperty(p)){t._oViewSettings.filter[p]=[]}t._oViewSettings.filter[p].push(k)});var g=e.getParameter("groupItem");var n=(g)?g.getKey():null;this._oViewSettings.groupProperty=n;this._oViewSettings.groupDescending=e.getParameter("groupDescending");var s=JSON.stringify(this._oViewSettings);this._oStorage.put(this._sStorageKey,s);this._updateView()},onSearch:function(){this._updateView()},onNavToEntity:function(e){var i=e.getParameter("listItem");var I=(i)?i:e.getSource();var p=I.getBindingContext("entity").getPath();var E=this.getView().getModel("entity").getProperty(p);var r=!sap.ui.Device.system.phone;this.router.navTo("entity",{id:E.id,part:"samples"},r)},_updateView:function(){if(!this._oViewSettings){this._initViewSettings();this._component.getEventBus().publish("app","setCompact",{compactOn:this._oViewSettings.compactOn});this.getView().byId("compactModeButton").setPressed(this._oViewSettings.compactOn)}this._updateFilterBarDisplay();this._updateListBinding()},_updateFilterBarDisplay:function(){var f="";jQuery.each(this._oViewSettings.filter,function(p,V){jQuery.each(V,function(i,a){f+=a+", "})});if(f.length>0){var I=f.lastIndexOf(", ");f=f.substring(0,I)}var v=this.getView();v.byId("vsFilterBar").setVisible(f.length>0);v.byId("vsFilterLabel").setText(f)},_updateListBinding:function(){var f=[],s=[],S=this.getView().byId("searchField"),l=this.getView().byId("list"),b=l.getBinding("items");var q=S.getValue();if(q){f.push(new sap.ui.model.Filter("searchTags","Contains",q))}jQuery.each(this._oViewSettings.filter,function(p,v){var P=[];jQuery.each(v,function(i,V){var O=("formFactors"===p)?"Contains":"EQ";P.push(new sap.ui.model.Filter(p,O,V))});var F=new sap.ui.model.Filter(P,false);f.push(F)});if(f.length===0){b.filter(f,"Application")}else{var F=new sap.ui.model.Filter(f,true);b.filter(F,"Application")}if(this._oViewSettings.groupProperty){var o=new sap.ui.model.Sorter(this._oViewSettings.groupProperty,this._oViewSettings.groupDescending,this._mGroupFunctions[this._oViewSettings.groupProperty]);s.push(o)}s.push(new sap.ui.model.Sorter("name",false));b.sort(s);this._bIsViewUpdatedAtLeastOnce=true},_initViewSettings:function(){var j=this._oStorage.get(this._sStorageKey);if(!j){this._oViewSettings={filter:{},groupProperty:"category",groupDescending:false,compactOn:false}}else{this._oViewSettings=JSON.parse(j);var f=this.getView().getModel("filter").getData();var c={};jQuery.each(this._oViewSettings.filter,function(p,v){var n=[];jQuery.each(v,function(i,V){var b=false;jQuery.each(f[p],function(i,o){if(o.id===V){b=true;return false}});if(b){n.push(V)}});if(n.length>0){c[p]=n}});this._oViewSettings.filter=c;if(!this._oViewSettings.hasOwnProperty("compactOn")){this._oViewSettings.compactOn=false}}}});