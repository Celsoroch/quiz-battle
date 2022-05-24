/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");
var transitionalDefaults = __webpack_require__(/*! ../defaults/transitional */ "./node_modules/axios/lib/defaults/transitional.js");
var Cancel = __webpack_require__(/*! ../cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;
    var onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
        request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
      var transitional = config.transitional || transitionalDefaults;
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(
        timeoutErrorMessage,
        config,
        transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken || config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = function(cancel) {
        if (!request) {
          return;
        }
        reject(!cancel || (cancel && cancel.type) ? new Cancel('canceled') : cancel);
        request.abort();
        request = null;
      };

      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults/index.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
axios.VERSION = (__webpack_require__(/*! ./env/data */ "./node_modules/axios/lib/env/data.js").version);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

// Expose isAxiosError
axios.isAxiosError = __webpack_require__(/*! ./helpers/isAxiosError */ "./node_modules/axios/lib/helpers/isAxiosError.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports["default"] = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;

  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;

  // eslint-disable-next-line func-names
  this.promise.then(function(cancel) {
    if (!token._listeners) return;

    var i;
    var l = token._listeners.length;

    for (i = 0; i < l; i++) {
      token._listeners[i](cancel);
    }
    token._listeners = null;
  });

  // eslint-disable-next-line func-names
  this.promise.then = function(onfulfilled) {
    var _resolve;
    // eslint-disable-next-line func-names
    var promise = new Promise(function(resolve) {
      token.subscribe(resolve);
      _resolve = resolve;
    }).then(onfulfilled);

    promise.cancel = function reject() {
      token.unsubscribe(_resolve);
    };

    return promise;
  };

  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Subscribe to the cancel signal
 */

CancelToken.prototype.subscribe = function subscribe(listener) {
  if (this.reason) {
    listener(this.reason);
    return;
  }

  if (this._listeners) {
    this._listeners.push(listener);
  } else {
    this._listeners = [listener];
  }
};

/**
 * Unsubscribe from the cancel signal
 */

CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
  if (!this._listeners) {
    return;
  }
  var index = this._listeners.indexOf(listener);
  if (index !== -1) {
    this._listeners.splice(index, 1);
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var validator = __webpack_require__(/*! ../helpers/validator */ "./node_modules/axios/lib/helpers/validator.js");

var validators = validator.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(configOrUrl, config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof configOrUrl === 'string') {
    config = config || {};
    config.url = configOrUrl;
  } else {
    config = configOrUrl || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  var transitional = config.transitional;

  if (transitional !== undefined) {
    validator.assertOptions(transitional, {
      silentJSONParsing: validators.transitional(validators.boolean),
      forcedJSONParsing: validators.transitional(validators.boolean),
      clarifyTimeoutError: validators.transitional(validators.boolean)
    }, false);
  }

  // filter out skipped interceptors
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
      return;
    }

    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });

  var promise;

  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, undefined];

    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);

    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }


  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }

  try {
    promise = dispatchRequest(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }

  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults/index.js");
var Cancel = __webpack_require__(/*! ../cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new Cancel('canceled');
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(prop) {
    if (prop in config2) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  var mergeMap = {
    'url': valueFromConfig2,
    'method': valueFromConfig2,
    'data': valueFromConfig2,
    'baseURL': defaultToConfig2,
    'transformRequest': defaultToConfig2,
    'transformResponse': defaultToConfig2,
    'paramsSerializer': defaultToConfig2,
    'timeout': defaultToConfig2,
    'timeoutMessage': defaultToConfig2,
    'withCredentials': defaultToConfig2,
    'adapter': defaultToConfig2,
    'responseType': defaultToConfig2,
    'xsrfCookieName': defaultToConfig2,
    'xsrfHeaderName': defaultToConfig2,
    'onUploadProgress': defaultToConfig2,
    'onDownloadProgress': defaultToConfig2,
    'decompress': defaultToConfig2,
    'maxContentLength': defaultToConfig2,
    'maxBodyLength': defaultToConfig2,
    'transport': defaultToConfig2,
    'httpAgent': defaultToConfig2,
    'httpsAgent': defaultToConfig2,
    'cancelToken': defaultToConfig2,
    'socketPath': defaultToConfig2,
    'responseEncoding': defaultToConfig2,
    'validateStatus': mergeDirectKeys
  };

  utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
    var merge = mergeMap[prop] || mergeDeepProperties;
    var configValue = merge(prop);
    (utils.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults/index.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  var context = this || defaults;
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn.call(context, data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults/index.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/defaults/index.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ../helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");
var enhanceError = __webpack_require__(/*! ../core/enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");
var transitionalDefaults = __webpack_require__(/*! ./transitional */ "./node_modules/axios/lib/defaults/transitional.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ../adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ../adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

var defaults = {

  transitional: transitionalDefaults,

  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data) || (headers && headers['Content-Type'] === 'application/json')) {
      setContentTypeIfUnset(headers, 'application/json');
      return stringifySafely(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    var transitional = this.transitional || defaults.transitional;
    var silentJSONParsing = transitional && transitional.silentJSONParsing;
    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

    if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw enhanceError(e, this, 'E_JSON_PARSE');
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },

  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*'
    }
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;


/***/ }),

/***/ "./node_modules/axios/lib/defaults/transitional.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/defaults/transitional.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


module.exports = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};


/***/ }),

/***/ "./node_modules/axios/lib/env/data.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/env/data.js ***!
  \********************************************/
