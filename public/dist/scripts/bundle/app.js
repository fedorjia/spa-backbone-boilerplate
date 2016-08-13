(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/fedor/works/private/github/single-page-application-boilerplate-backbone/node_modules/whatwg-fetch/fetch.js":[function(require,module,exports){
(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)

    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var list = this.map[name]
    if (!list) {
      list = []
      this.map[name] = list
    }
    list.push(value)
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    var values = this.map[normalizeName(name)]
    return values ? values[0] : null
  }

  Headers.prototype.getAll = function(name) {
    return this.map[normalizeName(name)] || []
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = [normalizeValue(value)]
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    Object.getOwnPropertyNames(this.map).forEach(function(name) {
      this.map[name].forEach(function(value) {
        callback.call(thisArg, value, name, this)
      }, this)
    }, this)
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    reader.readAsArrayBuffer(blob)
    return fileReaderReady(reader)
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    reader.readAsText(blob)
    return fileReaderReady(reader)
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (!body) {
        this._bodyText = ''
      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
        // Only support ArrayBuffers for POST method.
        // Receiving ArrayBuffers happens via Blobs, instead.
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        return this.blob().then(readBlobAsArrayBuffer)
      }

      this.text = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return readBlobAsText(this._bodyBlob)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as text')
        } else {
          return Promise.resolve(this._bodyText)
        }
      }
    } else {
      this.text = function() {
        var rejected = consumed(this)
        return rejected ? rejected : Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body
    if (Request.prototype.isPrototypeOf(input)) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = input
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this)
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function headers(xhr) {
    var head = new Headers()
    var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n')
    pairs.forEach(function(header) {
      var split = header.trim().split(':')
      var key = split.shift().trim()
      var value = split.join(':').trim()
      head.append(key, value)
    })
    return head
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = options.status
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = options.statusText
    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request
      if (Request.prototype.isPrototypeOf(input) && !init) {
        request = input
      } else {
        request = new Request(input, init)
      }

      var xhr = new XMLHttpRequest()

      function responseURL() {
        if ('responseURL' in xhr) {
          return xhr.responseURL
        }

        // Avoid security warnings on getResponseHeader when not allowed by CORS
        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
          return xhr.getResponseHeader('X-Request-URL')
        }

        return
      }

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: headers(xhr),
          url: responseURL()
        }
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);

},{}],"/Users/fedor/works/private/github/single-page-application-boilerplate-backbone/public/scripts/app.js":[function(require,module,exports){
'use strict';

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.APP = {};

/**
 * APP Entry
 */
// Application entry point.
$(function () {
	_router2.default.start();

	APP.router = _router2.default.appRouter;
	// APP.router.nav("/");
}());

},{"./router":"/Users/fedor/works/private/github/single-page-application-boilerplate-backbone/public/scripts/router.js"}],"/Users/fedor/works/private/github/single-page-application-boilerplate-backbone/public/scripts/commons/consts.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/***
 * constants
 */
var consts = {
	DEBUG: 1
};

consts.PRIORITYS = {
	'home-view': 1000,
	'detail-view': 2000,
	'end-view': 3000
};

exports.default = consts;

},{}],"/Users/fedor/works/private/github/single-page-application-boilerplate-backbone/public/scripts/commons/transition.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _NoneTransition = require('../plugins/transition/NoneTransition');

var _NoneTransition2 = _interopRequireDefault(_NoneTransition);

var _FadeTransition = require('../plugins/transition/FadeTransition');

var _FadeTransition2 = _interopRequireDefault(_FadeTransition);

var _SlideTransition = require('../plugins/transition/SlideTransition');

var _SlideTransition2 = _interopRequireDefault(_SlideTransition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***
 * transition
 */
var transition = {

	defaultAnimation: 'none',

	get: function get(currentView, targetView, animation) {
		var result = void 0;
		switch (animation) {
			case 'none':
				{
					result = new _NoneTransition2.default(currentView, targetView);
					break;
				}
			case 'fade':
				{
					result = new _FadeTransition2.default(currentView, targetView);
					break;
				}
			case 'slide':
				{
					result = new _SlideTransition2.default(currentView, targetView).animate();
					break;
				}
		}
		return result;
	}
};

exports.default = transition;

},{"../plugins/transition/FadeTransition":"/Users/fedor/works/private/github/single-page-application-boilerplate-backbone/public/scripts/plugins/transition/FadeTransition.js","../plugins/transition/NoneTransition":"/Users/fedor/works/private/github/single-page-application-boilerplate-backbone/public/scripts/plugins/transition/NoneTransition.js","../plugins/transition/SlideTransition":"/Users/fedor/works/private/github/single-page-application-boilerplate-backbone/public/scripts/plugins/transition/SlideTransition.js"}],"/Users/fedor/works/private/github/single-page-application-boilerplate-backbone/public/scripts/plugins/transition/FadeTransition.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/***
 * FadeTransition
 */
