require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
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
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1])
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
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
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
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
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
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
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

    if (input instanceof Request) {
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
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = String(input)
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
    return new Request(this, { body: this._bodyInit })
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

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    rawHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = 'status' in options ? options.status : 200
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
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
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
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

},{}],2:[function(require,module,exports){
'use strict';

var _viewport = require('framework/viewport');

var _viewport2 = _interopRequireDefault(_viewport);

var _router = require('framework/router');

var _router2 = _interopRequireDefault(_router);

var _config = require('framework/config');

var _config2 = _interopRequireDefault(_config);

var _home = require('./view/home');

var _home2 = _interopRequireDefault(_home);

var _routers = require('./routers');

var _routers2 = _interopRequireDefault(_routers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.APP = {};

/**
 * APP Entry
 */
// Application entry point.
// import 'babel-polyfill';
$(function () {
       APP.viewport = _viewport2.default;
       APP.router = _router2.default;

       if (_config2.default.isActiveRouter) {
              _router2.default.start(_routers2.default);
       } else {
              _viewport2.default.fly(_home2.default);
       }
}());

},{"./routers":12,"./view/home":23,"framework/config":4,"framework/router":9,"framework/viewport":11}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var fadeIn = exports.fadeIn = function fadeIn(el) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    anime(Object.assign({
        targets: el,
        opacity: 1,
        easing: 'easeInOutQuad'
    }, options));
};

var fadeOut = exports.fadeOut = function fadeOut(el) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    anime(Object.assign({
        targets: el,
        opacity: 0,
        easing: 'easeInOutQuad'
    }, options));
};

var slideRightIn = exports.slideRightIn = function slideRightIn(el) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    anime({
        targets: el,
        easing: 'easeInOutQuad',
        translateX: [{ value: 20, delay: 0 }, { value: 0, duration: options.duration }],
        opacity: [{ value: 0, delay: 0 }, { value: 1, duration: options.duration }],
        duration: options.duration,
        complete: options.complete
    });
};

var slideLeftIn = exports.slideLeftIn = function slideLeftIn(el) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    anime({
        targets: el,
        easing: 'easeInOutQuad',
        translateX: [{ value: -20 }, { value: 0, duration: options.duration }],
        opacity: [{ value: 0 }, { value: 1, duration: options.duration }],
        duration: options.duration,
        complete: options.complete
    });
};

var slideUpIn = exports.slideUpIn = function slideUpIn(el) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    anime({
        targets: el,
        easing: 'easeInOutQuad',
        translateY: [{ value: 20, delay: 0 }, { value: 0, duration: options.duration }],
        opacity: [{ value: 0, delay: 0 }, { value: 1, duration: options.duration }],
        duration: options.duration,
        complete: options.complete
    });
};

var slideDownOut = exports.slideDownOut = function slideDownOut(el) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    anime({
        targets: el,
        easing: 'easeInOutQuad',
        translateY: [{ value: 0 }, { value: 20, duration: options.duration }],
        opacity: [{ value: 1 }, { value: 0, duration: options.duration }],
        duration: options.duration,
        complete: options.complete
    });
};

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    isActiveRouter: true,
    pushState: true,
    defaultAnimation: 'none' // none, fade, slide-h, slide-v
};

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _anime = require('../../anime');

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
        key: 'push',
        value: function push(callback) {
            // current view
            if (this.currentView) {
                (0, _anime.fadeOut)(this.currentView.$el.get(0), { duration: FadeTransition.duration });
            }

            // target view
            this.targetView.render();
            (0, _anime.fadeIn)(this.targetView.$el.get(0), {
                duration: FadeTransition.duration,
                complete: callback
            });
        }
    }, {
        key: 'pop',
        value: function pop(callback) {
            // current view
            if (this.currentView) {
                (0, _anime.fadeOut)(this.currentView.$el.get(0), { duration: FadeTransition.duration });
            }

            // target view
            (0, _anime.fadeIn)(this.targetView.$el.get(0), {
                duration: FadeTransition.duration,
                complete: callback
            });
        }
    }]);

    return FadeTransition;
}();

FadeTransition.type = 'fade';
FadeTransition.duration = 320;
exports.default = FadeTransition;

},{"../../anime":3}],6:[function(require,module,exports){
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
            }
            this.targetView.render();
            this.targetView.$el.css({ display: 'block', opacity: 1 });
            if (callback) {
                callback();
            }
        }
    }, {
        key: 'pop',
        value: function pop(callback) {
            this.currentView.$el.css({ display: 'none', opacity: 0 });
            this.targetView.$el.css({ display: 'block', opacity: 1 });
            if (callback) {
                callback();
            }
        }
    }]);

    return NoneTransition;
}();

NoneTransition.type = 'none';
exports.default = NoneTransition;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _anime = require('../../anime');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/***
 * SlideHorizontalTransition
 */
var SlideHorizontalTransition = function () {
    function SlideHorizontalTransition(currentView, targetView) {
        _classCallCheck(this, SlideHorizontalTransition);

        this.currentView = currentView;
        this.targetView = targetView;
    }

    _createClass(SlideHorizontalTransition, [{
        key: 'push',
        value: function push(callback) {
            // current view
            if (this.currentView) {
                (0, _anime.fadeOut)(this.currentView.$el.get(0), {
                    duration: SlideHorizontalTransition.duration + 120
                });
            }

            // target view
            this.targetView.render();
            (0, _anime.slideRightIn)(this.targetView.$el.get(0), {
                duration: SlideHorizontalTransition.duration,
                complete: callback
            });
        }
    }, {
        key: 'pop',
        value: function pop(callback) {
            // current view
            if (this.currentView) {
                (0, _anime.fadeOut)(this.currentView.$el.get(0), {
                    duration: SlideHorizontalTransition.duration + 120
                });
            }

            // target view
            (0, _anime.slideLeftIn)(this.targetView.$el.get(0), {
                duration: SlideHorizontalTransition.duration,
                complete: callback
            });
        }
    }]);

    return SlideHorizontalTransition;
}();