/***/ ((module) => {

module.exports = {
  "version": "0.26.1"
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/***/ ((module) => {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAxiosError.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAxiosError.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return utils.isObject(payload) && (payload.isAxiosError === true);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/validator.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/validator.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var VERSION = (__webpack_require__(/*! ../env/data */ "./node_modules/axios/lib/env/data.js").version);

var validators = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {
  validators[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

var deprecatedWarnings = {};

/**
 * Transitional option validator
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 * @returns {function}
 */
validators.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return function(value, opt, opts) {
    if (validator === false) {
      throw new Error(formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')));
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new TypeError('options must be an object');
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator = schema[opt];
    if (validator) {
      var value = options[opt];
      var result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new TypeError('option ' + opt + ' must be ' + result);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw Error('Unknown option ' + opt);
    }
  }
}

module.exports = {
  assertOptions: assertOptions,
  validators: validators
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return Array.isArray(val);
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return toString.call(val) === '[object FormData]';
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return toString.call(val) === '[object URLSearchParams]';
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};


/***/ }),

/***/ "./src/modules/chat.js":
/*!*****************************!*\
  !*** ./src/modules/chat.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");

function chat() {
  return _chat.apply(this, arguments);
}

function _chat() {
  _chat = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var id_jog, jog, jog_data, isLider, nomeJogador, classe, coll, i, getTime, getResponse, buttonSendText, sendButton, textInput;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            sendButton = function _sendButton() {
              getResponse();
            };

            buttonSendText = function _buttonSendText(sampleText) {
              var userHtml = '<p class="userText"><span>' + sampleText + '</span></p>';
              $("#textInput").val("");
              $("#chatbox").append(userHtml);
              document.getElementById("chat-bar-bottom").scrollIntoView(true);
            };

            getResponse = function _getResponse() {
              var userText = $("#textInput").val();

              if (userText == "") {
                userText = "";
              }

              var userHtml = "<p class=\"userText\"><span class=\"".concat(classe, "\">").concat(nomeJogador, "</span><span class=\"texto\">").concat(userText, "</span></p>");
              $("#textInput").val("");
              $("#chatbox").append(userHtml);
              document.getElementById("chat-bar-bottom").scrollIntoView(true);
            };

            getTime = function _getTime() {
              var today = new Date();
              hours = today.getHours();
              minutes = today.getMinutes();

              if (hours < 10) {
                hours = "0" + hours;
              }

              if (minutes < 10) {
                minutes = "0" + minutes;
              }

              var time = hours + ":" + minutes;
              return time;
            };

            // Jogador
            id_jog = 'lm35';
            _context.next = 7;
            return axios("http://localhost:3000/jogadores/".concat(id_jog));

          case 7:
            jog = _context.sent;
            jog_data = jog.data;
            isLider = jog_data.lider;
            nomeJogador = jog_data.nome;
            classe = '';

            if (isLider) {
              classe = 'isLider';
            } else {
              classe = 'nomeJog';
            } // Collapsible


            coll = document.getElementsByClassName("collapsible");

            for (i = 0; i < coll.length; i++) {
              coll[i].addEventListener("click", function () {
                this.classList.toggle("active");
                var content = this.nextElementSibling;

                if (content.style.maxHeight) {
                  content.style.maxHeight = null;
                } else {
                  content.style.maxHeight = content.scrollHeight + "px";
                }
              });
            }

            // Press enter to send a message
            textInput = document.querySelector('#textInput');
            textInput.addEventListener('keypress', function (e) {
              if (e.which === 13) {
                getResponse();
              }
            });

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _chat.apply(this, arguments);
}

module.exports = chat;

/***/ }),

/***/ "./src/modules/equipes.js":
/*!********************************!*\
  !*** ./src/modules/equipes.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");

var _require = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js"),
    async = _require.async;

var _require2 = __webpack_require__(/*! ./timer */ "./src/modules/timer.js"),
    start_clique = _require2.start_clique,
    stop = _require2.stop,
    stop_ler = _require2.stop_ler; // Intruções


var instrucoes = document.querySelector('#instrucoes'); // Click Equipe

var click_equipe_1 = document.querySelector('.click_eq_1');
var click_equipe_2 = document.querySelector('.click_eq_2');
var click_equipe_3 = document.querySelector('.click_eq_3');
var click_equipe_4 = document.querySelector('.click_eq_4'); // Minha equipe

var jog_1_meq = document.querySelector('.jog_1_meq');
var jog_2_meq = document.querySelector('.jog_2_meq');
var jog_3_meq = document.querySelector('.jog_3_meq');
var jog_4_meq = document.querySelector('.jog_4_meq'); // Equipe 1

var equipe_1 = document.querySelector('.equipe_1');
var jog_1_eq1 = document.querySelector('.jog_1_eq1');
var jog_2_eq1 = document.querySelector('.jog_2_eq1');
var jog_3_eq1 = document.querySelector('.jog_3_eq1');
var jog_4_eq1 = document.querySelector('.jog_4_eq1'); // Equipe 2

var equipe_2 = document.querySelector('.equipe_2');
var jog_1_eq2 = document.querySelector('.jog_1_eq2');
var jog_2_eq2 = document.querySelector('.jog_2_eq2');
var jog_3_eq2 = document.querySelector('.jog_3_eq2');
var jog_4_eq2 = document.querySelector('.jog_4_eq2'); // Equipe 3

var equipe_3 = document.querySelector('.equipe_3');
var jog_1_eq3 = document.querySelector('.jog_1_eq3');
var jog_2_eq3 = document.querySelector('.jog_2_eq3');
var jog_3_eq3 = document.querySelector('.jog_3_eq3');
var jog_4_eq3 = document.querySelector('.jog_4_eq3'); // Equipe 4

var equipe_4 = document.querySelector('.equipe_4');
var jog_1_eq4 = document.querySelector('.jog_1_eq4');
var jog_2_eq4 = document.querySelector('.jog_2_eq4');
var jog_3_eq4 = document.querySelector('.jog_3_eq4');
var jog_4_eq4 = document.querySelector('.jog_4_eq4'); // Pontos minha equipe

var pontosMinhaEq = document.querySelector('.pontos_meq');
var pontos = '';

function config_eqps() {
  return _config_eqps.apply(this, arguments);
}

function _config_eqps() {
  _config_eqps = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var clique_botao, qual_botao, escolheu_equipe, id_jog, jog, jog_data, isLider, botao_j2, _yield$axios, data, tamanho, minimo, nums, random, id_eq1, jogs1, data_jog1, id_eq2, jogs2, data_jog2, id_eq3, jogs3, data_jog3, id_eq4, jogs4, data_jog4, id_minha, jogsM, data_meq;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // Validações 
            clique_botao = false;
            qual_botao = '';
            escolheu_equipe = false; // Jogador

            id_jog = 'lm35';
            _context.next = 6;
            return axios("http://localhost:3000/jogadores/".concat(id_jog));

          case 6:
            jog = _context.sent;
            jog_data = jog.data;
            isLider = jog_data.lider;
            botao_j2 = document.querySelector('.botao_passar');
            setTimeout(function () {
              botao_j2.addEventListener('click', function () {
                if (isLider) {
                  pontos = parseInt(pontosMinhaEq.getAttribute('value'));

                  if (pontos > 75) {
                    pontos -= 75;

                    if (clique_botao === false) {
                      equipe_1.setAttribute('class', 'cor_red');
                      equipe_2.setAttribute('class', 'cor_red');
                      equipe_3.setAttribute('class', 'cor_red');
                      equipe_4.setAttribute('class', 'cor_red');
                      qual_botao = 'Passar'; // console.log('Clicou 2');

                      clique_botao = true;
                      instrucoes.textContent = 'Escolha a equipe que vai jogar!';
                      stop_ler();
                      start_clique();
                    } else {
                      alert('Você já clicou!');
                    }
                  }
                } else {
                  alert('Você não é líder, somente o líder pode clicar!');
                }
              });
            }, 5000);
            _context.next = 13;
            return axios('http://localhost:3000/equipe');

          case 13:
            _yield$axios = _context.sent;
            data = _yield$axios.data;
            // console.log(data);
            tamanho = data.length; // console.log(tamanho);

            minimo = 0;
            nums = [];

          case 18:
            if (!(nums.length < 4)) {
              _context.next = 25;
              break;
            }

            _context.next = 21;
            return Math.floor(Math.random() * (tamanho - minimo) + minimo);

          case 21:
            random = _context.sent;

            if (data[random].id_equipe !== 'Eq-ps') {
              if (nums.indexOf(random) === -1) {
                // console.log(data[random].id_equipe);
                nums.push(random);
              }
            }

            _context.next = 18;
            break;

          case 25:
            // equipe 1
            equipe_1.textContent = data[nums[0]].id_equipe;
            id_eq1 = data[nums[0]].id_equipe;
            _context.next = 29;
            return axios("http://localhost:3000/jogadoresid/".concat(id_eq1));

          case 29:
            jogs1 = _context.sent;
            data_jog1 = jogs1.data;
            jog_1_eq1.textContent = data_jog1[0].nome;
            jog_2_eq1.textContent = data_jog1[1].nome;
            jog_3_eq1.textContent = data_jog1[2].nome;
            jog_4_eq1.textContent = data_jog1[3].nome; // Equipe 2

            equipe_2.textContent = data[nums[1]].id_equipe;
            id_eq2 = data[nums[1]].id_equipe;
            _context.next = 39;
            return axios("http://localhost:3000/jogadoresid/".concat(id_eq2));

          case 39:
            jogs2 = _context.sent;
            data_jog2 = jogs2.data;
            jog_1_eq2.textContent = data_jog2[0].nome;
            jog_2_eq2.textContent = data_jog2[1].nome;
            jog_3_eq2.textContent = data_jog2[2].nome;
            jog_4_eq2.textContent = data_jog2[3].nome; // Equipe 3

            equipe_3.textContent = data[nums[2]].id_equipe;
            id_eq3 = data[nums[2]].id_equipe;
            _context.next = 49;
            return axios("http://localhost:3000/jogadoresid/".concat(id_eq3));

          case 49:
            jogs3 = _context.sent;
            data_jog3 = jogs3.data;
            jog_1_eq3.textContent = data_jog3[0].nome;
            jog_2_eq3.textContent = data_jog3[1].nome;
            jog_3_eq3.textContent = data_jog3[2].nome;
            jog_4_eq3.textContent = data_jog3[3].nome; // Equipe 4 

            equipe_4.textContent = data[nums[3]].id_equipe;
            id_eq4 = data[nums[3]].id_equipe;
            _context.next = 59;
            return axios("http://localhost:3000/jogadoresid/".concat(id_eq4));

          case 59:
            jogs4 = _context.sent;
            data_jog4 = jogs4.data;
            jog_1_eq4.textContent = data_jog4[0].nome;
            jog_2_eq4.textContent = data_jog4[1].nome;
            jog_3_eq4.textContent = data_jog4[2].nome;
            jog_4_eq4.textContent = data_jog4[3].nome; // Minha equipe

            id_minha = 'Eq-ps';
            _context.next = 68;
            return axios("http://localhost:3000/jogadoresid/".concat(id_minha));

          case 68:
            jogsM = _context.sent;
            data_meq = jogsM.data; // console.log(data_meq);

            jog_1_meq.textContent = data_meq[0].nome;
            jog_2_meq.textContent = data_meq[1].nome;
            jog_3_meq.textContent = data_meq[2].nome;
            jog_4_meq.textContent = data_meq[3].nome;
            click_equipe_1.addEventListener('click', function () {
              if (qual_botao === 'Passar' && escolheu_equipe === false) {
                escolheu_equipe = true; // console.log('Clique equipe 1');

                instrucoes.textContent = id_eq1 + ' joga!';
                equipe_1.classList.remove('cor_red');
                equipe_2.classList.remove('cor_red');
                equipe_3.classList.remove('cor_red');
                equipe_4.classList.remove('cor_red');
                stop();
                setTimeout(function () {
                  clique_botao = false;
                  escolheu_equipe = false;
                  qual_botao = '';
                }, 2500);
              } else {
                alert('Você não pode clicar aqui!');
              }
            });
            click_equipe_2.addEventListener('click', function () {
              if (qual_botao === 'Passar' && escolheu_equipe === false) {
                escolheu_equipe = true; // console.log('Clique equipe 2');

                instrucoes.textContent = id_eq2 + ' joga!';
                equipe_1.classList.remove('cor_red');
                equipe_2.classList.remove('cor_red');
                equipe_3.classList.remove('cor_red');
                equipe_4.classList.remove('cor_red');
                stop();
                setTimeout(function () {
                  clique_botao = false;
                  escolheu_equipe = false;
                  qual_botao = '';
                }, 2500);
              } else {
                alert('Você não pode clicar aqui!');
              }
            });
            click_equipe_3.addEventListener('click', function () {
              if (qual_botao === 'Passar' && escolheu_equipe === false) {
                escolheu_equipe = true; // console.log('Clique equipe 3');

                instrucoes.textContent = id_eq3 + ' joga!';
                equipe_1.classList.remove('cor_red');
                equipe_2.classList.remove('cor_red');
                equipe_3.classList.remove('cor_red');
                equipe_4.classList.remove('cor_red');
                stop();
                setTimeout(function () {
                  clique_botao = false;
                  escolheu_equipe = false;
                  qual_botao = '';
                }, 2500);
              } else {
                alert('Você não pode clicar aqui!');
              }
            });
            click_equipe_4.addEventListener('click', function () {
              if (qual_botao === 'Passar' && escolheu_equipe === false) {
                escolheu_equipe = true; // console.log('Clique equipe 4');

                instrucoes.textContent = id_eq4 + ' joga!';
                equipe_1.classList.remove('cor_red');
                equipe_2.classList.remove('cor_red');
                equipe_3.classList.remove('cor_red');
                equipe_4.classList.remove('cor_red');
                stop();
                setTimeout(function () {
                  clique_botao = false;
                  escolheu_equipe = false;
                  qual_botao = '';
                }, 2500);
              } else {
                alert('Você não pode clicar aqui!');
              }
            });

          case 78:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _config_eqps.apply(this, arguments);
}

;
module.exports = config_eqps;

/***/ }),

/***/ "./src/modules/questoes.js":
/*!*********************************!*\
  !*** ./src/modules/questoes.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");

var _require = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js"),
    async = _require.async;

var _require2 = __webpack_require__(/*! ./timer */ "./src/modules/timer.js"),
    start_clique = _require2.start_clique,
    stop = _require2.stop,
    start_ler = _require2.start_ler,
    stop_ler = _require2.stop_ler; // Só para exemplo;