var FadeTransition = function () {
    function FadeTransition(currentView, targetView) {
        _classCallCheck(this, FadeTransition);

        this.currentView = currentView;
        this.targetView = targetView;
    }

    _createClass(FadeTransition, [{
        key: "animatePush",
        value: function animatePush(callback) {
            this.currentView.didDisappear();
            this.targetView.didAppear();
            if (callback) {
                callback();
            }
        }
    }, {
        key: "animatePop",
        value: function animatePop(callback) {
            this.currentView.didDisappear();
            this.targetView.didAppear();
            if (callback) {
                callback();
            }
        }
    }]);

    return FadeTransition;
}();

exports.default = FadeTransition;

},{}],"/Users/fedor/works/private/github/single-page-application-boilerplate-backbone/public/scripts/plugins/transition/NoneTransition.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/***
 * NoneTransition
 */
var NoneTransition = function () {
    function NoneTransition(currentView, targetView) {
        _classCallCheck(this, NoneTransition);

        this.currentView = currentView;
        this.targetView = targetView;
    }

    _createClass(NoneTransition, [{
        key: 'push',
        value: function push(callback) {
            if (this.currentView) {
                this.currentView.$el.css({ display: 'none', opacity: 0 });
                this.currentView.didDisappear();
            }
            this.targetView.render();
            this.targetView.$el.css({ display: 'block', opacity: 1 });
            this.targetView.didAppear();
            if (callback) {
                callback();
            }
        }
    }, {
        key: 'pop',
        value: function pop(callback) {
            this.currentView.$el.css({ display: 'none', opacity: 0 });
            this.currentView.didDisappear();

            this.targetView.$el.css({ display: 'block', opacity: 1 });
            this.targetView.didAppear();
            if (callback) {
                callback();
            }
        }
    }]);

    return NoneTransition;
}();

exports.default = NoneTransition;

},{}],"/Users/fedor/works/private/github/single-page-application-boilerplate-backbone/public/scripts/plugins/transition/SlideTransition.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/***
 * SlideTransition
 */
var SlideTransition = function () {
    function SlideTransition(currentView, targetView) {
        _classCallCheck(this, SlideTransition);

        this.currentView = currentView;
        this.targetView = targetView;
    }

    _createClass(SlideTransition, [{
        key: "animatePush",
        value: function animatePush(callback) {
            this.currentView.didDisappear();
            this.targetView.didAppear();
            if (callback) {
                callback();
            }
        }
    }, {
        key: "animatePop",
        value: function animatePop(callback) {
            this.currentView.didDisappear();
            this.targetView.didAppear();
            if (callback) {
                callback();
            }
        }
    }]);

    return SlideTransition;
}();

exports.default = SlideTransition;

},{}],"/Users/fedor/works/private/github/single-page-application-boilerplate-backbone/public/scripts/router.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _viewport = require('./viewport');

var _viewport2 = _interopRequireDefault(_viewport);

var _transition = require('./commons/transition');

var _transition2 = _interopRequireDefault(_transition);

var _HomeView = require('./views/HomeView');

var _HomeView2 = _interopRequireDefault(_HomeView);

var _DetailView = require('./views/DetailView');

var _DetailView2 = _interopRequireDefault(_DetailView);

var _EndView = require('./views/EndView');