SlideHorizontalTransition.type = 'slide-h';
SlideHorizontalTransition.duration = 320;
exports.default = SlideHorizontalTransition;

},{"../../anime":3}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _anime = require('../../anime');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/***
 * SlideVerticalTransition
 */
var SlideVerticalTransition = function () {
    function SlideVerticalTransition(currentView, targetView) {
        _classCallCheck(this, SlideVerticalTransition);

        this.currentView = currentView;
        this.targetView = targetView;
    }

    _createClass(SlideVerticalTransition, [{
        key: 'push',
        value: function push(callback) {
            var _this = this;

            // target view
            this.targetView.render();

            (0, _anime.slideUpIn)(this.targetView.$el.get(0), {
                duration: SlideVerticalTransition.duration,
                complete: function complete() {
                    // current view
                    if (_this.currentView) {
                        _this.currentView.$el.css({ opacity: 0, display: 'none' });
                    }
                    if (callback) {
                        callback();
                    }
                }
            });
        }
    }, {
        key: 'pop',
        value: function pop(callback) {
            this.targetView.$el.css({ opacity: 1, display: 'block' });

            // current view
            if (this.currentView) {
                (0, _anime.slideDownOut)(this.currentView.$el.get(0), {
                    duration: SlideVerticalTransition.duration,
                    complete: callback
                });
            }
        }
    }]);

    return SlideVerticalTransition;
}();

SlideVerticalTransition.type = 'slide-v';
SlideVerticalTransition.duration = 320;
exports.default = SlideVerticalTransition;

},{"../../anime":3}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _viewport = require('./viewport');

var _viewport2 = _interopRequireDefault(_viewport);

var _transition = require('./transition');

var _transition2 = _interopRequireDefault(_transition);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = {
    /**
     * start router
     */
    start: function start(routers) {
        var AppRouter = Backbone.Router.extend(_extends({}, routers, {
            nav: function nav(path, params, animation, trigger) {
                if (trigger === undefined) {
                    trigger = true;
                }

                params = params || {};
                params.__animation__ = animation || _transition2.default.defaultAnimation;
                this.params = params;

                this.navigate(path, { trigger: trigger });
            }
        }));

        this.appRouter = new AppRouter();
        // HTML5 push state
        Backbone.history.start({ pushState: _config2.default.pushState, root: '/' });
        // Backbone.history.start();

        return this;
    },

    /**
     * router navigation
     */
    nav: function nav(path, params, animation, trigger) {
        this.appRouter.nav(path, params, animation, trigger);
    },


    /**
     * transmit view
     */
    fly: function fly(view, params) {
        // merge params
        params = params || {};
        Object.assign(params, this.appRouter.params || {});

        _viewport2.default.fly(view, params);
        this.appRouter.params = null;
    }
};

exports.default = router;

},{"./config":4,"./transition":10,"./viewport":11}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _NoneTransition = require('./plugin/transition/NoneTransition');

var _NoneTransition2 = _interopRequireDefault(_NoneTransition);

var _FadeTransition = require('./plugin/transition/FadeTransition');

var _FadeTransition2 = _interopRequireDefault(_FadeTransition);

var _SlideHorizontalTransition = require('./plugin/transition/SlideHorizontalTransition');

var _SlideHorizontalTransition2 = _interopRequireDefault(_SlideHorizontalTransition);

var _SlideVerticalTransition = require('./plugin/transition/SlideVerticalTransition');

var _SlideVerticalTransition2 = _interopRequireDefault(_SlideVerticalTransition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***
 * transition
 */
var transition = {

	defaultAnimation: _config2.default.defaultAnimation, // none, fade, slide-h, slide-v

	get: function get(currentView, targetView, animation) {
		var result = void 0;

		var animationType = animation;
		if (_.isObject(animation)) {
			animationType = animation.type;
		}

		switch (animationType) {
			case 'fade':
				{
					result = new _FadeTransition2.default(currentView, targetView);
					break;
				}
			case 'slide-h':
				{
					result = new _SlideHorizontalTransition2.default(currentView, targetView);
					break;
				}
			case 'slide-v':
				{
					result = new _SlideVerticalTransition2.default(currentView, targetView);
					break;
				}
			default:
				{
					result = new _NoneTransition2.default(currentView, targetView);
					break;
				}
		}
		return result;
	}
};

exports.default = transition;

},{"./config":4,"./plugin/transition/FadeTransition":5,"./plugin/transition/NoneTransition":6,"./plugin/transition/SlideHorizontalTransition":7,"./plugin/transition/SlideVerticalTransition":8}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _transition = require('./transition');

var _transition2 = _interopRequireDefault(_transition);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var viewCache = [];
var activeModal = void 0;

/***
 * get currentView
 */
function getCurrentView() {
	var len = viewCache.length;
	if (len === 0) {
		return null;
	} else {
		return viewCache[len - 1].value;
	}
}

function getKey(defination) {
	if (_config2.default.isActiveRouter) {
		return location.pathname;
	} else {
		return defination;
	}
}

/**
 * get cache item by class defination
 */