// Click Equipe


var click_equipe_1 = document.querySelector('.click_eq_1');
var click_equipe_2 = document.querySelector('.click_eq_2');
var click_equipe_3 = document.querySelector('.click_eq_3');
var click_equipe_4 = document.querySelector('.click_eq_4'); // Só para exemplo;
// Total de perguntas

var total = document.querySelector('#total'); // Aviso

var aviso = document.querySelector('#aviso'); // Opcoes de tela

var contador = document.querySelector('.contador');
var centro = document.querySelector('.centro');
var questoesHTML = document.querySelector('.questoes');
var quiz = document.querySelector('.quiz');
var box_equipe = document.querySelector('.box_equipes');
var minhaEqui = document.querySelector('.equipe_botao'); // Minha equipe

var pontosMinhaEq = document.querySelector('.pontos_meq');
var pontos = 0;
pontosMinhaEq.setAttribute('value', pontos);
pontosMinhaEq.textContent = pontos; // PERGUNTA

var numQuestao = document.querySelector('#numQuestao');
var pergunta = document.querySelector('#pergunta');
var numero = document.querySelector('#numero'); // ALTERNATIVAS

var a = document.querySelector('#a');
var b = document.querySelector('#b');
var c = document.querySelector('#c');
var d = document.querySelector('#d'); // configura respostas

var respostaA = document.querySelector('.respostaA');
var respostaB = document.querySelector('.respostaB');
var respostaC = document.querySelector('.respostaC');
var respostaD = document.querySelector('.respostaD'); // Instruções

var instrucoes = document.querySelector('#instrucoes'); // // Configurações de botões
// Botões

var botao_j1 = document.querySelector('.botao_responder');

function configQuestoes() {
  return _configQuestoes.apply(this, arguments);
}

function _configQuestoes() {
  _configQuestoes = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var clique_botao, qual_botao, jaClicouPraJogar, clicouPrajogar, cont_questoes, _yield$axios, data, totalDeQuestoes, id_jog, jog, jog_data, nome_jog, isLider, chamaAcertou, verificarSeAcertou, proximaQuestao, fimDoJogo, botao_j2, clicou_passar;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fimDoJogo = function _fimDoJogo() {
              instrucoes.textContent = "Fim de Jogo!";
              numQuestao.textContent = "";
              pergunta.textContent = "";
              quiz.textContent = "";
              contador.remove('contador');
              centro.remove('centro');
              questoesHTML.remove('questoes');
              minhaEqui.remove('.equipe_botao');
              box_equipe.remove('.box_equipes');
              var avisoFinal = "\n            Parab\xE9ns \n\n            Voc\xEA conseguiu ".concat(pontos, " pontos\n        ");
              aviso.textContent = avisoFinal;
              a.textContent = "";
              b.textContent = "";
              c.textContent = "";
              d.textContent = "";
              a.setAttribute('value', '0');
              b.setAttribute('value', '0');
              c.setAttribute('value', '0');
              d.setAttribute('value', '0'); // Faz com que a página recarregue

              setTimeout(function () {
                location.reload();
              }, 500); // 10000
            };

            proximaQuestao = function _proximaQuestao(nQuestao) {
              // configura timer
              start_ler(); // 

              qual_botao = ''; // Abilita o clicou para jogar

              clicouPrajogar = false; // ja cliclou

              jaClicouPraJogar = false; // coloca o número

              numero.textContent = nQuestao + 1; // console.log(nQuestao);
              // Coloca o número da questão em azul

              numQuestao.textContent = nQuestao + 1; // Coloca o parametro da questão

              pergunta.textContent = data[nQuestao].pergunta; // Coloca o texto das alternativas

              a.textContent = data[nQuestao].alternativa_a;
              b.textContent = data[nQuestao].alternativa_b;
              c.textContent = data[nQuestao].alternativa_c;
              d.textContent = data[nQuestao].alternativa_d;
              correta = data[nQuestao].correta; // Configura o value da questão

              a.setAttribute('value', nQuestao + 'A');
              b.setAttribute('value', nQuestao + 'B');
              c.setAttribute('value', nQuestao + 'C');
              d.setAttribute('value', nQuestao + 'D'); // console.log('a value' +  a.value);
            };

            verificarSeAcertou = function _verificarSeAcertou(resposta) {
              if (clicouPrajogar === true) {
                // console.log('verifica acertou = true');
                jaClicouPraJogar = true; // let numeroDaQuestao = nQuestao.value;
                // console.log("Questão " + numeroDaQuestao);
                // Pega resposta escolhida

                var respostaEscolhida = resposta.textContent; // console.log('resposta = ' + respostaEscolhida);
                // Pega resposta certa

                var certa = data[cont_questoes].correta; // console.log('certa = ' + certa);

                if (respostaEscolhida == certa) {
                  instrucoes.textContent = 'Acertou! Parabéns!';
                  pontos += 100;
                  pontosMinhaEq.setAttribute('value', pontos);
                  pontosMinhaEq.textContent = pontos;
                  setTimeout(function () {
                    instrucoes.textContent = "Leia a quest\xE3o e clique na resposta correta";
                  }, 5000);
                } else {
                  instrucoes.textContent = 'Errou, preste mais atenção!';
                  setTimeout(function () {
                    instrucoes.textContent = "Leia a quest\xE3o e clique na resposta correta";
                  }, 5000);
                }

                ;
                setTimeout(function () {
                  cont_questoes++;

                  if (cont_questoes === totalDeQuestoes) {
                    // console.log('Fim do Jogo!');
                    fimDoJogo();
                  } else {
                    clicouPrajogar = false;
                    proximaQuestao(cont_questoes);
                  }

                  ;
                }, 5000);
              } else {
                alert('Calma!!, quem clicar primeiro joga!');
              }

              ;
            };

            chamaAcertou = function _chamaAcertou(resposta) {
              if (jaClicouPraJogar === false) {
                // console.log('Chama acertou');
                verificarSeAcertou(resposta);
              } else {
                alert('Você não pode clicar de novo!');
              }

              ;
            };

            // let clicouPrajogar = false;
            clique_botao = false;
            qual_botao = ''; // Configurações de cliques

            jaClicouPraJogar = false;
            clicouPrajogar = false;
            start_ler();
            cont_questoes = 0;
            _context.next = 12;
            return axios('http://localhost:3000/questoes/1');

          case 12:
            _yield$axios = _context.sent;
            data = _yield$axios.data;
            // console.log(data);
            totalDeQuestoes = data.length; // console.log('Total de questões = ' + totalDeQuestoes);

            total.textContent = data.length;
            numero.textContent = cont_questoes + 1;
            numQuestao.textContent = cont_questoes + 1;
            pergunta.textContent = data[cont_questoes].pergunta;
            a.textContent = data[cont_questoes].alternativa_a;
            b.textContent = data[cont_questoes].alternativa_b;
            c.textContent = data[cont_questoes].alternativa_c;
            d.textContent = data[cont_questoes].alternativa_d;
            a.setAttribute('value', cont_questoes + 'A');
            b.setAttribute('value', cont_questoes + 'B');
            c.setAttribute('value', cont_questoes + 'C');
            d.setAttribute('value', cont_questoes + 'D'); // Jogador

            id_jog = 'lm35';
            _context.next = 30;
            return axios("http://localhost:3000/jogadores/".concat(id_jog));

          case 30:
            jog = _context.sent;
            jog_data = jog.data;
            nome_jog = jog_data.nome;
            isLider = jog_data.lider;
            botao_j1.addEventListener('click', function () {
              if (isLider) {
                if (clique_botao === false) {
                  qual_botao = 'Jogar'; // console.log('Clicou');

                  clique_botao = true;
                  instrucoes.textContent = 'Você joga!';
                  stop_ler();
                  start_clique();
                } else {
                  alert('Você já clicou!');
                }
              } else {
                alert('Você não é líder, somente o líder pode clicar!');
              }
            });
            respostaA.addEventListener('click', function () {
              if (qual_botao === 'Jogar') {
                clique_botao = false;
                stop(); // pause();

                var resposta = a;
                clicouPrajogar = true;
                chamaAcertou(resposta);
              } else {
                alert('Você não pode clicar aqui!');
              }

              ;
            });
            respostaB.addEventListener('click', function () {
              if (qual_botao === 'Jogar') {
                clique_botao = false;
                stop();
                var resposta = b;
                clicouPrajogar = true;
                chamaAcertou(resposta);
              } else {
                alert('Você não pode clicar aqui!');
              }

              ;
            });
            respostaC.addEventListener('click', function () {
              if (qual_botao === 'Jogar') {
                clique_botao = false;
                stop();
                var resposta = c;
                clicouPrajogar = true;
                chamaAcertou(resposta);
              } else {
                alert('Você não pode clicar aqui!');
              }

              ;
            });
            respostaD.addEventListener('click', function () {
              if (qual_botao === 'Jogar') {
                clique_botao = false;
                stop();
                var resposta = d;
                clicouPrajogar = true;
                chamaAcertou(resposta);
              } else {
                alert('Você não pode clicar aqui!');
              }

              ;
            }); // Chama acertou;

            ; // // Verifica se acertou;

            ; // Proxima questão

            ; // Fim de jogo

            ;
            botao_j2 = document.querySelector('.botao_passar');
            clicou_passar = false;
            botao_j2.addEventListener('click', function () {
              if (isLider) {
                pontos = parseInt(pontosMinhaEq.getAttribute('value'));

                if (pontos > 75) {
                  clicou_passar = true;
                  pontos -= 75;
                  pontosMinhaEq.setAttribute('value', pontos);
                  pontosMinhaEq.textContent = pontos;
                } else {
                  alert('Você não tem pontos suficiente!');
                }
              } else {
                alert('Você não é líder, somente o líder pode clicar!');
              }
            });
            click_equipe_1.addEventListener('click', function () {
              if (clicou_passar === true) {
                clicou_passar = false;
                setTimeout(function () {
                  cont_questoes++;
                  instrucoes.textContent = "Leia a quest\xE3o e clique na resposta correta";
                  proximaQuestao(cont_questoes);
                }, 2500);
              } else {
                alert('Você tem que clicar pra passar!');
              }
            });
            click_equipe_2.addEventListener('click', function () {
              if (clicou_passar === true) {
                setTimeout(function () {
                  cont_questoes++;
                  instrucoes.textContent = "Leia a quest\xE3o e clique na resposta correta";
                  proximaQuestao(cont_questoes);
                  clicou_passar = false;
                }, 2500);
              } else {
                alert('Você tem que clicar pra passar!');
              }
            });
            click_equipe_3.addEventListener('click', function () {
              if (clicou_passar === true) {
                setTimeout(function () {
                  cont_questoes++;
                  instrucoes.textContent = "Leia a quest\xE3o e clique na resposta correta";
                  proximaQuestao(cont_questoes);
                  clicou_passar = false;
                }, 2500);
              } else {
                alert('Você tem que clicar pra passar!');
              }
            });
            click_equipe_4.addEventListener('click', function () {
              if (clicou_passar === true) {
                setTimeout(function () {
                  cont_questoes++;
                  instrucoes.textContent = "Leia a quest\xE3o e clique na resposta correta";
                  proximaQuestao(cont_questoes);
                  clicou_passar = false;
                }, 2500);
              } else {
                alert('Você tem que clicar pra passar!');
              }
            });

          case 50:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _configQuestoes.apply(this, arguments);
}