var _EndView2 = _interopRequireDefault(_EndView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = {

    /**
     * start router
     */
    start: function start() {
        var AppRouter = Backbone.Router.extend({
            routes: {
                '': 'toHome',
                'detail/:id': 'toDetail',
                'end': 'toEnd'
            },

            /**
             * navigate
             */
            nav: function nav(path, params, animation, trigger) {
                if (trigger === undefined) {
                    trigger = true;
                }
                this.params = { __animation__: animation || _transition2.default.defaultAnimation };
                Object.assign(this.params, params || {});

                this.navigate(path, { trigger: trigger });
            },


            /*************** router handlers **************/
            toHome: function toHome() {
                router.fly(_HomeView2.default);
            },
            toDetail: function toDetail(id) {
                router.fly(_DetailView2.default, { id: id });
            },
            toEnd: function toEnd() {
                router.fly(_EndView2.default);
            }
        });

        this.appRouter = new AppRouter();
        Backbone.history.start();
        // Backbone.history.start({pushState:true, root: '/'});
    },

    /**
     * transmit view
     */
    fly: function fly(view, params) {
        // merge params
        var mParams = this.appRouter.params || { __animation__: _transition2.default.defaultAnimation };
        Object.assign(mParams, params || {});
        _viewport2.default.fly(view, mParams);
        this.appRouter.params = null;
    }
};

exports.default = router;

},{"./commons/transition":"/Users/fedor/works/private/github/single-page-application-boilerplate-backbone/public/scripts/commons/transition.js","./viewport":"/Users/fedor/works/private/github/single-page-application-boilerplate-backbone/public/scripts/viewport.js","./views/DetailView":"/Users/fedor/works/private/github/single-page-application-boilerplate-backbone/public/scripts/views/DetailView.js","./views/EndView":"/Users/fedor/works/private/github/single-page-application-boilerplate-backbone/public/scripts/views/EndView.js","./views/HomeView":"/Users/fedor/works/private/github/single-page-application-boilerplate-backbone/public/scripts/views/HomeView.js"}],"/Users/fedor/works/private/github/single-page-application-boilerplate-backbone/public/scripts/utils/http.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

require('whatwg-fetch');

var http = {
	/**
  * get
     */
	get: function get(url) {
		var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

		var i = 0;
		var str = '';
		for (var prop in params) {
			if (params.hasOwnProperty(prop)) {
				str = i === 0 ? str + ('?' + prop + '=' + params[prop]) : str + ('&' + prop + '=' + params[prop]);
			}
			i++;
		}

		return fetch(url + str, {
			method: 'GET'
		}).then(function (response) {
			return response.json().then(function (json) {
				return { json: json, response: response };
			});
		}).then(function (_ref) {
			var json = _ref.json;
			var response = _ref.response;

			if (!response.ok) {
				return Promise.reject(json);
			}
			return json;
		}).catch(function (ex) {
			return Promise.reject(ex);
		});
	},


	// post
	post: function post(url, params) {
		var formData = new FormData();
		for (var prop in params) {
			if (params.hasOwnProperty(prop)) {
				formData.append(prop, params[prop]);
			}
		}

		return fetch(url, {
			method: 'POST',
			body: formData
		}).then(function (response) {
			return response.json().then(function (json) {
				return { json: json, response: response };
			});
		}).then(function (_ref2) {
			var json = _ref2.json;
			var response = _ref2.response;

			if (!response.ok) {
				return Promise.reject(json);
			}
			return json;
		}).catch(function (ex) {
			return Promise.reject(ex);
		});
	}
};

exports.default = http;

},{"whatwg-fetch":"/Users/fedor/works/private/github/single-page-application-boilerplate-backbone/node_modules/whatwg-fetch/fetch.js"}],"/Users/fedor/works/private/github/single-page-application-boilerplate-backbone/public/scripts/viewport.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _consts = require('./commons/consts');

var _consts2 = _interopRequireDefault(_consts);

var _transition = require('./commons/transition');