function getCacheItemByDefination(defination) {
	var result = void 0;
	for (var i = 0; i < viewCache.length; i++) {
		var item = viewCache[i];
		if (item.key === getKey(defination)) {
			result = item;
			break;
		}
	}
	return result;
}

/***************************************************
 * view transition manager
 ***************************************************/
var manager = {
	/**
  * view transition
  */
	fly: function fly(defination, args) {
		args = args || {};
		if (!args.__animation__) {
			args.__animation__ = _transition2.default.defaultAnimation;
		}

		// remove actived modal
		if (activeModal) {
			activeModal.dismiss();
		}

		var len = viewCache.length;
		if (len === 0) {
			// push
			this.push(defination, args);
		} else {
			var cacheItem = getCacheItemByDefination(defination);
			if (!cacheItem) {
				// push
				this.push(defination, args);
			} else {
				var currentCacheItem = viewCache[len - 1];
				if (currentCacheItem.key === getKey(defination)) {
					// replace
					this.replace(defination, args);
				} else {
					if (len === 1) {
						throw new Error('cache size incorrect');
					}
					var prevCacheItem = viewCache[len - 2];
					if (prevCacheItem.key === getKey(defination)) {
						// pop
						this.pop(args);
					} else {
						// pop to
						this.popTo(cacheItem.key, args);
					}
				}
			}
		}
	},

	/***
  * view push
  */
	push: function push(defination, args) {
		var targetView = new defination(args);
		var currentView = getCurrentView();
		var animation = args.__animation__;
		// get transition
		var tran = _transition2.default.get(currentView, targetView, animation);
		if (currentView) {
			currentView.viewWillDisappear();
		}
		// transiton push
		tran['push'](function () {
			targetView.__animation__ = args.__animation__;
			if (_config2.default.isActiveRouter) {
				// bind router
				targetView.router = _router2.default.appRouter;
			}

			viewCache.push({ key: getKey(defination), value: targetView });
			targetView.viewDidAppear();
		});
	},


	/***
  * view replace
  */
	replace: function replace(defination, args) {
		var len = viewCache.length;
		var targetView = new defination(args);
		var currentView = getCurrentView();
		var tran = _transition2.default.get(currentView, targetView);

		currentView.viewWillDisappear();

		// transiton push
		tran['push'](function () {
			targetView.__animation__ = args.__animation__;
			if (_config2.default.isActiveRouter) {
				// bind router
				targetView.router = _router2.default.appRouter;
			}
			// remove and pop current view
			currentView.remove();
			viewCache.splice(len - 1, 1);
			// push target view
			viewCache.push({ key: getKey(defination), value: targetView });
			targetView.viewDidAppear();
		});
	},


	/**
  * view pop
  */
	pop: function pop() {
		var len = viewCache.length;
		var currentView = getCurrentView();
		if (!currentView) {
			throw new Error('no view to pop');
		}
		if (len <= 1) {
			throw new Error('cache size incorrect');
		}

		var cacheItem = viewCache[len - 2];
		var targetView = cacheItem.value;
		var animation = currentView.__animation__;

		currentView.viewWillDisappear();
		// get transition
		var tran = _transition2.default.get(currentView, targetView, animation);
		// transiton pop
		tran['pop'](function () {
			currentView.remove();
			viewCache.splice(len - 1, 1);
			targetView.viewDidAppear();
		});
	},


	/***
  * pop to view
  */
	popTo: function popTo(defination) {
		var cacheItem = getCacheItemByDefination(defination);
		if (!cacheItem) {
			throw new Error('target view not found');
		}
		var len = viewCache.length;
		var currentView = getCurrentView();
		if (!currentView) {
			throw new Error('no view to pop');
		}
		if (len <= 1) {
			throw new Error('cache size incorrect');
		}

		var targetView = cacheItem.value;
		var animation = currentView.__animation__;

		currentView.viewWillDisappear();

		// get transition
		var tran = _transition2.default.get(currentView, targetView, animation);
		// transiton pop
		tran['pop'](function () {
			// remove views
			var index = viewCache.indexOf(cacheItem);
			for (var i = index + 1; i < len; i++) {
				viewCache[i].value.remove();
			}
			viewCache.splice(index + 1, len - 1);
			targetView.viewDidAppear();
		});
	},
	index: function index() {
		var len = viewCache.length;
		if (len > 1) {
			viewCache.splice(0, len - 1);
		}
	},
	setActiveModal: function setActiveModal(modal) {
		activeModal = modal;
	}
};

exports.default = manager;

},{"./config":4,"./router":9,"./transition":10}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _router = require('./framework/router');

var _router2 = _interopRequireDefault(_router);

var _home = require('./view/home/home');

var _home2 = _interopRequireDefault(_home);

var _cart = require('./view/cart/cart');

var _cart2 = _interopRequireDefault(_cart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routers = {

	routes: {
		'': 'toHome',
		'cart': 'toCart'
		// 'detail/:id':       'toDetail'
	},

	/*********************************************
  * router handler
  * ********************************************/
	toHome: function toHome() {
		_router2.default.fly(_home2.default);
	},
	toCart: function toCart() {
		_router2.default.fly(_cart2.default);
	}
};

exports.default = routers;

},{"./framework/router":9,"./view/cart/cart":21,"./view/home/home":23}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var LKEY = 'local-cart';

/**
 * cart store
 */