module.exports = configQuestoes;

/***/ }),

/***/ "./src/modules/timer.js":
/*!******************************!*\
  !*** ./src/modules/timer.js ***!
  \******************************/
/***/ ((module) => {

var time_sec = document.querySelector('#time_sec');
var ss = '';
var tempo = 1000;
var cron;
var cron_ler;
var cron_ini;
var format = "".concat(ss);

function start_clique() {
  ss = 15;
  format = "".concat(ss);
  time_sec.textContent = format;
  cron = setInterval(function () {
    timer();
  }, tempo);
}

function stop() {
  clearInterval(cron);
  ss = '--';
  format = "".concat(ss);
  time_sec.textContent = format;
}

function timer() {
  ss--;

  if (ss === 0) {
    stop(); // console.log('Acabou!');
  }

  ;

  if (ss > 10) {
    format = "".concat(ss);
  } else {
    format = "0".concat(ss);
  }

  time_sec.textContent = format;
}

function start_ler() {
  ss = 10;
  format = "".concat(ss);
  time_sec.textContent = format;
  cron_ler = setInterval(function () {
    timer_ler();
  }, tempo);
}

function stop_ler() {
  clearInterval(cron_ler);
}

function timer_ler() {
  ss--;

  if (ss === 0) {
    stop_ler(); // console.log('Acabou!');
  }

  ;

  if (ss > 10) {
    format = "".concat(ss);
  } else {
    format = "0".concat(ss);
  }

  time_sec.textContent = format;
}

function start_ini() {
  ss = 5;
  format = "0".concat(ss);
  time_sec.textContent = format;
  cron_ini = setInterval(function () {
    timer_ini();
  }, tempo);
}

function stop_ini() {
  clearInterval(cron_ini);
}

function timer_ini() {
  ss--;

  if (ss === 0) {
    stop_ler(); // console.log('Acabou!');
  }

  ;

  if (ss > 10) {
    format = "".concat(ss);
  } else {
    format = "0".concat(ss);
  }

  time_sec.textContent = format;
}

module.exports = {
  start_clique: start_clique,
  stop: stop,
  start_ler: start_ler,
  stop_ler: stop_ler,
  start_ini: start_ini,
  stop_ini: stop_ini
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/assets/css/chat.css":
/*!***********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/assets/css/chat.css ***!
  \***********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".chat-bar-collapsible {\r\n    position: fixed;\r\n    bottom: 0;\r\n    left: 50px;\r\n    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);\r\n}\r\n\r\n.collapsible {\r\n    background-color: #194cbb;\r\n    color: white;\r\n    cursor: pointer;\r\n    padding: 12px;\r\n    width: 350px;\r\n    text-align: center;\r\n    outline: none;\r\n    font-size: 25px;\r\n    border-radius: 10px 10px 0px 0px;\r\n    border: 3px solid #03ff9e;\r\n    border-bottom: none;\r\n}\r\n\r\n.content {\r\n    max-height: 0;\r\n    overflow: hidden;\r\n    transition: max-height 0.2s ease-out;\r\n    background-color: #f1f1f1;\r\n}\r\n\r\n.full-chat-block {\r\n    width: 350px;\r\n    background: white;\r\n    text-align: center;\r\n    overflow: auto;\r\n    scrollbar-width: none;\r\n    height: max-content;\r\n    transition: max-height 0.2s ease-out;\r\n}\r\n\r\n.outer-container {\r\n    min-height: 500px;\r\n    bottom: 0%;\r\n    position: relative;\r\n}\r\n\r\n.chat-container {\r\n    max-height: 500px;\r\n    width: 100%;\r\n    position: absolute;\r\n    bottom: 0;\r\n    left: 0;\r\n    scroll-behavior: smooth;\r\n    hyphens: auto;\r\n}\r\n\r\n.chat-container::-webkit-scrollbar {\r\n    display: none;\r\n}\r\n\r\n.chat-bar-input-block {\r\n    display: flex;\r\n    float: left;\r\n    box-sizing: border-box;\r\n    justify-content: space-between;\r\n    width: 100%;\r\n    align-items: center;\r\n    background-color: rgb(235, 235, 235);\r\n    border-radius: 10px 10px 0px 0px;\r\n    padding: 10px 0px 10px 10px;\r\n}\r\n\r\n.chat-bar-icons {\r\n    display: flex;\r\n    justify-content: space-evenly;\r\n    box-sizing: border-box;\r\n    width: 25%;\r\n    float: right;\r\n    font-size: 20px;\r\n}\r\n\r\n#chat-icon:hover {\r\n    opacity: .7;\r\n}\r\n\r\n/* Chat bubbles */\r\n\r\n#userInput {\r\n    width: 200%;\r\n}\r\n\r\n.input-box {\r\n    float: left;\r\n    border: none;\r\n    box-sizing: border-box;\r\n    width: 100%;\r\n    border-radius: 10px;\r\n    padding: 10px;\r\n    font-size: 20px;\r\n    color: #000;\r\n    background-color: white;\r\n    outline: none\r\n}\r\n\r\n.userText {\r\n    color: white;\r\n    font-family: Helvetica;\r\n    font-size: 16px;\r\n    font-weight: normal;\r\n    text-align: left;\r\n    clear: both;\r\n}\r\n\r\n.userText span {\r\n    font-size: 20px;\r\n    line-height: 1.5em;\r\n    display: inline-block;\r\n    padding: 10px;\r\n    border-radius: 8px;\r\n    border-bottom-left-radius: 2px;\r\n    max-width: 80%;\r\n    margin-left: 10px;\r\n    margin-bottom: 10px;\r\n    animation: floatup .5s forwards\r\n}\r\n\r\n.texto {\r\n    background: #3d98ff;\r\n    \r\n}\r\n\r\n.isLider {\r\n    color: black;\r\n    background: goldenrod;\r\n}\r\n\r\n.nomeJog {\r\n    background: #002efd;\r\n\r\n}\r\n\r\n@keyframes floatup {\r\n    from {\r\n        transform: translateY(14px);\r\n        opacity: .0;\r\n    }\r\n    to {\r\n        transform: translateY(0px);\r\n        opacity: 1;\r\n    }\r\n}\r\n\r\n@media screen and (max-width:600px) {\r\n    .full-chat-block {\r\n        width: 100%;\r\n        border-radius: 0px;\r\n        \r\n    }\r\n    .chat-bar-collapsible {\r\n        position: fixed;\r\n        bottom: 0;\r\n        right: 0;\r\n        width: 100%;\r\n        border-radius: 10px;\r\n    }\r\n    .collapsible {\r\n        width: 100%;\r\n        border: 0px;\r\n        border-top: 3px solid white;\r\n        border-radius: 0px;\r\n    }\r\n    \r\n}", "",{"version":3,"sources":["webpack://./src/assets/css/chat.css"],"names":[],"mappings":"AAAA;IACI,eAAe;IACf,SAAS;IACT,UAAU;IACV,2CAA2C;AAC/C;;AAEA;IACI,yBAAyB;IACzB,YAAY;IACZ,eAAe;IACf,aAAa;IACb,YAAY;IACZ,kBAAkB;IAClB,aAAa;IACb,eAAe;IACf,gCAAgC;IAChC,yBAAyB;IACzB,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,gBAAgB;IAChB,oCAAoC;IACpC,yBAAyB;AAC7B;;AAEA;IACI,YAAY;IACZ,iBAAiB;IACjB,kBAAkB;IAClB,cAAc;IACd,qBAAqB;IACrB,mBAAmB;IACnB,oCAAoC;AACxC;;AAEA;IACI,iBAAiB;IACjB,UAAU;IACV,kBAAkB;AACtB;;AAEA;IACI,iBAAiB;IACjB,WAAW;IACX,kBAAkB;IAClB,SAAS;IACT,OAAO;IACP,uBAAuB;IACvB,aAAa;AACjB;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,aAAa;IACb,WAAW;IACX,sBAAsB;IACtB,8BAA8B;IAC9B,WAAW;IACX,mBAAmB;IACnB,oCAAoC;IACpC,gCAAgC;IAChC,2BAA2B;AAC/B;;AAEA;IACI,aAAa;IACb,6BAA6B;IAC7B,sBAAsB;IACtB,UAAU;IACV,YAAY;IACZ,eAAe;AACnB;;AAEA;IACI,WAAW;AACf;;AAEA,iBAAiB;;AAEjB;IACI,WAAW;AACf;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,sBAAsB;IACtB,WAAW;IACX,mBAAmB;IACnB,aAAa;IACb,eAAe;IACf,WAAW;IACX,uBAAuB;IACvB;AACJ;;AAEA;IACI,YAAY;IACZ,sBAAsB;IACtB,eAAe;IACf,mBAAmB;IACnB,gBAAgB;IAChB,WAAW;AACf;;AAEA;IACI,eAAe;IACf,kBAAkB;IAClB,qBAAqB;IACrB,aAAa;IACb,kBAAkB;IAClB,8BAA8B;IAC9B,cAAc;IACd,iBAAiB;IACjB,mBAAmB;IACnB;AACJ;;AAEA;IACI,mBAAmB;;AAEvB;;AAEA;IACI,YAAY;IACZ,qBAAqB;AACzB;;AAEA;IACI,mBAAmB;;AAEvB;;AAEA;IACI;QACI,2BAA2B;QAC3B,WAAW;IACf;IACA;QACI,0BAA0B;QAC1B,UAAU;IACd;AACJ;;AAEA;IACI;QACI,WAAW;QACX,kBAAkB;;IAEtB;IACA;QACI,eAAe;QACf,SAAS;QACT,QAAQ;QACR,WAAW;QACX,mBAAmB;IACvB;IACA;QACI,WAAW;QACX,WAAW;QACX,2BAA2B;QAC3B,kBAAkB;IACtB;;AAEJ","sourcesContent":[".chat-bar-collapsible {\r\n    position: fixed;\r\n    bottom: 0;\r\n    left: 50px;\r\n    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);\r\n}\r\n\r\n.collapsible {\r\n    background-color: #194cbb;\r\n    color: white;\r\n    cursor: pointer;\r\n    padding: 12px;\r\n    width: 350px;\r\n    text-align: center;\r\n    outline: none;\r\n    font-size: 25px;\r\n    border-radius: 10px 10px 0px 0px;\r\n    border: 3px solid #03ff9e;\r\n    border-bottom: none;\r\n}\r\n\r\n.content {\r\n    max-height: 0;\r\n    overflow: hidden;\r\n    transition: max-height 0.2s ease-out;\r\n    background-color: #f1f1f1;\r\n}\r\n\r\n.full-chat-block {\r\n    width: 350px;\r\n    background: white;\r\n    text-align: center;\r\n    overflow: auto;\r\n    scrollbar-width: none;\r\n    height: max-content;\r\n    transition: max-height 0.2s ease-out;\r\n}\r\n\r\n.outer-container {\r\n    min-height: 500px;\r\n    bottom: 0%;\r\n    position: relative;\r\n}\r\n\r\n.chat-container {\r\n    max-height: 500px;\r\n    width: 100%;\r\n    position: absolute;\r\n    bottom: 0;\r\n    left: 0;\r\n    scroll-behavior: smooth;\r\n    hyphens: auto;\r\n}\r\n\r\n.chat-container::-webkit-scrollbar {\r\n    display: none;\r\n}\r\n\r\n.chat-bar-input-block {\r\n    display: flex;\r\n    float: left;\r\n    box-sizing: border-box;\r\n    justify-content: space-between;\r\n    width: 100%;\r\n    align-items: center;\r\n    background-color: rgb(235, 235, 235);\r\n    border-radius: 10px 10px 0px 0px;\r\n    padding: 10px 0px 10px 10px;\r\n}\r\n\r\n.chat-bar-icons {\r\n    display: flex;\r\n    justify-content: space-evenly;\r\n    box-sizing: border-box;\r\n    width: 25%;\r\n    float: right;\r\n    font-size: 20px;\r\n}\r\n\r\n#chat-icon:hover {\r\n    opacity: .7;\r\n}\r\n\r\n/* Chat bubbles */\r\n\r\n#userInput {\r\n    width: 200%;\r\n}\r\n\r\n.input-box {\r\n    float: left;\r\n    border: none;\r\n    box-sizing: border-box;\r\n    width: 100%;\r\n    border-radius: 10px;\r\n    padding: 10px;\r\n    font-size: 20px;\r\n    color: #000;\r\n    background-color: white;\r\n    outline: none\r\n}\r\n\r\n.userText {\r\n    color: white;\r\n    font-family: Helvetica;\r\n    font-size: 16px;\r\n    font-weight: normal;\r\n    text-align: left;\r\n    clear: both;\r\n}\r\n\r\n.userText span {\r\n    font-size: 20px;\r\n    line-height: 1.5em;\r\n    display: inline-block;\r\n    padding: 10px;\r\n    border-radius: 8px;\r\n    border-bottom-left-radius: 2px;\r\n    max-width: 80%;\r\n    margin-left: 10px;\r\n    margin-bottom: 10px;\r\n    animation: floatup .5s forwards\r\n}\r\n\r\n.texto {\r\n    background: #3d98ff;\r\n    \r\n}\r\n\r\n.isLider {\r\n    color: black;\r\n    background: goldenrod;\r\n}\r\n\r\n.nomeJog {\r\n    background: #002efd;\r\n\r\n}\r\n\r\n@keyframes floatup {\r\n    from {\r\n        transform: translateY(14px);\r\n        opacity: .0;\r\n    }\r\n    to {\r\n        transform: translateY(0px);\r\n        opacity: 1;\r\n    }\r\n}\r\n\r\n@media screen and (max-width:600px) {\r\n    .full-chat-block {\r\n        width: 100%;\r\n        border-radius: 0px;\r\n        \r\n    }\r\n    .chat-bar-collapsible {\r\n        position: fixed;\r\n        bottom: 0;\r\n        right: 0;\r\n        width: 100%;\r\n        border-radius: 10px;\r\n    }\r\n    .collapsible {\r\n        width: 100%;\r\n        border: 0px;\r\n        border-top: 3px solid white;\r\n        border-radius: 0px;\r\n    }\r\n    \r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/assets/css/styles.css":
/*!*************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/assets/css/styles.css ***!
  \*************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root {\r\n\r\n    /*CORES A SEREM ADICIONADAS*/\r\n    --fundo-color: #254b9c;\r\n    --contador-color: #194cbb;\r\n    --equipes-color: #52D0E6;\r\n    --equipePRINC-color: #4EFCE8;\r\n    --respost-color: #4BF2AF;\r\n    --respostMOUSE-color: #3f68c2;\r\n    --contorno-color: #03ff9e;\r\n\r\n\r\n    /*GRADUAÇÃO DE CORES*/\r\n    --gradual-color: linear-gradient(-40deg, #678d87, #106570, #9e4fa8, #007c53);\r\n    --gradualEQUIPE-color: linear-gradient(-40deg,  #00754e, #74357c, #0d7a7e, #0f3291);\r\n    --gradualBOTAO-color: linear-gradient(-40deg,  #61073e, #670774, #151fa1, #074aa1);\r\n\r\n    /*ADICIONAR FONTES PARA TEXTO*/\r\n\r\n}\r\n\r\n* {\r\n    margin: 0;\r\n    padding: 0;\r\n    box-sizing: border-box;\r\n    font-family: 'Roboto', sans-serif;\r\n    font-size: 1.25rem;   \r\n}\r\n\r\nbody {\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n    min-height: 100vh;\r\n    background: var(--gradual-color);\r\n    background-size: 800% 100%;\r\n    animation: colors 20s ease infinite;\r\n    color: #fff;\r\n}\r\n\r\n@keyframes colors {\r\n    0% {\r\n        background-position: 0% 50%;\r\n    }\r\n    25% {\r\n        background-position: 50% 0%;\r\n    }\r\n    50% {\r\n        background-position: 100% 50%;\r\n    }\r\n    75% {\r\n        background-position: 50% 0%;\r\n    }\r\n    100% {\r\n        background-position: 0% 50%;\r\n    }\r\n}\r\n\r\nmain {\r\n    flex-grow: 3;\r\n    display: flex;\r\n    flex-direction: row;\r\n    justify-content: center;\r\n    width: 80%;\r\n    padding: 50px; /* espacamento interno */\r\n}\r\n\r\nsection {\r\n    width: 100%;\r\n    margin: 0 auto;\r\n    height: 700px;\r\n    padding: 1rem;\r\n    margin-bottom: 0.625rem;\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n\r\nh1 {\r\n    position: relative;\r\n    text-align: center;\r\n    font-size: 1.75rem;\r\n    margin: 0.625rem;\r\n}\r\n\r\n.centro {\r\n    text-align: center;\r\n}\r\n\r\n.questao {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n}\r\n\r\n#numQuestao {\r\n    display: block;\r\n    background: #00b0ff;\r\n    padding: 4px 10px 2px 10px;\r\n    border-radius: 50%;\r\n}\r\n\r\n#pergunta {\r\n    margin-left: 1rem;\r\n}\r\n\r\n.questoes {\r\n    display: flex;\r\n    flex-direction: column;\r\n    padding: 10px 5px;\r\n    border: 3px solid var(--contorno-color);\r\n    border-radius: 5px;\r\n    margin-bottom: 20px;\r\n    min-width: 60%;\r\n    max-width: 90%;\r\n    background: var(--fundo-color);\r\n}\r\n\r\n.questoes ol li {\r\n    display: block;\r\n    margin: 1rem;\r\n    padding: 1rem;\r\n    border-radius: 8px;\r\n}\r\n\r\n.questoes ol li:hover {\r\n    background: #00b0ff;\r\n    cursor: pointer;\r\n}\r\n\r\n.bloqueado {\r\n    display: none;\r\n}\r\n\r\n.bloqueado li:hover {\r\n    display: none;\r\n}\r\n\r\n#instrucoes {\r\n    background: rgb(8, 211, 126);\r\n    color: #191919;\r\n    padding: 0.625rem;\r\n    border-radius: 8px;\r\n    display: flex;\r\n    justify-content: center;\r\n    margin-bottom: 1rem;\r\n    animation: piscar .75s infinite alternate;\r\n}\r\n\r\n#aviso {\r\n    color: #600872;\r\n}\r\n\r\n.botao{\r\n    color: whitesmoke;\r\n\r\n    height: 50px;\r\n    margin-top: 5px;\r\n}\r\n\r\n.botao:hover {\r\n    background: #00b0ff;\r\n    cursor: pointer;\r\n}\r\n\r\n.pontos_1, .pontos_2 {\r\n    color:#00b0ff;\r\n    background-color: #ffffff;\r\n    margin-top: 0px;\r\n}\r\n\r\n/* ANIMACAO */\r\n\r\n/* Animar o input */\r\n@keyframes piscar {\r\n    0% {\r\n        filter: drop-shadow(0 0 20px #00b0ff);\r\n        -webkit-filter: drop-shadow(0 0 20px #00b0ff);\r\n        -moz-filter: drop-shadow(0 0 20px #00b0ff);\r\n        -o-filter: drop-shadow(0 0 20px #00b0ff);\r\n        -ms-filter: drop-shadow(0 0 20px #00b0ff);\r\n    }\r\n    100% {\r\n    }\r\n}\r\n\r\n.animar {\r\n    animation: piscar .75s infinite alternate;\r\n}\r\n\r\n.aparecer {\r\n    animation: aparecer .5s infinite alternate;\r\n}\r\n\r\n@keyframes aparecer {\r\n    0% {\r\n        opacity: 0\r\n    }\r\n    100% {\r\n        opacity: 1\r\n    }\r\n}\r\n\r\n.timer {\r\n    display: flex;\r\n    background: var(--contador-color);\r\n    padding: 0.45rem;\r\n    border-radius: 50%;\r\n    margin-bottom: 10px;\r\n}\r\n/* TELA DAS TABELAS */\r\n.box_equipes {\r\n    display: flex;\r\n    flex-direction: column;        \r\n}\r\n/* TELA DA TABELA */\r\n.equipes {\r\n    position: relative;\r\n    top: 22%;\r\n    padding: 25px 28px;\r\n    border: 3px solid var(--contorno-color);\r\n    border-radius: 5px;\r\n    right: 30px;\r\n    max-width: 100%;\r\n    background: var(--gradualEQUIPE-color);\r\n    background-size: 800% 100%;\r\n    animation: colors 15s ease infinite;\r\n}\r\n\r\n@keyframes colors {\r\n    0% {\r\n        background-position: 0% 50%;\r\n    }\r\n    25% {\r\n        background-position: 50% 0%;\r\n    }\r\n    50% {\r\n        background-position: 100% 50%;\r\n    }\r\n    75% {\r\n        background-position: 50% 0%;\r\n    }\r\n    100% {\r\n        background-position: 0% 50%;\r\n    }\r\n}\r\n\r\n.tabelas {\r\n    text-align: center;\r\n}\r\n/* TELA DO USUARIO COM SUA EQUIPE/BOTAO  */\r\n.equipe_botao {\r\n    position: relative;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-self: flex-start;\r\n    top: 30%;\r\n    left: 15%;\r\n    text-align: center;\r\n}\r\n/* TELA DO USUARIO COM SUA EQUIPE  */\r\n.box_Tela-Usuario {\r\n    position: relative;\r\n    display: flex;\r\n    flex-direction: column;\r\n    padding: 5px 10px;\r\n    border: 2px solid var(--contorno-color);\r\n    border-radius: 10rem;\r\n    background: var(--gradualEQUIPE-color);\r\n    background-size: 800% 100%;\r\n    animation: colors 12s ease infinite;\r\n}\r\n\r\n@keyframes colors {\r\n    0% {\r\n        background-position: 0% 50%;\r\n    }\r\n    25% {\r\n        background-position: 50% 0%;\r\n    }\r\n    50% {\r\n        background-position: 100% 50%;\r\n    }\r\n    75% {\r\n        background-position: 50% 0%;\r\n    }\r\n    100% {\r\n        background-position: 0% 50%;\r\n    }\r\n}\r\n/* botao*/\r\n.players {\r\n    position: relative;\r\n    display: flex;\r\n    flex-direction: row;\r\n}\r\n.jogador2 {\r\n    margin-left: 30%;\r\n    \r\n}\r\n\r\n.botao {\r\n    border-radius: 10rem;\r\n    padding: 10px;\r\n    border: 2px solid var(--contorno-color);\r\n    background: var(--gradualBOTAO-color);\r\n    background-size: 800% 100%;\r\n    animation: colors 7s ease infinite;\r\n}\r\n\r\n@keyframes colors {\r\n    0% {\r\n        background-position: 0% 50%;\r\n    }\r\n    25% {\r\n        background-position: 50% 0%;\r\n    }\r\n    50% {\r\n        background-position: 100% 50%;\r\n    }\r\n    75% {\r\n        background-position: 50% 0%;\r\n    }\r\n    100% {\r\n        background-position: 0% 50%;\r\n    }\r\n}\r\n\r\n\r\n.jog_equipe {\r\n    padding-left: 15px;\r\n    padding-right: 5px;\r\n}\r\n\r\n/*  */\r\n\r\n.cor_red:hover {\r\n    background: #00b0ff;\r\n    cursor: pointer;\r\n}", "",{"version":3,"sources":["webpack://./src/assets/css/styles.css"],"names":[],"mappings":"AAEA;;IAEI,4BAA4B;IAC5B,sBAAsB;IACtB,yBAAyB;IACzB,wBAAwB;IACxB,4BAA4B;IAC5B,wBAAwB;IACxB,6BAA6B;IAC7B,yBAAyB;;;IAGzB,qBAAqB;IACrB,4EAA4E;IAC5E,mFAAmF;IACnF,kFAAkF;;IAElF,8BAA8B;;AAElC;;AAEA;IACI,SAAS;IACT,UAAU;IACV,sBAAsB;IACtB,iCAAiC;IACjC,kBAAkB;AACtB;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,uBAAuB;IACvB,mBAAmB;IACnB,iBAAiB;IACjB,gCAAgC;IAChC,0BAA0B;IAC1B,mCAAmC;IACnC,WAAW;AACf;;AAEA;IACI;QACI,2BAA2B;IAC/B;IACA;QACI,2BAA2B;IAC/B;IACA;QACI,6BAA6B;IACjC;IACA;QACI,2BAA2B;IAC/B;IACA;QACI,2BAA2B;IAC/B;AACJ;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,mBAAmB;IACnB,uBAAuB;IACvB,UAAU;IACV,aAAa,EAAE,wBAAwB;AAC3C;;AAEA;IACI,WAAW;IACX,cAAc;IACd,aAAa;IACb,aAAa;IACb,uBAAuB;IACvB,aAAa;IACb,sBAAsB;IACtB,uBAAuB;IACvB,mBAAmB;AACvB;;AAEA;IACI,kBAAkB;IAClB,kBAAkB;IAClB,kBAAkB;IAClB,gBAAgB;AACpB;;AAEA;IACI,kBAAkB;AACtB;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,8BAA8B;AAClC;;AAEA;IACI,cAAc;IACd,mBAAmB;IACnB,0BAA0B;IAC1B,kBAAkB;AACtB;;AAEA;IACI,iBAAiB;AACrB;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,iBAAiB;IACjB,uCAAuC;IACvC,kBAAkB;IAClB,mBAAmB;IACnB,cAAc;IACd,cAAc;IACd,8BAA8B;AAClC;;AAEA;IACI,cAAc;IACd,YAAY;IACZ,aAAa;IACb,kBAAkB;AACtB;;AAEA;IACI,mBAAmB;IACnB,eAAe;AACnB;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,4BAA4B;IAC5B,cAAc;IACd,iBAAiB;IACjB,kBAAkB;IAClB,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,yCAAyC;AAC7C;;AAEA;IACI,cAAc;AAClB;;AAEA;IACI,iBAAiB;;IAEjB,YAAY;IACZ,eAAe;AACnB;;AAEA;IACI,mBAAmB;IACnB,eAAe;AACnB;;AAEA;IACI,aAAa;IACb,yBAAyB;IACzB,eAAe;AACnB;;AAEA,aAAa;;AAEb,mBAAmB;AACnB;IACI;QACI,qCAAqC;QACrC,6CAA6C;QAC7C,0CAA0C;QAC1C,wCAAwC;QACxC,yCAAyC;IAC7C;IACA;IACA;AACJ;;AAEA;IACI,yCAAyC;AAC7C;;AAEA;IACI,0CAA0C;AAC9C;;AAEA;IACI;QACI;IACJ;IACA;QACI;IACJ;AACJ;;AAEA;IACI,aAAa;IACb,iCAAiC;IACjC,gBAAgB;IAChB,kBAAkB;IAClB,mBAAmB;AACvB;AACA,qBAAqB;AACrB;IACI,aAAa;IACb,sBAAsB;AAC1B;AACA,mBAAmB;AACnB;IACI,kBAAkB;IAClB,QAAQ;IACR,kBAAkB;IAClB,uCAAuC;IACvC,kBAAkB;IAClB,WAAW;IACX,eAAe;IACf,sCAAsC;IACtC,0BAA0B;IAC1B,mCAAmC;AACvC;;AAEA;IACI;QACI,2BAA2B;IAC/B;IACA;QACI,2BAA2B;IAC/B;IACA;QACI,6BAA6B;IACjC;IACA;QACI,2BAA2B;IAC/B;IACA;QACI,2BAA2B;IAC/B;AACJ;;AAEA;IACI,kBAAkB;AACtB;AACA,0CAA0C;AAC1C;IACI,kBAAkB;IAClB,aAAa;IACb,sBAAsB;IACtB,sBAAsB;IACtB,QAAQ;IACR,SAAS;IACT,kBAAkB;AACtB;AACA,oCAAoC;AACpC;IACI,kBAAkB;IAClB,aAAa;IACb,sBAAsB;IACtB,iBAAiB;IACjB,uCAAuC;IACvC,oBAAoB;IACpB,sCAAsC;IACtC,0BAA0B;IAC1B,mCAAmC;AACvC;;AAEA;IACI;QACI,2BAA2B;IAC/B;IACA;QACI,2BAA2B;IAC/B;IACA;QACI,6BAA6B;IACjC;IACA;QACI,2BAA2B;IAC/B;IACA;QACI,2BAA2B;IAC/B;AACJ;AACA,SAAS;AACT;IACI,kBAAkB;IAClB,aAAa;IACb,mBAAmB;AACvB;AACA;IACI,gBAAgB;;AAEpB;;AAEA;IACI,oBAAoB;IACpB,aAAa;IACb,uCAAuC;IACvC,qCAAqC;IACrC,0BAA0B;IAC1B,kCAAkC;AACtC;;AAEA;IACI;QACI,2BAA2B;IAC/B;IACA;QACI,2BAA2B;IAC/B;IACA;QACI,6BAA6B;IACjC;IACA;QACI,2BAA2B;IAC/B;IACA;QACI,2BAA2B;IAC/B;AACJ;;;AAGA;IACI,kBAAkB;IAClB,kBAAkB;AACtB;;AAEA,KAAK;;AAEL;IACI,mBAAmB;IACnB,eAAe;AACnB","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap');\r\n\r\n:root {\r\n\r\n    /*CORES A SEREM ADICIONADAS*/\r\n    --fundo-color: #254b9c;\r\n    --contador-color: #194cbb;\r\n    --equipes-color: #52D0E6;\r\n    --equipePRINC-color: #4EFCE8;\r\n    --respost-color: #4BF2AF;\r\n    --respostMOUSE-color: #3f68c2;\r\n    --contorno-color: #03ff9e;\r\n\r\n\r\n    /*GRADUAÇÃO DE CORES*/\r\n    --gradual-color: linear-gradient(-40deg, #678d87, #106570, #9e4fa8, #007c53);\r\n    --gradualEQUIPE-color: linear-gradient(-40deg,  #00754e, #74357c, #0d7a7e, #0f3291);\r\n    --gradualBOTAO-color: linear-gradient(-40deg,  #61073e, #670774, #151fa1, #074aa1);\r\n\r\n    /*ADICIONAR FONTES PARA TEXTO*/\r\n\r\n}\r\n\r\n* {\r\n    margin: 0;\r\n    padding: 0;\r\n    box-sizing: border-box;\r\n    font-family: 'Roboto', sans-serif;\r\n    font-size: 1.25rem;   \r\n}\r\n\r\nbody {\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n    min-height: 100vh;\r\n    background: var(--gradual-color);\r\n    background-size: 800% 100%;\r\n    animation: colors 20s ease infinite;\r\n    color: #fff;\r\n}\r\n\r\n@keyframes colors {\r\n    0% {\r\n        background-position: 0% 50%;\r\n    }\r\n    25% {\r\n        background-position: 50% 0%;\r\n    }\r\n    50% {\r\n        background-position: 100% 50%;\r\n    }\r\n    75% {\r\n        background-position: 50% 0%;\r\n    }\r\n    100% {\r\n        background-position: 0% 50%;\r\n    }\r\n}\r\n\r\nmain {\r\n    flex-grow: 3;\r\n    display: flex;\r\n    flex-direction: row;\r\n    justify-content: center;\r\n    width: 80%;\r\n    padding: 50px; /* espacamento interno */\r\n}\r\n\r\nsection {\r\n    width: 100%;\r\n    margin: 0 auto;\r\n    height: 700px;\r\n    padding: 1rem;\r\n    margin-bottom: 0.625rem;\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n\r\nh1 {\r\n    position: relative;\r\n    text-align: center;\r\n    font-size: 1.75rem;\r\n    margin: 0.625rem;\r\n}\r\n\r\n.centro {\r\n    text-align: center;\r\n}\r\n\r\n.questao {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n}\r\n\r\n#numQuestao {\r\n    display: block;\r\n    background: #00b0ff;\r\n    padding: 4px 10px 2px 10px;\r\n    border-radius: 50%;\r\n}\r\n\r\n#pergunta {\r\n    margin-left: 1rem;\r\n}\r\n\r\n.questoes {\r\n    display: flex;\r\n    flex-direction: column;\r\n    padding: 10px 5px;\r\n    border: 3px solid var(--contorno-color);\r\n    border-radius: 5px;\r\n    margin-bottom: 20px;\r\n    min-width: 60%;\r\n    max-width: 90%;\r\n    background: var(--fundo-color);\r\n}\r\n\r\n.questoes ol li {\r\n    display: block;\r\n    margin: 1rem;\r\n    padding: 1rem;\r\n    border-radius: 8px;\r\n}\r\n\r\n.questoes ol li:hover {\r\n    background: #00b0ff;\r\n    cursor: pointer;\r\n}\r\n\r\n.bloqueado {\r\n    display: none;\r\n}\r\n\r\n.bloqueado li:hover {\r\n    display: none;\r\n}\r\n\r\n#instrucoes {\r\n    background: rgb(8, 211, 126);\r\n    color: #191919;\r\n    padding: 0.625rem;\r\n    border-radius: 8px;\r\n    display: flex;\r\n    justify-content: center;\r\n    margin-bottom: 1rem;\r\n    animation: piscar .75s infinite alternate;\r\n}\r\n\r\n#aviso {\r\n    color: #600872;\r\n}\r\n\r\n.botao{\r\n    color: whitesmoke;\r\n\r\n    height: 50px;\r\n    margin-top: 5px;\r\n}\r\n\r\n.botao:hover {\r\n    background: #00b0ff;\r\n    cursor: pointer;\r\n}\r\n\r\n.pontos_1, .pontos_2 {\r\n    color:#00b0ff;\r\n    background-color: #ffffff;\r\n    margin-top: 0px;\r\n}\r\n\r\n/* ANIMACAO */\r\n\r\n/* Animar o input */\r\n@keyframes piscar {\r\n    0% {\r\n        filter: drop-shadow(0 0 20px #00b0ff);\r\n        -webkit-filter: drop-shadow(0 0 20px #00b0ff);\r\n        -moz-filter: drop-shadow(0 0 20px #00b0ff);\r\n        -o-filter: drop-shadow(0 0 20px #00b0ff);\r\n        -ms-filter: drop-shadow(0 0 20px #00b0ff);\r\n    }\r\n    100% {\r\n    }\r\n}\r\n\r\n.animar {\r\n    animation: piscar .75s infinite alternate;\r\n}\r\n\r\n.aparecer {\r\n    animation: aparecer .5s infinite alternate;\r\n}\r\n\r\n@keyframes aparecer {\r\n    0% {\r\n        opacity: 0\r\n    }\r\n    100% {\r\n        opacity: 1\r\n    }\r\n}\r\n\r\n.timer {\r\n    display: flex;\r\n    background: var(--contador-color);\r\n    padding: 0.45rem;\r\n    border-radius: 50%;\r\n    margin-bottom: 10px;\r\n}\r\n/* TELA DAS TABELAS */\r\n.box_equipes {\r\n    display: flex;\r\n    flex-direction: column;        \r\n}\r\n/* TELA DA TABELA */\r\n.equipes {\r\n    position: relative;\r\n    top: 22%;\r\n    padding: 25px 28px;\r\n    border: 3px solid var(--contorno-color);\r\n    border-radius: 5px;\r\n    right: 30px;\r\n    max-width: 100%;\r\n    background: var(--gradualEQUIPE-color);\r\n    background-size: 800% 100%;\r\n    animation: colors 15s ease infinite;\r\n}\r\n\r\n@keyframes colors {\r\n    0% {\r\n        background-position: 0% 50%;\r\n    }\r\n    25% {\r\n        background-position: 50% 0%;\r\n    }\r\n    50% {\r\n        background-position: 100% 50%;\r\n    }\r\n    75% {\r\n        background-position: 50% 0%;\r\n    }\r\n    100% {\r\n        background-position: 0% 50%;\r\n    }\r\n}\r\n\r\n.tabelas {\r\n    text-align: center;\r\n}\r\n/* TELA DO USUARIO COM SUA EQUIPE/BOTAO  */\r\n.equipe_botao {\r\n    position: relative;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-self: flex-start;\r\n    top: 30%;\r\n    left: 15%;\r\n    text-align: center;\r\n}\r\n/* TELA DO USUARIO COM SUA EQUIPE  */\r\n.box_Tela-Usuario {\r\n    position: relative;\r\n    display: flex;\r\n    flex-direction: column;\r\n    padding: 5px 10px;\r\n    border: 2px solid var(--contorno-color);\r\n    border-radius: 10rem;\r\n    background: var(--gradualEQUIPE-color);\r\n    background-size: 800% 100%;\r\n    animation: colors 12s ease infinite;\r\n}\r\n\r\n@keyframes colors {\r\n    0% {\r\n        background-position: 0% 50%;\r\n    }\r\n    25% {\r\n        background-position: 50% 0%;\r\n    }\r\n    50% {\r\n        background-position: 100% 50%;\r\n    }\r\n    75% {\r\n        background-position: 50% 0%;\r\n    }\r\n    100% {\r\n        background-position: 0% 50%;\r\n    }\r\n}\r\n/* botao*/\r\n.players {\r\n    position: relative;\r\n    display: flex;\r\n    flex-direction: row;\r\n}\r\n.jogador2 {\r\n    margin-left: 30%;\r\n    \r\n}\r\n\r\n.botao {\r\n    border-radius: 10rem;\r\n    padding: 10px;\r\n    border: 2px solid var(--contorno-color);\r\n    background: var(--gradualBOTAO-color);\r\n    background-size: 800% 100%;\r\n    animation: colors 7s ease infinite;\r\n}\r\n\r\n@keyframes colors {\r\n    0% {\r\n        background-position: 0% 50%;\r\n    }\r\n    25% {\r\n        background-position: 50% 0%;\r\n    }\r\n    50% {\r\n        background-position: 100% 50%;\r\n    }\r\n    75% {\r\n        background-position: 50% 0%;\r\n    }\r\n    100% {\r\n        background-position: 0% 50%;\r\n    }\r\n}\r\n\r\n\r\n.jog_equipe {\r\n    padding-left: 15px;\r\n    padding-right: 5px;\r\n}\r\n\r\n/*  */\r\n\r\n.cor_red:hover {\r\n    background: #00b0ff;\r\n    cursor: pointer;\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/***/ ((module) => {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : 0
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}


/***/ }),

