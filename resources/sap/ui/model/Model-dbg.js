/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides the base implementation for all model implementations
sap.ui.define(['jquery.sap.global', 'sap/ui/base/EventProvider', './BindingMode', './Context'],
	function(jQuery, EventProvider, BindingMode, Context) {
	"use strict";


	/**
	 * The SAPUI5 Data Binding API.
	 *
	 * The default binding mode for model implementations (if not implemented otherwise) is two way and the supported binding modes by the model
	 * are one way, two way and one time. The default binding mode can be changed by the application for each model instance.
	 * A model implementation should specify its supported binding modes and set the default binding mode accordingly
	 * (e.g. if the model supports only one way binding the default binding mode should also be set to one way).
	 *
	 * @namespace
	 * @name sap.ui.model
	 * @public
	 */
	
	/**
	 * Constructor for a new Model.
	 *
	 * @class
	 * This is an abstract base class for model objects.
	 * @abstract
	 *
	 * @extends sap.ui.base.Object
	 *
	 * @author SAP AG
	 * @version 1.22.4
	 *
	 * @constructor
	 * @public
	 * @name sap.ui.model.Model
	 */
	var Model = EventProvider.extend("sap.ui.model.Model", /** @lends sap.ui.model.Model.prototype */ {
		
		constructor : function () {
			EventProvider.apply(this, arguments);
		
			this.oData = {};
			this.bDestroyed = false;
			this.aBindings = [];
			this.mContexts = {};
			this.iSizeLimit = 100;
			this.sDefaultBindingMode = BindingMode.TwoWay;
			this.mSupportedBindingModes = {"OneWay": true, "TwoWay": true, "OneTime": true};
			this.bLegacySyntax = false;
		},
	
		metadata : {
	
			"abstract" : true,
			publicMethods : [
				// methods
				"bindProperty", "bindList", "bindTree", "bindContext", "createBindingContext", "destroyBindingContext", "getProperty",
				"getDefaultBindingMode", "setDefaultBindingMode", "isBindingModeSupported", "attachParseError", "detachParseError",
				"attachRequestCompleted", "detachRequestCompleted", "attachRequestFailed", "detachRequestFailed", "attachRequestSent",
				"detachRequestSent", "setSizeLimit", "refresh", "isList", "getObject"
		  ]
		
		  /* the following would save code, but requires the new ManagedObject (1.9.1) 
		  , events : {
		  	"parseError" : {},
		  	"requestFailed" : {},
		  	"requestSent" : {},
		  	"requestCompleted" ; {} 
		  }
		  */
		
		}
	
	});
	
	/**
	 * Creates a new subclass of class sap.ui.model.Model with name <code>sClassName</code> 
	 * and enriches it with the information contained in <code>oClassInfo</code>.
	 * 
	 * For a detailed description of <code>oClassInfo</code> or <code>FNMetaImpl</code> 
	 * see {@link sap.ui.base.Object.extend Object.extend}.
	 *   
	 * @param {string} sClassName name of the class to be created
	 * @param {object} [oClassInfo] object literal with informations about the class  
	 * @param {function} [FNMetaImpl] alternative constructor for a metadata object
	 * @return {function} the created class / constructor function
	 * @public
	 * @static
	 * @name sap.ui.model.Model.extend
	 * @function
	 */
	
	
	/**
	 * Map of event names, that are provided by the model.
	 * @name sap.ui.model.Model.M_EVENTS
	 */
	Model.M_EVENTS = {
		/**
		 * Depending on the model implementation a ParseError should be fired if a parse error occurred.
		 * Contains the parameters:
		 * errorCode, url, reason, srcText, line, linepos, filepos
		 */
		ParseError : "parseError",
	
		/**
		 * Depending on the model implementation a RequestFailed should be fired if a request to a backend failed.
		 * Contains the parameters:
		 * message, statusCode, statusText and responseText
		 */
		RequestFailed : "requestFailed",
	
		/**
		 * Depending on the model implementation a RequestSent should be fired when a request to a backend is sent.
		 * Contains Parameters: url, type, async, info (<strong>deprecated</strong>), infoObject
		 */
		RequestSent : "requestSent",
	
		/**
		 * Depending on the model implementation a RequestCompleted should be fired when a request to a backend is completed regardless if the request failed or succeeded.
		 * Contains Parameters: url, type, async, info (<strong>deprecated</strong>), infoObject, success, errorobject
		 */
		RequestCompleted : "requestCompleted"
	};
	
	/**
	 * The 'requestFailed' event is fired, when data retrieval from a backend failed.
	 *
	 * @name sap.ui.model.Model#requestFailed
	 * @event
	 * @param {sap.ui.base.Event} oControlEvent
	 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
	 * @param {object} oControlEvent.getParameters
	
	 * @param {string} oControlEvent.getParameters.message A text that describes the failure.
	 * @param {string} oControlEvent.getParameters.statusCode HTTP status code returned by the request (if available)
	 * @param {string} oControlEvent.getParameters.statusText The status as a text, details not specified, intended only for diagnosis output
	 * @param {string} oControlEvent.getParameters.responseText Response that has been received for the request ,as a text string
	 * @public
	 */
	
	/**
	 * Attach event-handler <code>fnFunction</code> to the 'requestFailed' event of this <code>sap.ui.model.Model</code>.<br/>
	 *
	 *
	 * @param {object}
	 *            [oData] The object, that should be passed along with the event-object when firing the event.
	 * @param {function}
	 *            fnFunction The function to call, when the event occurs. This function will be called on the
	 *            oListener-instance (if present) or in a 'static way'.
	 * @param {object}
	 *            [oListener] Object on which to call the given function. If empty, this Model is used.
	 *
	 * @return {sap.ui.model.Model} <code>this</code> to allow method chaining
	 * @public
	 * @name sap.ui.model.Model#attachRequestFailed
	 * @function
	 */
	Model.prototype.attachRequestFailed = function(oData, fnFunction, oListener) {
		this.attachEvent("requestFailed", oData, fnFunction, oListener);
		return this;
	};
	
	/**
	 * Detach event-handler <code>fnFunction</code> from the 'requestFailed' event of this <code>sap.ui.model.Model</code>.<br/>
	 *
	 * The passed function and listener object must match the ones previously used for event registration.
	 *
	 * @param {function}
	 *            fnFunction The function to call, when the event occurs.
	 * @param {object}
	 *            oListener Object on which the given function had to be called.
	 * @return {sap.ui.model.Model} <code>this</code> to allow method chaining
	 * @public
	 * @name sap.ui.model.Model#detachRequestFailed
	 * @function
	 */
	Model.prototype.detachRequestFailed = function(fnFunction, oListener) {
		this.detachEvent("requestFailed", fnFunction, oListener);
		return this;
	};
	
	/**
	 * Fire event requestFailed to attached listeners.
	 *
	 * @param {object} [mArguments] the arguments to pass along with the event.
	 * @param {string} [mArguments.message]  A text that describes the failure.
	 * @param {string} [mArguments.statusCode]  HTTP status code returned by the request (if available)
	 * @param {string} [mArguments.statusText] The status as a text, details not specified, intended only for diagnosis output
	 * @param {string} [mArguments.responseText] Response that has been received for the request ,as a text string
	 * 
	 * @return {sap.ui.model.Model} <code>this</code> to allow method chaining
	 * @protected
	 * @name sap.ui.model.Model#fireRequestFailed
	 * @function
	 */
	Model.prototype.fireRequestFailed = function(mArguments) {
		this.fireEvent("requestFailed", mArguments);
		return this;
	};
	
	
	/**
	 * The 'parseError' event is fired when parsing of a model document (e.g. XML response) fails.
	 *
	 * @name sap.ui.model.Model#parseError
	 * @event
	 * @param {sap.ui.base.Event} oControlEvent
	 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
	 * @param {object} oControlEvent.getParameters
	
	 * @param {int} oControlEvent.getParameters.errorCode
	 * @param {string} oControlEvent.getParameters.url
	 * @param {string} oControlEvent.getParameters.reason
	 * @param {string} oControlEvent.getParameters.srcText
	 * @param {int} oControlEvent.getParameters.line
	 * @param {int} oControlEvent.getParameters.linepos
	 * @param {int} oControlEvent.getParameters.filepos
	 * @public
	 */
	
	/**
	 * Attach event-handler <code>fnFunction</code> to the 'parseError' event of this <code>sap.ui.model.Model</code>.<br/>
	 *
	 *
	 * @param {object}
	 *            [oData] The object, that should be passed along with the event-object when firing the event.
	 * @param {function}
	 *            fnFunction The function to call, when the event occurs. This function will be called on the
	 *            oListener-instance (if present) or in a 'static way'.
	 * @param {object}
	 *            [oListener] Object on which to call the given function. If empty, the global context (window) is used.
	 *
	 * @return {sap.ui.model.Model} <code>this</code> to allow method chaining
	 * @public
	 * @name sap.ui.model.Model#attachParseError
	 * @function
	 */
	Model.prototype.attachParseError = function(oData, fnFunction, oListener) {
		this.attachEvent("parseError", oData, fnFunction, oListener);
		return this;
	};
	
	/**
	 * Detach event-handler <code>fnFunction</code> from the 'parseError' event of this <code>sap.ui.model.Model</code>.<br/>
	 *
	 * The passed function and listener object must match the ones previously used for event registration.
	 *
	 * @param {function}
	 *            fnFunction The function to call, when the event occurs.
	 * @param {object}
	 *            oListener Object on which the given function had to be called.
	 * @return {sap.ui.model.Model} <code>this</code> to allow method chaining
	 * @public
	 * @name sap.ui.model.Model#detachParseError
	 * @function
	 */
	Model.prototype.detachParseError = function(fnFunction, oListener) {
		this.detachEvent("parseError", fnFunction, oListener);
		return this;
	};
	
	/**
	 * Fire event parseError to attached listeners.
	 *
	 * @param {object} [mArguments] the arguments to pass along with the event.
	 * @param {int} [mArguments.errorCode]
	 * @param {string} [mArguments.url]
	 * @param {string} [mArguments.reason]
	 * @param {string} [mArguments.srcText]
	 * @param {int} [mArguments.line]
	 * @param {int} [mArguments.linepos]
	 * @param {int} [mArguments.filepos]
	 *
	 * @return {sap.ui.model.Model} <code>this</code> to allow method chaining
	 * @protected
	 * @name sap.ui.model.Model#fireParseError
	 * @function
	 */
	Model.prototype.fireParseError = function(mArguments) {
		this.fireEvent("parseError", mArguments);
		return this;
	};
	
	/**
	 * The 'requestSent' event is fired, after a request has been sent to a backend.
	 *
	 * Note: Subclasses might add additional parameters to the event object.
	 * 
	 * @name sap.ui.model.Model#requestSent
	 * @event
	 * @param {sap.ui.base.Event} oControlEvent
	 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
	 * @param {object} oControlEvent.getParameters
	 * @param {string} oControlEvent.getParameters.url The url which is sent to the backend
	 * @param {string} oControlEvent.getParameters.type The type of the request (if available)
	 * @param {boolean} [oControlEvent.getParameters.async] If the request is synchronous or asynchronous (if available)
	 * @param {string} [oControlEvent.getParameters.info] Additional information for the request (if available) <strong>deprecated</strong>
	 * @param {object} [oControlEvent.getParameters.infoObject] Additional information for the request (if available)
	 * @public
	 */
	
	/**
	 * Attach event-handler <code>fnFunction</code> to the 'requestSent' event of this <code>sap.ui.model.Model</code>.
	 *
	 *
	 * @param {object}
	 *            [oData] The object, that should be passed along with the event-object when firing the event.
	 * @param {function}
	 *            fnFunction The function to call, when the event occurs. This function will be called on the
	 *            oListener-instance (if present) or in a 'static way'.
	 * @param {object}
	 *            [oListener] Object on which to call the given function. If empty, the global context (window) is used.
	 *
	 * @return {sap.ui.model.Model} <code>this</code> to allow method chaining
	 * @public
	 * @name sap.ui.model.Model#attachRequestSent
	 * @function
	 */
	Model.prototype.attachRequestSent = function(oData, fnFunction, oListener) {
		this.attachEvent("requestSent", oData, fnFunction, oListener);
		return this;
	};
	
	/**
	 * Detach event-handler <code>fnFunction</code> from the 'requestSent' event of this <code>sap.ui.model.Model</code>.
	 *
	 * The passed function and listener object must match the ones previously used for event registration.
	 *
	 * @param {function}
	 *            fnFunction The function to call, when the event occurs.
	 * @param {object}
	 *            oListener Object on which the given function had to be called.
	 * @return {sap.ui.model.Model} <code>this</code> to allow method chaining
	 * @public
	 * @name sap.ui.model.Model#detachRequestSent
	 * @function
	 */
	Model.prototype.detachRequestSent = function(fnFunction, oListener) {
		this.detachEvent("requestSent", fnFunction, oListener);
		return this;
	};
	
	/**
	 * Fire event requestSent to attached listeners.
	 *
	 * @param {object} [mArguments] the arguments to pass along with the event.
	 * @param {string} [mArguments.url] The url which is sent to the backend.
	 * @param {string} [mArguments.type] The type of the request (if available)
	 * @param {boolean} [mArguments.async] If the request is synchronous or asynchronous (if available)
	 * @param {string} [mArguments.info] additional information for the request (if available) <strong>deprecated</strong>
	 * @param {object} [mArguments.infoObject] Additional information for the request (if available)
	 * @return {sap.ui.model.Model} <code>this</code> to allow method chaining
	 * @protected
	 * @name sap.ui.model.Model#fireRequestSent
	 * @function
	 */
	Model.prototype.fireRequestSent = function(mArguments) {
		this.fireEvent("requestSent", mArguments);
		return this;
	};
	
	/**
	 * The 'requestCompleted' event is fired, after a request has been completed (includes receiving a response), 
	 * no matter whether the request succeeded or not.
	 * 
	 * Note: Subclasses might add additional parameters to the event object.
	 * 
	 * @name sap.ui.model.Model#requestCompleted
	 * @event
	 * @param {sap.ui.base.Event} oControlEvent
	 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
	 * @param {object} oControlEvent.getParameters
	 * @param {string} oControlEvent.getParameters.url The url which was sent to the backend
	 * @param {string} oControlEvent.getParameters.type The type of the request (if available)
	 * @param {boolean} oControlEvent.getParameters.success if the request has been successful or not. In case of errors consult the optional errorobject parameter.
	 * @param {object} [oControlEvent.getParameters.errorobject] If the request failed the error if any can be accessed in this property.
	 * @param {boolean} [oControlEvent.getParameters.async] If the request is synchronous or asynchronous (if available)
	 * @param {string} [oControlEvent.getParameters.info] Additional information for the request (if available) <strong>deprecated</strong>
	 * @param {object} [oControlEvent.getParameters.infoObject] Additional information for the request (if available)
	 * @public
	 */
	
	/**
	 * Attach event-handler <code>fnFunction</code> to the 'requestCompleted' event of this <code>sap.ui.model.Model</code>.
	 *
	 *
	 * @param {object}
	 *            [oData] The object, that should be passed along with the event-object when firing the event.
	 * @param {function}
	 *            fnFunction The function to call, when the event occurs. This function will be called on the
	 *            oListener-instance (if present) or in a 'static way'.
	 * @param {object}
	 *            [oListener] Object on which to call the given function. If empty, the global context (window) is used.
	 *
	 * @return {sap.ui.model.Model} <code>this</code> to allow method chaining
	 * @public
	 * @name sap.ui.model.Model#attachRequestCompleted
	 * @function
	 */
	Model.prototype.attachRequestCompleted = function(oData, fnFunction, oListener) {
		this.attachEvent("requestCompleted", oData, fnFunction, oListener);
		return this;
	};
	
	/**
	 * Detach event-handler <code>fnFunction</code> from the 'requestCompleted' event of this <code>sap.ui.model.Model</code>.
	 *
	 * The passed function and listener object must match the ones previously used for event registration.
	 *
	 * @param {function}
	 *            fnFunction The function to call, when the event occurs.
	 * @param {object}
	 *            oListener Object on which the given function had to be called.
	 * @return {sap.ui.model.Model} <code>this</code> to allow method chaining
	 * @public
	 * @name sap.ui.model.Model#detachRequestCompleted
	 * @function
	 */
	Model.prototype.detachRequestCompleted = function(fnFunction, oListener) {
		this.detachEvent("requestCompleted", fnFunction, oListener);
		return this;
	};
	
	/**
	 * Fire event requestCompleted to attached listeners.
	 *
	 * @param {object} [mArguments] the arguments to pass along with the event.
	 * @param {string} [mArguments.url] The url which was sent to the backend.
	 * @param {string} [mArguments.type] The type of the request (if available)
	 * @param {boolean} [mArguments.async] If the request was synchronous or asynchronous (if available)
	 * @param {string} [mArguments.info] additional information for the request (if available) <strong>deprecated</strong>
	 * @param {object} [mArguments.infoObject] Additional information for the request (if available)
	 *
	 * @return {sap.ui.model.Model} <code>this</code> to allow method chaining
	 * @protected
	 * @name sap.ui.model.Model#fireRequestCompleted
	 * @function
	 */
	Model.prototype.fireRequestCompleted = function(mArguments) {
		this.fireEvent("requestCompleted", mArguments);
		return this;
	};
	
	
	// the 'abstract methods' to be implemented by child classes
	
	/**
	 * Implement in inheriting classes
	 * @abstract
	 *
	 * @name sap.ui.model.Model.prototype.bindProperty
	 * @function
	 * @param {string}
	 *         sPath the path pointing to the property that should be bound
	 * @param {object}
	 *         [oContext=null] the context object for this databinding (optional)
	 * @param {object}
	 *         [mParameters=null] additional model specific parameters (optional)
	 * @return {sap.ui.model.PropertyBinding}
	 *
	 * @public
	 */
	
	/**
	 * Implement in inheriting classes
	 * @abstract
	 *
	 * @name sap.ui.model.Model.prototype.bindList
	 * @function
	 * @param {string}
	 *         sPath the path pointing to the list / array that should be bound
	 * @param {object}
	 *         [oContext=null] the context object for this databinding (optional)
	 * @param {sap.ui.model.Sorter}
	 *         [aSorters=null] initial sort order (can be either a sorter or an array of sorters) (optional)
	 * @param {array}
	 *         [aFilters=null] predefined filter/s (can be either a filter or an array of filters) (optional)
	 * @param {object}
	 *         [mParameters=null] additional model specific parameters (optional)
	 * @return {sap.ui.model.ListBinding}
	
	 * @public
	 */
	
	/**
	 * Implement in inheriting classes
	 * @abstract
	 *
	 * @name sap.ui.model.Model.prototype.bindTree
	 * @function
	 * @param {string}
	 *         sPath the path pointing to the tree / array that should be bound
	 * @param {object}
	 *         [oContext=null] the context object for this databinding (optional)
	 * @param {array}
	 *         [aFilters=null] predefined filter/s contained in an array (optional)
	 * @param {object}
	 *         [mParameters=null] additional model specific parameters (optional)
	 * @return {sap.ui.model.TreeBinding}
	
	 * @public
	 */
	
	/**
	 * Implement in inheriting classes
	 * @abstract
	 *
	 * @name sap.ui.model.Model.prototype.createBindingContext
	 * @function
	 * @param {string}
	 *         sPath the path to create the new context from
	 * @param {object}
	 *		   [oContext=null] the context which should be used to create the new binding context
	 * @param {object}
	 *		   [mParameters=null] the parameters used to create the new binding context
	 * @param {function}
	 *         fnCallBack the function which should be called after the binding context has been created
	 * @param {boolean}
	 *         [bReload] force reload even if data is already available. For server side models this should 
	 *                   refetch the data from the server 
	 *         
	 * @public
	 */
	
	/**
	 * Implement in inheriting classes
	 * @abstract
	 *
	 * @name sap.ui.model.Model.prototype.destroyBindingContext
	 * @function
	 * @param {object}
	 *         oContext to destroy
	
	 * @public
	 */
	
	/**
	 * Implement in inheriting classes
	 * @abstract
	 *
	 * @name sap.ui.model.Model.prototype.getProperty
	 * @function
	 * @param {string}
	 *         sPath the path to where to read the attribute value
	 * @param {object}
	 *		   [oContext=null] the context with which the path should be resolved
	 * @public
	 */
	
	/**
	 * Implement in inheriting classes
	 * @abstract
	 *
	 * @name sap.ui.model.Model.prototype.getObject
	 * @function
	 * @param {string}
	 *         sPath the path to where to read the object
	 * @param {object}
	 *		   [oContext=null] the context with which the path should be resolved
	 * @public
	 */
	Model.prototype.getObject = function(sPath, oContext) {
		return this.getProperty(sPath, oContext);
	};
	
	
	/**
	 * Create ContextBinding
	 * @abstract
	 * 
	 * @name sap.ui.model.Model.prototype.bindContext
	 * @function
	 * @param {string | object}
	 *         sPath the path pointing to the property that should be bound or an object 
	 *         which contains the following parameter properties: path, context, parameters
	 * @param {object}
	 *         [oContext=null] the context object for this databinding (optional)
	 * @param {object}
	 *         [mParameters=null] additional model specific parameters (optional)
	 * @param {object}
	 *         [oEvents=null] event handlers can be passed to the binding ({change:myHandler})
	 * @return {sap.ui.model.ContextBinding}
	 *
	 * @public
	 */
	
	/**
	 * Gets a binding context. If context already exists, return it from the map,
	 * otherwise create one using the context constructor.
	 *
	 * @param {string} sPath the path
	 * @name sap.ui.model.Model#getContext
	 * @function
	 */
	Model.prototype.getContext = function(sPath) {
		if (!jQuery.sap.startsWith(sPath, "/")) {
			throw new Error("Path " +sPath+" must start with a / ");
		}
		var oContext = this.mContexts[sPath];
		if (!oContext) {
			oContext = new Context(this, sPath);
			this.mContexts[sPath] = oContext;
		}
		return oContext;
	};
	
	/**
	 * Resolve the path relative to the given context.
	 * 
	 * If a relative path is given (not starting with a '/') but no context,
	 * then the path can't be resolved and undefined is returned.
	 *
	 * For backward compatibility, the behavior of this method can be changed by 
	 * setting the 'legacySyntax' property. Then an unresolvable, relative path 
	 * is automatically converted into an absolute path.
	 * 
	 * @param {string} sPath path to resolve
	 * @param {sap.ui.core.Context} [oContext] context to resolve a relative path against
	 * @return {string} resolved path or undefined
	 * @name sap.ui.model.Model#resolve
	 * @function
	 */
	Model.prototype.resolve = function(sPath, oContext) {
		var bIsRelative = !jQuery.sap.startsWith(sPath, "/"),
			sResolvedPath = sPath,
			sContextPath;
		if (bIsRelative) {
			if (oContext) {
				sContextPath = oContext.getPath();
				sResolvedPath = sContextPath + (jQuery.sap.endsWith(sContextPath, "/") ? "" : "/") + sPath;
			}
			else {
				sResolvedPath = this.isLegacySyntax() ? "/" + sPath : undefined;
			}
		}
		
		// invariant: path never ends with a slash ... if root is requested we return /
		if (sResolvedPath && sResolvedPath !== "/" && jQuery.sap.endsWith(sResolvedPath, "/")) {
			sResolvedPath = sResolvedPath.substr(0, sResolvedPath.length - 1);
		}
		return sResolvedPath;
	};
	
	/**
	 * Add a binding to this model
	 *
	 * @param {sap.ui.model.Binding} oBinding the binding to be added
	 * @name sap.ui.model.Model#addBinding
	 * @function
	 */
	Model.prototype.addBinding = function(oBinding) {
		this.aBindings.push(oBinding);
	};
	
	/**
	 * Remove a binding from the model
	 *
	 * @param {sap.ui.model.Binding} oBinding the binding to be removed
	 * @name sap.ui.model.Model#removeBinding
	 * @function
	 */
	Model.prototype.removeBinding = function(oBinding) {
		for (var i = 0; i < this.aBindings.length; i++) {
			if (this.aBindings[i] == oBinding) {
				this.aBindings.splice(i, 1);
				break;
			}
		}
	};
	
	/**
	 * Get the default binding mode for the model
	 *
	 * @return {sap.ui.model.BindingMode} default binding mode of the model
	 *
	 * @public
	 * @name sap.ui.model.Model#getDefaultBindingMode
	 * @function
	 */
	Model.prototype.getDefaultBindingMode = function() {
		return this.sDefaultBindingMode;
	};
	
	/**
	 * Set the default binding mode for the model. If the default binding mode should be changed,
	 * this method should be called directly after model instance creation and before any binding creation.
	 * Otherwise it is not guaranteed that the existing bindings will be updated with the new binding mode.
	 *
	 * @param {sap.ui.model.BindingMode} sMode the default binding mode to set for the model
	 *
	 * @public
	 * @name sap.ui.model.Model#setDefaultBindingMode
	 * @function
	 */
	Model.prototype.setDefaultBindingMode = function(sMode) {
		if (this.isBindingModeSupported(sMode)) {
			this.sDefaultBindingMode = sMode;
		}
		else {
			throw new Error("Binding mode " + sMode + " is not supported by this model.");
		}
	};
	
	/**
	 * Check if the specified binding mode is supported by the model.
	 *
	 * @param {sap.ui.model.BindingMode} sMode the binding mode to check
	 *
	 * @public
	 * @name sap.ui.model.Model#isBindingModeSupported
	 * @function
	 */
	Model.prototype.isBindingModeSupported = function(sMode) {
		return (sMode in this.mSupportedBindingModes);
	};
	
	/**
	 * Enables legacy path syntax handling
	 * 
	 * This defines, whether relative bindings, which do not have a defined
	 * binding context, should be compatible to earlier releases which means
	 * they are resolved relative to the root element or handled strict and
	 * stay unresolved until a binding context is set
	 *
	 * @param {boolean} bCompatibleSyntax the path syntax to use
	 *
	 * @public
	 * @name sap.ui.model.Model#setLegacySyntax
	 * @function
	 */
	Model.prototype.setLegacySyntax = function(bLegacySyntax) {
		this.bLegacySyntax = bLegacySyntax;
	};
	
	/**
	 * Returns whether legacy path syntax is used
	 *
	 * @return {boolean} 
	 * 
	 * @public
	 * @name sap.ui.model.Model#isLegacySyntax
	 * @function
	 */
	Model.prototype.isLegacySyntax = function() {
		return this.bLegacySyntax;
	};
	
	/**
	 * Set the maximum number of entries which are used for for list bindings.
	 * @param {int} collection size limit  
	 * @public
	 * @name sap.ui.model.Model#setSizeLimit
	 * @function
	 */
	Model.prototype.setSizeLimit = function(iSizeLimit) {
		this.iSizeLimit = iSizeLimit;
	};
	
	/**
	 * Override getInterface method to avoid creating an Interface object for models
	 * @name sap.ui.model.Model#getInterface
	 * @function
	 */
	Model.prototype.getInterface = function() {
		return this;
	};
	
	/**
	 * Refresh the model.
	 * This will check all bindings for updated data and update the controls if data has been changed. 
	 * 
	 * @param {boolean} bForceUpdate Update controls even if data has not been changed
	 * @public
	 * @name sap.ui.model.Model#refresh
	 * @function
	 */
	Model.prototype.refresh = function(bForceUpdate) {
		this.checkUpdate(bForceUpdate);
	};
	
	/**
	 * Private method iterating the registered bindings of this model instance and initiating their check for update
	 * @param {boolean} bForceUpdate
	 * @private
	 * @name sap.ui.model.Model#checkUpdate
	 * @function
	 */
	Model.prototype.checkUpdate = function(bForceUpdate) {
		var aBindings = this.aBindings.slice(0);
		jQuery.each(aBindings, function(iIndex, oBinding) {
			oBinding.checkUpdate(bForceUpdate);
		});
	};
	
	/**
	 * Destroys the model and clears the model data. 
	 * A model implementation may override this function and perform model specific cleanup tasks e.g. 
	 * abort requests, prevent new requests, etc.
	 * 
	 * @see sap.ui.base.Object.prototype.destroy
	 * @public
	 * @name sap.ui.model.Model#destroy
	 * @function
	 */
	Model.prototype.destroy = function() {
		this.oData = {};
		this.aBindings = [];
		this.mContexts = {};
		this.bDestroyed = true;
		EventProvider.prototype.destroy.apply(this, arguments);
	};
	
	/**
	 * Returns id the provided path is a list (aggregation) or an entity
	 *
	 * @abstract
	 * @name sap.ui.model.Model.prototype.bindContext
	 * @function
	 * @param {string} sPath the path pointing to the property that should be bound
	 * @param {object} [oContext=null] the context object for this databinding (optional)
	 * @return {boolean} 
	 * @since 1.17.1 
	 * @public
	 */
	

	return Model;

}, /* bExport= */ true);