var cartStore = {
    /**
     * cart count
     */
    count: function count() {
        var cart = localStorage.getItem(LKEY);
        if (cart) {
            cart = JSON.parse(cart);
            var keys = Object.keys(cart);
            var count = 0;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var key = _step.value;

                    count += cart[key].count * 1;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return count;
        }
        return 0;
    },
    get: function get() {
        var cart = localStorage.getItem(LKEY);
        if (!cart) {
            cart = [];
        } else {
            cart = JSON.parse(cart);
        }
        var keys = Object.keys(cart);
        var items = [];
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = keys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var key = _step2.value;

                items.push(cart[key]);
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        return items;
    },
    increase: function increase(item) {
        var cart = localStorage.getItem(LKEY);
        if (!cart) {
            cart = {};
        } else {
            cart = JSON.parse(cart);
        }

        if (cart[item.id]) {
            item.count = cart[item.id].count * 1 + 1;
        } else {
            item.count = 1;
        }
        cart[item.id] = item;
        localStorage.setItem(LKEY, JSON.stringify(cart));
        return true;
    },
    decrease: function decrease(item) {
        var cart = localStorage.getItem(LKEY);
        if (!cart) {
            cart = {};
        } else {
            cart = JSON.parse(cart);
        }
        if (cart[item.id]) {
            var t = cart[item.id].count * 1 - 1;
            if (t <= 0) {
                item.count = 0;
                delete cart[item.id];
            } else {
                item.count = t;
                cart[item.id] = item;
            }
            localStorage.setItem(LKEY, JSON.stringify(cart));
            return true;
        }
        return false;
    }
};

exports.default = cartStore;

},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _config = require('../../framework/config');

var _config2 = _interopRequireDefault(_config);

var _cart = require('../../view/cart');

var _cart2 = _interopRequireDefault(_cart);

var _cartStore = require('..//cart-store');

var _cartStore2 = _interopRequireDefault(_cartStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import template from '../tpl/component/cart-overlay.html';


/***
 * Cart overlay view
 */
var CartOverlay = function (_Backbone$View) {
    _inherits(CartOverlay, _Backbone$View);

    function CartOverlay() {
        _classCallCheck(this, CartOverlay);

        var _this = _possibleConstructorReturn(this, (CartOverlay.__proto__ || Object.getPrototypeOf(CartOverlay)).call(this, {
            className: 'cart-overlay',
            events: {
                'click .inner': 'onClick'
            }
        }));

        _this.template = _.template('<div class="inner">\n\t\t\t\t<i class="iconfont icon-cart"/>\n\t\t\t\t<div class="badge"><%=count%></div>\n\t\t\t</div>');
        return _this;
    }

    _createClass(CartOverlay, [{
        key: 'render',
        value: function render() {
            _get(CartOverlay.prototype.__proto__ || Object.getPrototypeOf(CartOverlay.prototype), 'render', this).call(this);
            // render view
            this.$el.html(this.template({ count: _cartStore2.default.count() }));
            return this;
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            var count = _cartStore2.default.count();
            var $count = this.$el.find('.badge');
            if (count > 9) {
                $count.text('9+');
            } else {
                $count.text(count);
            }
        }
    }, {
        key: 'onClick',
        value: function onClick() {
            if (_config2.default.isActiveRouter) {
                APP.router.nav('cart');
            } else {
                APP.viewport.fly(_cart2.default);
            }
        }
    }]);

    return CartOverlay;
}(Backbone.View);

exports.default = CartOverlay;

},{"../../framework/config":4,"../../view/cart":21,"..//cart-store":13}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/***
 * Message Handler
 */
var Handler = function () {
	function Handler(callback) {
		_classCallCheck(this, Handler);

		this.callback = callback;
	}

	_createClass(Handler, [{
		key: "send",
		value: function send(which, args) {
			if (this.callback) {
				this.callback(which, args);
			}
		}
	}]);

	return Handler;
}();

exports.default = Handler;

},{}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('whatwg-fetch');

/**
 * URL path
 */
function _createURL(url) {
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    url += (url.indexOf('?') !== -1 ? '&' : '?') + '__v=1';
    return url;
}

/**
 * fetch
 */
function _fetch(url, options) {
    return fetch(url, options).then(function (response) {
        return response.json();
    });
}

/**
 * request
 */
function _request(method, url, params) {
    params = params || {};
    url = _createURL(url);

    var header = {};
    var query = Object.keys(params).map(function (key) {
        return key + '=' + encodeURIComponent(params[key]);
    }).join('&');

    var opts = {
        headers: header,
        method: method
    };

    if (method === 'GET') {
        if (query) {
            url = url + '&' + query;
        }
    } else {
        // x-www-form-urlencoded
        opts.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        opts.body = query;
    }

    return _fetch(url, opts);
}

/**
 * File upload
 */
function _upload(method, url, params, files) {
    url = _createURL(url);
    // form-data
    var formData = new FormData();
    for (var prop in params) {
        if (params.hasOwnProperty(prop)) {
            formData.append(prop, params[prop]);
        }
    }
    if (files) {
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            formData.append(i + '-' + file.name, file);
        }
    }
    return _fetch(url, {
        method: method,
        credentials: 'include',
        body: formData
    });
}

/*********************************************
 * HTTP Client
 *********************************************/
exports.default = {
    /**
     * GET
     */
    get: function get(url) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        return _request('GET', url, params);
    },


    /**
     * DELETE
     */
    delete: function _delete(url) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        return _request('DELETE', url, params);
    },


    /**
     * POST
     */
    post: function post(url) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        return _request('POST', url, params);
    },


    /**
     * UPLOAD
     */
    upload: function upload(url) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var files = arguments[2];

        return _upload('POST', url, params, files);
    },


    /**
     * PUT
     */
    put: function put(url) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var files = arguments[2];

        return _request('PUT', url, params, files);
    }
};

},{"whatwg-fetch":1}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _modal = require('modal');

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import template from '../tpl/widget/confirm.html';