var _transition2 = _interopRequireDefault(_transition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cache = [];
var cid = 0;

function getCid() {
	return cid++;
}

var viewport = {
	/**
  * view transition
     */
	fly: function fly(defination, args) {
		$('.modal').remove();

		var len = cache.length;
		var currentCacheItem = cache[len - 1];
		var currentView = len === 0 ? null : currentCacheItem.value;
		var targetView = void 0;
		var direction = 'push';

		if (len === 0) {
			targetView = new defination(args);
		} else {
			var cacheItem = this.getCacheItemByDefination(defination);
			if (!cacheItem) {
				targetView = new defination(args);
			} else {
				if (currentCacheItem.key === defination) {
					// target key is the current key
					targetView = new defination(args);
				} else {
					if (cacheItem.key === defination) {
						direction = 'pop';
						targetView = cacheItem.value;
					} else {
						targetView = new defination(args);
					}
				}
			}
		}

		console.log(direction);

		var trfactory = _transition2.default.get(currentView, targetView, args.__animation__);
		trfactory[direction](function () {
			if (direction === 'push') {
				// push
				targetView.__cid__ = 'view' + getCid();
				cache.push({ key: defination, value: targetView });
			}

			var targetPriority = _consts2.default.PRIORITYS[targetView.className] || 0;

			cache.forEach(function (item) {
				var view = item.value;
				if (view.__cid__ !== targetView.__cid__) {
					var priority = _consts2.default.PRIORITYS[view.className] || 0;
					// find high priority and remove it
					if (priority >= targetPriority) {
						view.remove();
						cache.splice(cache.indexOf(item), 1);
					}
				}
			});
			console.log(cache);
		});
	},

	getCacheItemByDefination: function getCacheItemByDefination(defination) {
		var result = void 0;
		for (var i = 0; i < cache.length; i++) {
			var item = cache[i];
			if (item.key === defination) {
				result = item;
				break;
			}
		}
		return result;
	}
};

exports.default = viewport;

},{"./commons/consts":"/Users/fedor/works/private/github/single-page-application-boilerplate-backbone/public/scripts/commons/consts.js","./commons/transition":"/Users/fedor/works/private/github/single-page-application-boilerplate-backbone/public/scripts/commons/transition.js"}],"/Users/fedor/works/private/github/single-page-application-boilerplate-backbone/public/scripts/views/DetailView.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Component = require('./generic/Component');

var _Component2 = _interopRequireDefault(_Component);

var _detail = require('../../tpls/detail.html');

var _detail2 = _interopRequireDefault(_detail);

var _http = require('../utils/http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import EndView from './EndView';

var DetailView = _Component2.default.extend({
    className: 'detail-view',
    events: {
        'click .btn-back': 'onBack',
        'click .btn-next': 'onNext'
    },

    initialize: function initialize() {
        this.constructor.__super__.initialize.apply(this);
    },
    render: function render() {
        this.constructor.__super__.render.apply(this);
        this.loadData();
        return this;
    },
    loadData: function loadData() {
        var _this = this;

        _http2.default.get('/assets/detail.json').then(function (result) {
            _this.setup(result);
        });
    },
    setup: function setup(data) {
        this.$el.html((0, _detail2.default)(data));
    },


    /**************************** events ***************************/
    onBack: function onBack() {
        // APP.router.nav('');
        history.go(-1);
    },
    onNext: function onNext() {
        APP.router.nav('end', { datetime: Date.now() });
    }
});

exports.default = DetailView;

},{"../../tpls/detail.html":"/Users/fedor/works/private/github/single-page-application-boilerplate-backbone/public/tpls/detail.html","../utils/http":"/Users/fedor/works/private/github/single-page-application-boilerplate-backbone/public/scripts/utils/http.js","./generic/Component":"/Users/fedor/works/private/github/single-page-application-boilerplate-backbone/public/scripts/views/generic/Component.js"}],"/Users/fedor/works/private/github/single-page-application-boilerplate-backbone/public/scripts/views/EndView.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Component = require('./generic/Component');

var _Component2 = _interopRequireDefault(_Component);

var _end = require('../../tpls/end.html');

var _end2 = _interopRequireDefault(_end);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EndView = _Component2.default.extend({
    className: 'end-view',
    events: {
        'click .btn-back': 'onBack'
    },

    initialize: function initialize(data) {
        this.constructor.__super__.initialize.apply(this);
        this.data = data;
    },
    render: function render() {
        this.constructor.__super__.render.apply(this);

        this.data.datetime = this.data.datetime || 'xx/xx/xx';
        this.$el.html((0, _end2.default)(this.data));
        return this;
    },


    /**************************** events ***************************/
    onBack: function onBack() {
        history.go(-1);
    }
});

exports.default = EndView;

},{"../../tpls/end.html":"/Users/fedor/works/private/github/single-page-application-boilerplate-backbone/public/tpls/end.html","./generic/Component":"/Users/fedor/works/private/github/single-page-application-boilerplate-backbone/public/scripts/views/generic/Component.js"}],"/Users/fedor/works/private/github/single-page-application-boilerplate-backbone/public/scripts/views/HomeView.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Component = require('./generic/Component');

var _Component2 = _interopRequireDefault(_Component);

var _home = require('../../tpls/home.html');

var _home2 = _interopRequireDefault(_home);

var _http = require('../utils/http');

var _http2 = _interopRequireDefault(_http);

var _ItemView = require('./items/ItemView');