/***/ "./src/assets/css/chat.css":
/*!*********************************!*\
  !*** ./src/assets/css/chat.css ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_chat_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./chat.css */ "./node_modules/css-loader/dist/cjs.js!./src/assets/css/chat.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_chat_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_chat_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_chat_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_chat_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/assets/css/styles.css":
/*!***********************************!*\
  !*** ./src/assets/css/styles.css ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./styles.css */ "./node_modules/css-loader/dist/cjs.js!./src/assets/css/styles.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assets_css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/css/styles.css */ "./src/assets/css/styles.css");
/* harmony import */ var _assets_css_chat_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/css/chat.css */ "./src/assets/css/chat.css");



var config_eqps = __webpack_require__(/*! ./modules/equipes */ "./src/modules/equipes.js");

var configQuestoes = __webpack_require__(/*! ./modules/questoes */ "./src/modules/questoes.js");

var chat = __webpack_require__(/*! ./modules/chat */ "./src/modules/chat.js");

var _require = __webpack_require__(/*! ./modules/timer */ "./src/modules/timer.js"),
    start_ini = _require.start_ini,
    stop_ini = _require.stop_ini;

var instrucoes = document.querySelector('#instrucoes');
instrucoes.textContent = 'Assim que o tempo acabar o jogo começará!Preste atenção!';
config_eqps();
start_ini();
chat();
setTimeout(function () {
  instrucoes.textContent = 'Leia a questão e clique na resposta correta!';
  stop_ini();
  configQuestoes();
}, 5000);
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map