exports.default = {
    show: function show(title, options) {
        options = options || {};
        options.title = title;

        new ComfirmModal(options).show();
    }
};

/**
 * ConfirmModal
 */

var ComfirmModal = function (_Modal) {
    _inherits(ComfirmModal, _Modal);

    function ComfirmModal(options) {
        _classCallCheck(this, ComfirmModal);

        options.className = 'ui-confirm';
        options.events = {
            'click .button-cancel': 'onCancel',
            'click .button-confirm': 'onConfirm'
        };

        var _this = _possibleConstructorReturn(this, (ComfirmModal.__proto__ || Object.getPrototypeOf(ComfirmModal)).call(this, Object.assign({}, ComfirmModal.defaults, options)));

        _this.template = _.template('<div class="inner">\n\t\t\t\t<div class="title"><%=title%></div>\n\t\t\t\t<div class="content"><%=content%></div>\n\t\t\t\t<div class="buttons">\n\t\t\t\t\t<div class="button-cancel button button-clear"><%=cancelText%></div>\n\t\t\t\t\t<div class="button-confirm button button-clear"><%=confirmText%></div>\n\t\t\t\t</div>\n\t\t\t</div>');
        return _this;
    }

    _createClass(ComfirmModal, [{
        key: 'show',
        value: function show() {
            _get(ComfirmModal.prototype.__proto__ || Object.getPrototypeOf(ComfirmModal.prototype), 'show', this).call(this, this.template({
                title: this.options.title,
                content: this.options.content,
                confirmText: this.options.confirmText,
                cancelText: this.options.cancelText
            }));
        }
    }, {
        key: 'onCancel',
        value: function onCancel() {
            this.dismiss();
            if (this.options.onSelect) {
                this.options.onSelect(0);
            }
        }
    }, {
        key: 'onConfirm',
        value: function onConfirm() {
            this.dismiss();
            if (this.options.onSelect) {
                this.options.onSelect(1);
            }
        }
    }]);

    return ComfirmModal;
}(_modal2.default);

ComfirmModal.defaults = {
    dismissOnBlur: false,
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    onSelect: null
};

},{"modal":"modal"}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _http = require('../http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Infinite = function () {
    function Infinite(options) {
        _classCallCheck(this, Infinite);

        var defaults = {
            url: '',
            autoScroll: true,
            limit: 20,
            delay: 280, // delay 500ms
            params: {},
            footerLoadingText: 'Loading...',
            footerMoreText: 'Load More',
            footerClickText: 'Click To Load More'
        };
        options = Object.assign({}, defaults, options);

        if (!options.url) {
            throw new Error('must set url to infinite');
        }

        this.skip = null;
        this.isBusy = false;
        this.isCompleted = false;
        this.options = options;
    }

    _createClass(Infinite, [{
        key: 'render',
        value: function render(target) {
            target.addClass('infinite');

            // load more bar
            this.loadMoreBar = new LoadMoreBar({
                footerLoadingText: this.options.footerLoadingText,
                footerMoreText: this.options.footerMoreText,
                footerClickText: this.options.footerClickText,
                onClick: this.load.bind(this)
            });
            this.loadMoreBar.render(target);

            // bind scroll event
            if (this.options.autoScroll) {
                target.scroll(this.onScroll.bind(this));
            }

            // load data
            this.load();
        }

        /**
         * load data
         */

    }, {
        key: 'load',
        value: function load() {
            var _this = this;

            if (this.isBusy) {
                return;
            }
            var params = this.options.params || {};
            params.skip = this.skip;
            params.limit = this.options.limit;

            this.isBusy = true;
            this.loadMoreBar.loading();
            // http request api-data
            _http2.default.get(this.options.url, params).then(function (res) {
                if (res.status !== 200) {
                    _this.loadMoreBar.tip();
                } else {
                    var body = res.body;
                    var items = body.data;
                    if (!body.pagination.after || items.length < _this.options.limit) {
                        // all data load completely
                        _this.loadMoreBar.hide();
                        _this.isCompleted = true;
                    } else {
                        _this.loadMoreBar.reset();
                        // set skip for the next load
                        _this.skip = body.pagination.after;
                    }

                    // data notify
                    if (_this.options.onDataReceived) {
                        _this.options.onDataReceived(items);
                    }
                }

                _this.isBusy = false;
            }).catch(function () {
                _this.loadMoreBar.tip();
                _this.isBusy = false;
            });
        }

        /**
         * on scroll event handler
         */

    }, {
        key: 'onScroll',
        value: function onScroll(e) {
            var _this2 = this;

            var $target = $(e.target);
            if ($target.scrollTop() + $target.height() >= $target.prop('scrollHeight') && !this.isBusy && !this.isCompleted) {

                // show loading bar
                this.loadMoreBar.loading();
                // load next page
                setTimeout(function () {
                    _this2.load();
                }, this.options.delay);
            }
        }
    }]);

    return Infinite;
}();

/**********************************************
 * load more bar
 **********************************************/