var _ItemView2 = _interopRequireDefault(_ItemView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HomeView = _Component2.default.extend({
    className: 'home-view',
    events: {},

    initialize: function initialize() {
        this.constructor.__super__.initialize.apply(this);
        this.name = 'Single Page Applcation With Backbone';
    },
    render: function render() {
        this.constructor.__super__.render.apply(this);
        // load data
        this.loadData();
        // render html
        this.$el.html((0, _home2.default)({ name: this.name }));
        return this;
    },
    loadData: function loadData() {
        var _this = this;

        _http2.default.get('/assets/list.json').then(function (result) {
            _this.setup(result);
        });
    },
    setup: function setup(data) {
        var $items = this.$el.find('.items');
        data.forEach(function (obj) {
            var item = new _ItemView2.default(obj);
            $items.append(item.render().el);
        });
    }
});

exports.default = HomeView;

},{"../../tpls/home.html":"/Users/fedor/works/private/github/single-page-application-boilerplate-backbone/public/tpls/home.html","../utils/http":"/Users/fedor/works/private/github/single-page-application-boilerplate-backbone/public/scripts/utils/http.js","./generic/Component":"/Users/fedor/works/private/github/single-page-application-boilerplate-backbone/public/scripts/views/generic/Component.js","./items/ItemView":"/Users/fedor/works/private/github/single-page-application-boilerplate-backbone/public/scripts/views/items/ItemView.js"}],"/Users/fedor/works/private/github/single-page-application-boilerplate-backbone/public/scripts/views/generic/Component.js":[function(require,module,exports){
'use strict';

/***
 * Generic Component
 */
var Component = Backbone.View.extend({

    initialize: function initialize() {},

    render: function render() {
        this.$el.addClass('page');
        $('body').append(this.$el);
        return this;
    },

    remove: function remove() {
        this.$el.remove();
    },

    /***** life cycle  ****/

    didDisappear: function didDisappear(options, callback) {},

    didAppear: function didAppear(options, callback) {}
});

module.exports = Component;

},{}],"/Users/fedor/works/private/github/single-page-application-boilerplate-backbone/public/scripts/views/items/ItemView.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _item = require('../../../tpls/items/item.html');

var _item2 = _interopRequireDefault(_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ItemView = Backbone.View.extend({
    events: {},
    tagName: 'li',

    initialize: function initialize(data) {
        this.data = data;
    },
    render: function render() {
        // append to html
        this.$el.addClass('item');
        this.$el.html((0, _item2.default)(this.data));
        return this;
    }
});

exports.default = ItemView;

},{"../../../tpls/items/item.html":"/Users/fedor/works/private/github/single-page-application-boilerplate-backbone/public/tpls/items/item.html"}],"/Users/fedor/works/private/github/single-page-application-boilerplate-backbone/public/tpls/detail.html":[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<h1 class="title">'+
((__t=( title ))==null?'':__t)+
'</h1>\n\n<div class="desc">\n\t'+
((__t=( desc ))==null?'':__t)+
'\n</div>\n\n<div class="actions">\n\t<div class="btn btn-back">Back</div>\n\t<div class="btn btn-next">Next</div>\n</div>\n';
}
return __p;
};

},{}],"/Users/fedor/works/private/github/single-page-application-boilerplate-backbone/public/tpls/end.html":[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<h1 class="title">This is the last page.</h1>\n\n<div class="desc">createAt: '+
((__t=( datetime ))==null?'':__t)+
'</div>\n\n<div class="btn btn-back">Back</div>\n';
}
return __p;
};

},{}],"/Users/fedor/works/private/github/single-page-application-boilerplate-backbone/public/tpls/home.html":[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<h1 class="">\n\thello world, '+
((__t=( name ))==null?'':__t)+
'\n</h1>\n\n<ul class="items">\n\n</ul>';
}
return __p;
};

},{}],"/Users/fedor/works/private/github/single-page-application-boilerplate-backbone/public/tpls/items/item.html":[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<a href="#detail/'+
((__t=( id ))==null?'':__t)+
'">\n    <div class="title p4">'+
((__t=( title ))==null?'':__t)+
'</div>\n    <div class="desc">'+
((__t=( desc ))==null?'':__t)+
'</div>\n</a>';
}
return __p;
};

},{}]},{},["/Users/fedor/works/private/github/single-page-application-boilerplate-backbone/public/scripts/app.js"]);