var LoadMoreBar = function () {
    function LoadMoreBar(options) {
        _classCallCheck(this, LoadMoreBar);

        this.footerLoadingText = options.footerLoadingText;
        this.footerMoreText = options.footerMoreText;
        this.footerClickText = options.footerClickText;

        this.onClick = options.onClick;
    }

    _createClass(LoadMoreBar, [{
        key: 'render',
        value: function render(parentEl) {
            this.$el = $(document.createElement('div'));
            this.$el.addClass('load-more-bar').html('<i class="spinner iconfont icon-loading"/>&nbsp;\n            <div class="text">&nbsp;</div>');
            parentEl.append(this.$el);

            this.hide();

            // load more click event
            this.$el.click(this.onClick);
            return this;
        }
    }, {
        key: 'loading',
        value: function loading() {
            this.$el.show();
            this.$el.find('.spinner').show();
            this.$el.find('.text').text(this.footerLoadingText);
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.$el.find('.text').text(this.footerMoreText);
            this.$el.hide();
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.$el.show();
            this.$el.find('.spinner').hide();
            this.$el.find('.text').text(this.footerMoreText);
        }
    }, {
        key: 'tip',
        value: function tip() {
            this.$el.show();
            this.$el.find('.spinner').hide();
            this.$el.find('.text').text(this.footerClickText);
        }
    }]);

    return LoadMoreBar;
}();

exports.default = Infinite;

},{"../http":16}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cartStore = require('script/cart-store');

var _cartStore2 = _interopRequireDefault(_cartStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import template from './cart-item.html';


var CartItem = function (_Backbone$View) {
    _inherits(CartItem, _Backbone$View);

    function CartItem(data, handler) {
        _classCallCheck(this, CartItem);

        var _this = _possibleConstructorReturn(this, (CartItem.__proto__ || Object.getPrototypeOf(CartItem)).call(this, {
            tagName: 'li',
            className: 'cart-item',
            events: {
                'click .icon-reduce': 'onReduce',
                'click .icon-add': 'onAdd'
            }
        }));

        _this.template = _.template('<div class="inner">\n                <div class="thumbnail" style="background-image: url(<%=thumbnail%>);"></div>\n                <div class="info">\n                    <div class="name"><%=title%></div>\n            \n                    <div class="action">\n                        <div class="price">\n                            <span class="unit">$</span>\n                            <span class="text"><%=price%></span>\n                        </div>\n                        <div class="options">\n                            <div class="option iconfont icon-reduce"></div>\n                            <div class="total">x <span><%=count%></span></div>\n                            <div class="option iconfont icon-add" style="margin-top: 6px;"></div>\n                        </div>\n                    </div>\n                </div>\n            </div>');

        _this.data = data;
        _this.handler = handler;
        return _this;
    }

    _createClass(CartItem, [{
        key: 'render',
        value: function render() {
            this.$el.html(this.template(this.data));
            return this;
        }

        /**
         * on reduce event
         */

    }, {
        key: 'onReduce',
        value: function onReduce() {
            var count = this.data.count;
            if (count - 1 < 0) {
                return;
            }

            var result = _cartStore2.default.decrease(this.data);
            if (result) {
                this.$el.find('.action .options .total span').text(this.data.count);
            }
            this.handler.send(1000);
        }

        /**
         * on add event
         */

    }, {
        key: 'onAdd',
        value: function onAdd() {
            var result = _cartStore2.default.increase(this.data);
            if (result) {
                this.$el.find('.action .options .total span').text(this.data.count);
            }
            this.handler.send(1000);
        }
    }]);

    return CartItem;
}(Backbone.View);

exports.default = CartItem;

},{"script/cart-store":13}],20:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="wrapper">\n\t<div class="title-bar">\n\t\t<i class="iconfont icon-back"/>\n\t\t<div class="title">Shopping Cart</div>\n\t</div>\n\n\t<div class="user-box">\n\t\t<div class="avatar" style="background-image: url(/static/image/avatar.jpg);"></div>\n\t\t<div class="name">Fedor.Jia</div>\n\t</div>\n\n\t';
 if(productAmount > 0) { 
__p+='\n\t\t<ul class="items"></ul>\n\n\t\t<ul class="amount-box">\n\t\t\t<li>\n\t\t\t\t<div class="label">Product Amount</div>\n\t\t\t\t<div class="value product-amount">$ '+
((__t=(productAmount))==null?'':__t)+
'</div>\n\t\t\t</li>\n\t\t\t<li>\n\t\t\t\t<div class="label">Freight</div>\n\t\t\t\t<div class="value">$ '+
((__t=(freight))==null?'':__t)+
'</div>\n\t\t\t</li>\n\t\t</ul>\n\t';
 } else { 
__p+='\n\t\t<div class="empty-tip">Nothing ...</div>\n\t';
 } 
__p+='\n</div>\n\n';
 if(productAmount > 0) { 
__p+='\n<div class="footer-box">\n\t<div class="total-amount">Total Amount: $ <span>'+
((__t=(amount))==null?'':__t)+
'</span></div>\n\t<div class="btn-buy">Pay</div>\n</div>\n';
 } 
__p+='\n';
}
return __p;
};

},{}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _config = require('framework/config');

var _config2 = _interopRequireDefault(_config);

var _component = require('component');

var _component2 = _interopRequireDefault(_component);

var _handler = require('script/handler');

var _handler2 = _interopRequireDefault(_handler);

var _cart = require('./cart.html');

var _cart2 = _interopRequireDefault(_cart);

var _cartStore = require('script/cart-store');

var _cartStore2 = _interopRequireDefault(_cartStore);

var _cartItem = require('./cart-item');

var _cartItem2 = _interopRequireDefault(_cartItem);

var _confirm = require('script/widget/confirm');

var _confirm2 = _interopRequireDefault(_confirm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import Alert from 'alert';


var Cart = function (_Component) {
    _inherits(Cart, _Component);

    function Cart() {
        _classCallCheck(this, Cart);

        var _this = _possibleConstructorReturn(this, (Cart.__proto__ || Object.getPrototypeOf(Cart)).call(this, {
            className: 'cart-view',
            events: {
                'click .icon-back': 'onBack',
                'click .btn-buy': 'onBuy'
            }
        }));

        _this.freight = 5;
        // message handler
        _this.hander = new _handler2.default(_this.onMsgReceived.bind(_this));
        return _this;
    }

    _createClass(Cart, [{
        key: 'viewWillDisappear',
        value: function viewWillDisappear() {}
    }, {
        key: 'viewDidAppear',
        value: function viewDidAppear() {}
    }, {
        key: 'render',
        value: function render() {
            _get(Cart.prototype.__proto__ || Object.getPrototypeOf(Cart.prototype), 'render', this).call(this);
            this.loadData();
            return this;
        }
    }, {
        key: 'loadData',
        value: function loadData() {
            this.setup(_cartStore2.default.get());
        }
    }, {
        key: 'setup',
        value: function setup(items) {
            var productAmount = 0;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    productAmount += item.count * item.price;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            this.$el.html((0, _cart2.default)({
                productAmount: productAmount,
                freight: this.freight,
                amount: productAmount + this.freight
            }));

            var $items = this.$el.find('.items');
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _item = _step2.value;

                    var itemView = new _cartItem2.default(_item, this.hander);
                    $items.append(itemView.render().el);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }, {
        key: 'refreshAmounts',
        value: function refreshAmounts() {
            var items = _cartStore2.default.get();
            var productAmount = 0;
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = items[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var item = _step3.value;

                    productAmount += item.count * item.price;
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            var $productAmount = this.$el.find('.amount-box .product-amount');
            var $amount = this.$el.find('.footer-box .total-amount span');
            $productAmount.text(productAmount);
            $amount.text(productAmount + this.freight);
        }

        /**************************** events ***************************/
        /**
         * on message received
         */

    }, {
        key: 'onMsgReceived',
        value: function onMsgReceived(which, args) {
            switch (which) {
                // refresh amounts
                case 1000:
                    {
                        this.refreshAmounts();
                        break;
                    }
            }
        }
    }, {
        key: 'onBack',
        value: function onBack() {
            if (_config2.default.isActiveRouter) {
                history.go(-1);
            } else {
                APP.viewport.pop();
            }
        }
    }, {
        key: 'onBuy',
        value: function onBuy() {
            var items = _cartStore2.default.get();
            if (items.length > 0) {
                // Alert.show('this is alert');
                _confirm2.default.show('Pay', {
                    content: 'Pay for this shopping, Are you sure?',
                    onSelect: function onSelect(index) {}
                });
            }
        }
    }]);

    return Cart;
}(_component2.default);

exports.default = Cart;

},{"./cart-item":19,"./cart.html":20,"component":"component","framework/config":4,"script/cart-store":13,"script/handler":15,"script/widget/confirm":17}],22:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="wrapper">\n    <ul class="items"></ul>\n</div>\n';
}
return __p;
};

},{}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _component = require('component');

var _component2 = _interopRequireDefault(_component);

var _handler = require('script/handler');

var _handler2 = _interopRequireDefault(_handler);

var _infinite = require('script/widget/infinite');

var _infinite2 = _interopRequireDefault(_infinite);

var _home = require('./home.html');

var _home2 = _interopRequireDefault(_home);

var _productItem = require('./product-item');

var _productItem2 = _interopRequireDefault(_productItem);

var _cartOverlay = require('../../script/component/cart-overlay');

var _cartOverlay2 = _interopRequireDefault(_cartOverlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HomeView = function (_Component) {
    _inherits(HomeView, _Component);

    // initialize() {
    //     super.initialize();
    //     this.constructor.__super__.initialize.apply(this);
    // }
    function HomeView() {
        _classCallCheck(this, HomeView);

        // message handler
        var _this = _possibleConstructorReturn(this, (HomeView.__proto__ || Object.getPrototypeOf(HomeView)).call(this, {
            className: 'home-view',
            events: {}
        }));

        _this.hander = new _handler2.default(_this.onMsgReceived.bind(_this));

        // infinite
        _this.infinite = new _infinite2.default({
            url: '/api/list',
            limit: 10,
            onDataReceived: _this.setup.bind(_this)
        });

        // cart overaly
        _this.cartOverlay = new _cartOverlay2.default();
        return _this;
    }

    /**
     * view did appear lifecycle
     */


    _createClass(HomeView, [{
        key: 'viewDidAppear',
        value: function viewDidAppear() {
            // when home view did appear, remove all views from cahce except home view
            APP.viewport.index();
            this.cartOverlay.refresh();
        }

        /**
         * mount ui
         */

    }, {
        key: 'render',
        value: function render() {
            _get(HomeView.prototype.__proto__ || Object.getPrototypeOf(HomeView.prototype), 'render', this).call(this);
            // render view
            this.$el.html((0, _home2.default)());
            // render infinite
            this.infinite.render(this.$el.find('.wrapper'));
            // render cartOverlay
            this.$el.append(this.cartOverlay.render().el);
            return this;
        }

        /**
         * setup ui
         */

    }, {
        key: 'setup',
        value: function setup(items) {
            var $items = this.$el.find('.items');
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    var itemView = new _productItem2.default(item, this.hander);
                    $items.append(itemView.render().el);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }

        /**
         * on message received
         */

    }, {
        key: 'onMsgReceived',
        value: function onMsgReceived(which, args) {
            switch (which) {
                // refresh count
                case 1000:
                    {
                        this.cartOverlay.refresh();
                        break;
                    }
            }
        }
    }]);

    return HomeView;
}(_component2.default);

exports.default = HomeView;

},{"../../script/component/cart-overlay":14,"./home.html":22,"./product-item":24,"component":"component","script/handler":15,"script/widget/infinite":18}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cartStore = require('script/cart-store');

var _cartStore2 = _interopRequireDefault(_cartStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import template from './product-item.html';


var ProductItem = function (_Backbone$View) {
    _inherits(ProductItem, _Backbone$View);

    function ProductItem(data, handler) {
        _classCallCheck(this, ProductItem);

        var _this = _possibleConstructorReturn(this, (ProductItem.__proto__ || Object.getPrototypeOf(ProductItem)).call(this, {
            tagName: 'li',
            className: 'product-item',
            events: {
                'click .icon-reduce': 'onReduce',
                'click .icon-add': 'onAdd'
            }
        }));

        _this.template = _.template('<div class="item-inner">\n                <div class="thumbnail cover" style="background-image:url(<%=thumbnail%>)"></div>\n                <div class="name"><%=title%></div>\n            \n                <div class="footer-box">\n                    <div class="price">\n                        <span class="unit">$</span>\n                        <span class="text"><%=price%></span>\n                    </div>\n                    <div class="options">\n                        <div class="option iconfont icon-reduce"></div>\n                        <div class="option iconfont icon-add" style="margin-top: 4px;"></div>\n                    </div>\n                </div>\n            </div>');

        _this.data = data;
        _this.handler = handler;
        return _this;
    }

    _createClass(ProductItem, [{
        key: 'render',
        value: function render() {
            this.$el.html(this.template(this.data));
            return this;
        }

        /**
         * on reduce event
         */

    }, {
        key: 'onReduce',
        value: function onReduce() {
            var result = _cartStore2.default.decrease(this.data);
            if (result) {
                this.handler.send(1000);
            }
        }

        /**
         * on add event
         */

    }, {
        key: 'onAdd',
        value: function onAdd() {
            var result = _cartStore2.default.increase(this.data);
            if (result) {
                this.handler.send(1000);
            }
        }
    }]);

    return ProductItem;
}(Backbone.View);

exports.default = ProductItem;

},{"script/cart-store":13}],"component":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/***
 * Generic Component
 */
var Component = function (_Backbone$View) {
	_inherits(Component, _Backbone$View);

	function Component() {
		_classCallCheck(this, Component);

		return _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).apply(this, arguments));
	}

	_createClass(Component, [{
		key: 'render',


		/***** lifecycle ****/

		value: function render() {
			this.$el.addClass('view');
			$('body').append(this.$el);
			return this;
		}
	}, {
		key: 'viewDidAppear',
		value: function viewDidAppear() {}
	}, {
		key: 'viewWillDisappear',
		value: function viewWillDisappear() {}
	}, {
		key: 'remove',
		value: function remove() {
			this.$el.remove();
		}
	}]);

	return Component;
}(Backbone.View);

exports.default = Component;

},{}],"modal":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _anime = require('../anime');

var _viewport = require('../viewport');

var _viewport2 = _interopRequireDefault(_viewport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/***
 * Generic Modal
 */
var Modal = function (_Backbone$View) {
    _inherits(Modal, _Backbone$View);

    function Modal(options) {
        _classCallCheck(this, Modal);

        var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, options));

        _this.options = Object.assign({}, Modal.defaults, options);
        _this.render();
        return _this;
    }

    _createClass(Modal, [{
        key: 'didAppear',
        value: function didAppear() {}
    }, {
        key: 'willDisappear',
        value: function willDisappear() {}
    }, {
        key: 'render',
        value: function render() {
            var $el = this.$el;
            var $modal = $(document.createElement('div'));

            $el.addClass('modal-overlay');
            $modal.addClass('modal');
            this.$el.append($modal);

            if (this.options.dismissOnBlur) {
                this.$el.on('click', this.dismiss.bind(this));
            }

            return this;
        }
    }, {
        key: 'show',
        value: function show($inner) {
            var _this2 = this;

            var $body = $('body');
            var $modal = this.$el.find('.modal');

            this.$el.show();
            $modal.html($inner);
            $body.append(this.$el);

            if (this.options.animation === 'none') {
                this.$el.css({ opacity: 1 });
                this.didAppear();
            } else {
                this.$el.css({ display: 'block' });
                (0, _anime.fadeIn)(this.$el.get(0), {
                    duration: this.options.duration,
                    complete: function complete() {
                        _this2.didAppear();
                    }
                });
            }

            _viewport2.default.setActiveModal(this);
        }
    }, {
        key: 'dismiss',
        value: function dismiss(event) {
            var _this3 = this;

            if (event && !$(event.target).hasClass('modal')) {
                return;
            }
            this.willDisappear();

            (0, _anime.fadeOut)(this.$el.get(0), {
                duration: this.options.duration,
                complete: function complete() {
                    _this3.$el.remove();
                }
            });

            _viewport2.default.setActiveModal(null);
        }
    }]);

    return Modal;
}(Backbone.View);

Modal.defaults = {
    duration: 240,
    dismissOnBlur: false,
    animation: 'transition.fadeIn' // none, transition.fadeIn, transition.shrinkIn
};
exports.default = Modal;

},{"../anime":3,"../viewport":11}]},{},[2]);
