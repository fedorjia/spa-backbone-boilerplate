require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/get-iterator"), __esModule: true };
},{"core-js/library/fn/get-iterator":19}],2:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/json/stringify"), __esModule: true };
},{"core-js/library/fn/json/stringify":20}],3:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":21}],4:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/create"), __esModule: true };
},{"core-js/library/fn/object/create":22}],5:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":23}],6:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/get-own-property-descriptor"), __esModule: true };
},{"core-js/library/fn/object/get-own-property-descriptor":24}],7:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/get-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/get-prototype-of":25}],8:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/keys"), __esModule: true };
},{"core-js/library/fn/object/keys":26}],9:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/set-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/set-prototype-of":27}],10:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol"), __esModule: true };
},{"core-js/library/fn/symbol":28}],11:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol/iterator"), __esModule: true };
},{"core-js/library/fn/symbol/iterator":29}],12:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
},{}],13:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _defineProperty = require("../core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
},{"../core-js/object/define-property":5}],14:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _assign = require("../core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};
},{"../core-js/object/assign":3}],15:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _getPrototypeOf = require("../core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = require("../core-js/object/get-own-property-descriptor");

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

  if (desc === undefined) {
    var parent = (0, _getPrototypeOf2.default)(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};
},{"../core-js/object/get-own-property-descriptor":6,"../core-js/object/get-prototype-of":7}],16:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _setPrototypeOf = require("../core-js/object/set-prototype-of");

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require("../core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _typeof2 = require("../helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};
},{"../core-js/object/create":4,"../core-js/object/set-prototype-of":9,"../helpers/typeof":18}],17:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _typeof2 = require("../helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};
},{"../helpers/typeof":18}],18:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _iterator = require("../core-js/symbol/iterator");

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = require("../core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};
},{"../core-js/symbol":10,"../core-js/symbol/iterator":11}],19:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.get-iterator');

},{"../modules/core.get-iterator":90,"../modules/es6.string.iterator":100,"../modules/web.dom.iterable":104}],20:[function(require,module,exports){
var core = require('../../modules/_core');
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};

},{"../../modules/_core":36}],21:[function(require,module,exports){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/_core').Object.assign;

},{"../../modules/_core":36,"../../modules/es6.object.assign":92}],22:[function(require,module,exports){
require('../../modules/es6.object.create');
var $Object = require('../../modules/_core').Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};

},{"../../modules/_core":36,"../../modules/es6.object.create":93}],23:[function(require,module,exports){
require('../../modules/es6.object.define-property');
var $Object = require('../../modules/_core').Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};

},{"../../modules/_core":36,"../../modules/es6.object.define-property":94}],24:[function(require,module,exports){
require('../../modules/es6.object.get-own-property-descriptor');
var $Object = require('../../modules/_core').Object;
module.exports = function getOwnPropertyDescriptor(it, key) {
  return $Object.getOwnPropertyDescriptor(it, key);
};

},{"../../modules/_core":36,"../../modules/es6.object.get-own-property-descriptor":95}],25:[function(require,module,exports){
require('../../modules/es6.object.get-prototype-of');
module.exports = require('../../modules/_core').Object.getPrototypeOf;

},{"../../modules/_core":36,"../../modules/es6.object.get-prototype-of":96}],26:[function(require,module,exports){
require('../../modules/es6.object.keys');
module.exports = require('../../modules/_core').Object.keys;

},{"../../modules/_core":36,"../../modules/es6.object.keys":97}],27:[function(require,module,exports){
require('../../modules/es6.object.set-prototype-of');
module.exports = require('../../modules/_core').Object.setPrototypeOf;

},{"../../modules/_core":36,"../../modules/es6.object.set-prototype-of":98}],28:[function(require,module,exports){
require('../../modules/es6.symbol');
require('../../modules/es6.object.to-string');
require('../../modules/es7.symbol.async-iterator');
require('../../modules/es7.symbol.observable');
module.exports = require('../../modules/_core').Symbol;

},{"../../modules/_core":36,"../../modules/es6.object.to-string":99,"../../modules/es6.symbol":101,"../../modules/es7.symbol.async-iterator":102,"../../modules/es7.symbol.observable":103}],29:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/web.dom.iterable');
module.exports = require('../../modules/_wks-ext').f('iterator');

},{"../../modules/_wks-ext":87,"../../modules/es6.string.iterator":100,"../../modules/web.dom.iterable":104}],30:[function(require,module,exports){
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],31:[function(require,module,exports){
module.exports = function () { /* empty */ };

},{}],32:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":52}],33:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

},{"./_to-absolute-index":79,"./_to-iobject":81,"./_to-length":82}],34:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof');
var TAG = require('./_wks')('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

},{"./_cof":35,"./_wks":88}],35:[function(require,module,exports){
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],36:[function(require,module,exports){
var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],37:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":30}],38:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],39:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":44}],40:[function(require,module,exports){
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_global":45,"./_is-object":52}],41:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],42:[function(require,module,exports){
// all enumerable object keys, includes symbols
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};

},{"./_object-gops":66,"./_object-keys":69,"./_object-pie":70}],43:[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var ctx = require('./_ctx');
var hide = require('./_hide');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_core":36,"./_ctx":37,"./_global":45,"./_hide":47}],44:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],45:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],46:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],47:[function(require,module,exports){
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_descriptors":39,"./_object-dp":61,"./_property-desc":72}],48:[function(require,module,exports){
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":45}],49:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":39,"./_dom-create":40,"./_fails":44}],50:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":35}],51:[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

},{"./_cof":35}],52:[function(require,module,exports){
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],53:[function(require,module,exports){
'use strict';
var create = require('./_object-create');
var descriptor = require('./_property-desc');
var setToStringTag = require('./_set-to-string-tag');
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

},{"./_hide":47,"./_object-create":60,"./_property-desc":72,"./_set-to-string-tag":75,"./_wks":88}],54:[function(require,module,exports){
'use strict';
var LIBRARY = require('./_library');
var $export = require('./_export');
var redefine = require('./_redefine');
var hide = require('./_hide');
var has = require('./_has');
var Iterators = require('./_iterators');
var $iterCreate = require('./_iter-create');
var setToStringTag = require('./_set-to-string-tag');
var getPrototypeOf = require('./_object-gpo');
var ITERATOR = require('./_wks')('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

},{"./_export":43,"./_has":46,"./_hide":47,"./_iter-create":53,"./_iterators":56,"./_library":57,"./_object-gpo":67,"./_redefine":73,"./_set-to-string-tag":75,"./_wks":88}],55:[function(require,module,exports){
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],56:[function(require,module,exports){
module.exports = {};

},{}],57:[function(require,module,exports){
module.exports = true;

},{}],58:[function(require,module,exports){
var META = require('./_uid')('meta');
var isObject = require('./_is-object');
var has = require('./_has');
var setDesc = require('./_object-dp').f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !require('./_fails')(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};

},{"./_fails":44,"./_has":46,"./_is-object":52,"./_object-dp":61,"./_uid":85}],59:[function(require,module,exports){
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
var toObject = require('./_to-object');
var IObject = require('./_iobject');
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || require('./_fails')(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;

},{"./_fails":44,"./_iobject":50,"./_object-gops":66,"./_object-keys":69,"./_object-pie":70,"./_to-object":83}],60:[function(require,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = require('./_an-object');
var dPs = require('./_object-dps');
var enumBugKeys = require('./_enum-bug-keys');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":32,"./_dom-create":40,"./_enum-bug-keys":41,"./_html":48,"./_object-dps":62,"./_shared-key":76}],61:[function(require,module,exports){
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":32,"./_descriptors":39,"./_ie8-dom-define":49,"./_to-primitive":84}],62:[function(require,module,exports){
var dP = require('./_object-dp');
var anObject = require('./_an-object');
var getKeys = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

},{"./_an-object":32,"./_descriptors":39,"./_object-dp":61,"./_object-keys":69}],63:[function(require,module,exports){
var pIE = require('./_object-pie');
var createDesc = require('./_property-desc');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var has = require('./_has');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};

},{"./_descriptors":39,"./_has":46,"./_ie8-dom-define":49,"./_object-pie":70,"./_property-desc":72,"./_to-iobject":81,"./_to-primitive":84}],64:[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./_to-iobject');
var gOPN = require('./_object-gopn').f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_object-gopn":65,"./_to-iobject":81}],65:[function(require,module,exports){
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = require('./_object-keys-internal');
var hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};

},{"./_enum-bug-keys":41,"./_object-keys-internal":68}],66:[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;

},{}],67:[function(require,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = require('./_has');
var toObject = require('./_to-object');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

},{"./_has":46,"./_shared-key":76,"./_to-object":83}],68:[function(require,module,exports){
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

},{"./_array-includes":33,"./_has":46,"./_shared-key":76,"./_to-iobject":81}],69:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_enum-bug-keys":41,"./_object-keys-internal":68}],70:[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;

},{}],71:[function(require,module,exports){
// most Object methods by ES6 should accept primitives
var $export = require('./_export');
var core = require('./_core');
var fails = require('./_fails');
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};

},{"./_core":36,"./_export":43,"./_fails":44}],72:[function(require,module,exports){
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],73:[function(require,module,exports){
module.exports = require('./_hide');

},{"./_hide":47}],74:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = require('./_is-object');
var anObject = require('./_an-object');
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = require('./_ctx')(Function.call, require('./_object-gopd').f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

},{"./_an-object":32,"./_ctx":37,"./_is-object":52,"./_object-gopd":63}],75:[function(require,module,exports){
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_has":46,"./_object-dp":61,"./_wks":88}],76:[function(require,module,exports){
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":77,"./_uid":85}],77:[function(require,module,exports){
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};

},{"./_global":45}],78:[function(require,module,exports){
var toInteger = require('./_to-integer');
var defined = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

},{"./_defined":38,"./_to-integer":80}],79:[function(require,module,exports){
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":80}],80:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],81:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_defined":38,"./_iobject":50}],82:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":80}],83:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":38}],84:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":52}],85:[function(require,module,exports){
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],86:[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var LIBRARY = require('./_library');
var wksExt = require('./_wks-ext');
var defineProperty = require('./_object-dp').f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};

},{"./_core":36,"./_global":45,"./_library":57,"./_object-dp":61,"./_wks-ext":87}],87:[function(require,module,exports){
exports.f = require('./_wks');

},{"./_wks":88}],88:[function(require,module,exports){
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_global":45,"./_shared":77,"./_uid":85}],89:[function(require,module,exports){
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"./_classof":34,"./_core":36,"./_iterators":56,"./_wks":88}],90:[function(require,module,exports){
var anObject = require('./_an-object');
var get = require('./core.get-iterator-method');
module.exports = require('./_core').getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};

},{"./_an-object":32,"./_core":36,"./core.get-iterator-method":89}],91:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./_add-to-unscopables');
var step = require('./_iter-step');
var Iterators = require('./_iterators');
var toIObject = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"./_add-to-unscopables":31,"./_iter-define":54,"./_iter-step":55,"./_iterators":56,"./_to-iobject":81}],92:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', { assign: require('./_object-assign') });

},{"./_export":43,"./_object-assign":59}],93:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: require('./_object-create') });

},{"./_export":43,"./_object-create":60}],94:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', { defineProperty: require('./_object-dp').f });

},{"./_descriptors":39,"./_export":43,"./_object-dp":61}],95:[function(require,module,exports){
// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = require('./_to-iobject');
var $getOwnPropertyDescriptor = require('./_object-gopd').f;

require('./_object-sap')('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});

},{"./_object-gopd":63,"./_object-sap":71,"./_to-iobject":81}],96:[function(require,module,exports){
// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = require('./_to-object');
var $getPrototypeOf = require('./_object-gpo');

require('./_object-sap')('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});

},{"./_object-gpo":67,"./_object-sap":71,"./_to-object":83}],97:[function(require,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object');
var $keys = require('./_object-keys');

require('./_object-sap')('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});

},{"./_object-keys":69,"./_object-sap":71,"./_to-object":83}],98:[function(require,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = require('./_export');
$export($export.S, 'Object', { setPrototypeOf: require('./_set-proto').set });

},{"./_export":43,"./_set-proto":74}],99:[function(require,module,exports){

},{}],100:[function(require,module,exports){
'use strict';
var $at = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

},{"./_iter-define":54,"./_string-at":78}],101:[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var global = require('./_global');
var has = require('./_has');
var DESCRIPTORS = require('./_descriptors');
var $export = require('./_export');
var redefine = require('./_redefine');
var META = require('./_meta').KEY;
var $fails = require('./_fails');
var shared = require('./_shared');
var setToStringTag = require('./_set-to-string-tag');
var uid = require('./_uid');
var wks = require('./_wks');
var wksExt = require('./_wks-ext');
var wksDefine = require('./_wks-define');
var enumKeys = require('./_enum-keys');
var isArray = require('./_is-array');
var anObject = require('./_an-object');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var createDesc = require('./_property-desc');
var _create = require('./_object-create');
var gOPNExt = require('./_object-gopn-ext');
var $GOPD = require('./_object-gopd');
var $DP = require('./_object-dp');
var $keys = require('./_object-keys');
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f = $propertyIsEnumerable;
  require('./_object-gops').f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !require('./_library')) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

},{"./_an-object":32,"./_descriptors":39,"./_enum-keys":42,"./_export":43,"./_fails":44,"./_global":45,"./_has":46,"./_hide":47,"./_is-array":51,"./_library":57,"./_meta":58,"./_object-create":60,"./_object-dp":61,"./_object-gopd":63,"./_object-gopn":65,"./_object-gopn-ext":64,"./_object-gops":66,"./_object-keys":69,"./_object-pie":70,"./_property-desc":72,"./_redefine":73,"./_set-to-string-tag":75,"./_shared":77,"./_to-iobject":81,"./_to-primitive":84,"./_uid":85,"./_wks":88,"./_wks-define":86,"./_wks-ext":87}],102:[function(require,module,exports){
require('./_wks-define')('asyncIterator');

},{"./_wks-define":86}],103:[function(require,module,exports){
require('./_wks-define')('observable');

},{"./_wks-define":86}],104:[function(require,module,exports){
require('./es6.array.iterator');
var global = require('./_global');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var TO_STRING_TAG = require('./_wks')('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

},{"./_global":45,"./_hide":47,"./_iterators":56,"./_wks":88,"./es6.array.iterator":91}],105:[function(require,module,exports){
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

},{}],106:[function(require,module,exports){
'use strict';

var _viewport = require('./framework/viewport');

var _viewport2 = _interopRequireDefault(_viewport);

var _router = require('./framework/router');

var _router2 = _interopRequireDefault(_router);

var _config = require('./framework/config');

var _config2 = _interopRequireDefault(_config);

var _home = require('./page/home');

var _home2 = _interopRequireDefault(_home);

var _routers = require('./routers');

var _routers2 = _interopRequireDefault(_routers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.APP = {};

$(function () {
       APP.viewport = _viewport2.default;
       APP.router = _router2.default;

       if (_config2.default.isActiveRouter) {
              _router2.default.start(_routers2.default);
       } else {
              _viewport2.default.fly(_home2.default);
       }
}());

},{"./framework/config":107,"./framework/router":112,"./framework/viewport":114,"./page/home":119,"./routers":121}],107:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    isActiveRouter: true,
    pushState: true
};

},{}],108:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FadeTransition = function () {
    function FadeTransition(currentView, targetView) {
        (0, _classCallCheck3.default)(this, FadeTransition);

        this.currentView = currentView;
        this.targetView = targetView;
    }

    (0, _createClass3.default)(FadeTransition, [{
        key: 'push',
        value: function push(callback) {
            if (this.currentView) {
                this.currentView.$el.velocity('fadeOut', FadeTransition.duration);
            }

            this.targetView.render();
            this.targetView.$el.velocity('fadeIn', {
                delay: FadeTransition.duration / 4,
                duration: FadeTransition.duration,
                complete: function complete() {
                    if (callback) {
                        callback();
                    }
                }
            });
        }
    }, {
        key: 'pop',
        value: function pop(callback) {
            if (this.currentView) {
                this.currentView.$el.velocity('fadeOut', FadeTransition.duration);
            }

            this.targetView.$el.velocity('fadeIn', {
                delay: FadeTransition.duration / 4,
                duration: FadeTransition.duration,
                complete: function complete() {
                    if (callback) {
                        callback();
                    }
                }
            });
        }
    }]);
    return FadeTransition;
}();

FadeTransition.type = 'fade';
FadeTransition.duration = 320;
exports.default = FadeTransition;

},{"babel-runtime/helpers/classCallCheck":12,"babel-runtime/helpers/createClass":13}],109:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NoneTransition = function () {
    function NoneTransition(currentView, targetView) {
        (0, _classCallCheck3.default)(this, NoneTransition);

        this.currentView = currentView;
        this.targetView = targetView;
    }

    (0, _createClass3.default)(NoneTransition, [{
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

},{"babel-runtime/helpers/classCallCheck":12,"babel-runtime/helpers/createClass":13}],110:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SlideHorizontalTransition = function () {
    function SlideHorizontalTransition(currentView, targetView) {
        (0, _classCallCheck3.default)(this, SlideHorizontalTransition);

        this.currentView = currentView;
        this.targetView = targetView;
    }

    (0, _createClass3.default)(SlideHorizontalTransition, [{
        key: 'push',
        value: function push(callback) {
            if (this.currentView) {
                this.currentView.$el.velocity('fadeOut', SlideHorizontalTransition.duration);
            }

            var delay = this.currentView ? SlideHorizontalTransition.duration / 4 : 0;

            this.targetView.render();

            this.targetView.$el.velocity('transition.slideRightIn', {
                delay: delay,
                duration: SlideHorizontalTransition.duration,
                complete: function complete() {
                    if (callback) {
                        callback();
                    }
                }
            });
        }
    }, {
        key: 'pop',
        value: function pop(callback) {
            if (this.currentView) {
                this.currentView.$el.velocity('fadeOut', SlideHorizontalTransition.duration);
            }

            var delay = this.currentView ? SlideHorizontalTransition.duration / 4 : 0;

            this.targetView.$el.velocity('transition.slideLeftIn', {
                delay: delay,
                duration: SlideHorizontalTransition.duration,
                complete: function complete() {
                    if (callback) {
                        callback();
                    }
                }
            });
        }
    }]);
    return SlideHorizontalTransition;
}();

SlideHorizontalTransition.type = 'slide-h';
SlideHorizontalTransition.duration = 320;
exports.default = SlideHorizontalTransition;

},{"babel-runtime/helpers/classCallCheck":12,"babel-runtime/helpers/createClass":13}],111:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SlideVerticalTransition = function () {
    function SlideVerticalTransition(currentView, targetView) {
        (0, _classCallCheck3.default)(this, SlideVerticalTransition);

        this.currentView = currentView;
        this.targetView = targetView;
    }

    (0, _createClass3.default)(SlideVerticalTransition, [{
        key: 'push',
        value: function push(callback) {
            var _this = this;

            var delay = this.currentView ? SlideVerticalTransition.duration / 4 : 0;

            this.targetView.render();

            this.targetView.$el.velocity('transition.slideUpIn', {
                delay: delay,
                duration: SlideVerticalTransition.duration,
                complete: function complete() {
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
            var delay = this.currentView ? SlideVerticalTransition.duration / 4 : 0;
            this.targetView.$el.css({ opacity: 1, display: 'block' });

            if (this.currentView) {
                this.currentView.$el.velocity('transition.slideDownOut', {
                    delay: delay,
                    duration: SlideVerticalTransition.duration,
                    complete: function complete() {
                        if (callback) {
                            callback();
                        }
                    }
                });
            }
        }
    }]);
    return SlideVerticalTransition;
}();

SlideVerticalTransition.type = 'slide-v';
SlideVerticalTransition.duration = 320;
exports.default = SlideVerticalTransition;

},{"babel-runtime/helpers/classCallCheck":12,"babel-runtime/helpers/createClass":13}],112:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _viewport = require('./viewport');

var _viewport2 = _interopRequireDefault(_viewport);

var _transition = require('./transition');

var _transition2 = _interopRequireDefault(_transition);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = {
    start: function start(routers) {
        var AppRouter = Backbone.Router.extend((0, _extends3.default)({}, routers, {
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

        Backbone.history.start({ pushState: _config2.default.pushState, root: '/' });


        return this;
    },

    nav: function nav(path, params, animation, trigger) {
        this.appRouter.nav(path, params, animation, trigger);
    },
    fly: function fly(view, params) {
        params = params || {};
        (0, _assign2.default)(params, this.appRouter.params || {});

        _viewport2.default.fly(view, params);
        this.appRouter.params = null;
    }
};

exports.default = router;

},{"./config":107,"./transition":113,"./viewport":114,"babel-runtime/core-js/object/assign":3,"babel-runtime/helpers/extends":14}],113:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _NoneTransition = require('./plugin/transition/NoneTransition');

var _NoneTransition2 = _interopRequireDefault(_NoneTransition);

var _FadeTransition = require('./plugin/transition/FadeTransition');

var _FadeTransition2 = _interopRequireDefault(_FadeTransition);

var _SlideHorizontalTransition = require('./plugin/transition/SlideHorizontalTransition');

var _SlideHorizontalTransition2 = _interopRequireDefault(_SlideHorizontalTransition);

var _SlideVerticalTransition = require('./plugin/transition/SlideVerticalTransition');

var _SlideVerticalTransition2 = _interopRequireDefault(_SlideVerticalTransition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transition = {

	defaultAnimation: 'none', get: function get(currentView, targetView, animation) {
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

},{"./plugin/transition/FadeTransition":108,"./plugin/transition/NoneTransition":109,"./plugin/transition/SlideHorizontalTransition":110,"./plugin/transition/SlideVerticalTransition":111}],114:[function(require,module,exports){
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

var manager = {
	fly: function fly(defination, args) {
		args = args || {};
		if (!args.__animation__) {
			args.__animation__ = _transition2.default.defaultAnimation;
		}

		if (activeModal) {
			activeModal.dismiss();
		}

		var len = viewCache.length;
		if (len === 0) {
			this.push(defination, args);
		} else {
			var cacheItem = getCacheItemByDefination(defination);
			if (!cacheItem) {
				this.push(defination, args);
			} else {
				var currentCacheItem = viewCache[len - 1];
				if (currentCacheItem.key === getKey(defination)) {
					this.replace(defination, args);
				} else {
					if (len === 1) {
						throw new Error('cache size incorrect');
					}
					var prevCacheItem = viewCache[len - 2];
					if (prevCacheItem.key === getKey(defination)) {
						this.pop(args);
					} else {
						this.popTo(cacheItem.key, args);
					}
				}
			}
		}
	},

	push: function push(defination, args) {
		var targetView = new defination(args);
		var currentView = getCurrentView();
		var animation = args.__animation__;

		var tran = _transition2.default.get(currentView, targetView, animation);
		if (currentView) {
			currentView.viewWillDisappear();
		}

		tran['push'](function () {
			targetView.__animation__ = args.__animation__;
			if (_config2.default.isActiveRouter) {
				targetView.router = _router2.default.appRouter;
			}

			viewCache.push({ key: getKey(defination), value: targetView });
			targetView.viewDidAppear();
		});
	},
	replace: function replace(defination, args) {
		var len = viewCache.length;
		var targetView = new defination(args);
		var currentView = getCurrentView();
		var tran = _transition2.default.get(currentView, targetView);

		currentView.viewWillDisappear();

		tran['push'](function () {
			targetView.__animation__ = args.__animation__;
			if (_config2.default.isActiveRouter) {
				targetView.router = _router2.default.appRouter;
			}

			currentView.remove();
			viewCache.splice(len - 1, 1);

			viewCache.push({ key: getKey(defination), value: targetView });
			targetView.viewDidAppear();
		});
	},
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

		var tran = _transition2.default.get(currentView, targetView, animation);

		tran['pop'](function () {
			currentView.remove();
			viewCache.splice(len - 1, 1);
			targetView.viewDidAppear();
		});
	},
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

		var tran = _transition2.default.get(currentView, targetView, animation);

		tran['pop'](function () {
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

},{"./config":107,"./router":112,"./transition":113}],115:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _cartStore = require('../../script/cart-store');

var _cartStore2 = _interopRequireDefault(_cartStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CartItem = function (_Backbone$View) {
    (0, _inherits3.default)(CartItem, _Backbone$View);

    function CartItem(data, handler) {
        (0, _classCallCheck3.default)(this, CartItem);

        var _this = (0, _possibleConstructorReturn3.default)(this, (CartItem.__proto__ || (0, _getPrototypeOf2.default)(CartItem)).call(this, {
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

    (0, _createClass3.default)(CartItem, [{
        key: 'render',
        value: function render() {
            this.$el.html(this.template(this.data));
            return this;
        }
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

},{"../../script/cart-store":122,"babel-runtime/core-js/object/get-prototype-of":7,"babel-runtime/helpers/classCallCheck":12,"babel-runtime/helpers/createClass":13,"babel-runtime/helpers/inherits":16,"babel-runtime/helpers/possibleConstructorReturn":17}],116:[function(require,module,exports){
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

},{}],117:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _config = require('../../framework/config');

var _config2 = _interopRequireDefault(_config);

var _component = require('component');

var _component2 = _interopRequireDefault(_component);

var _handler = require('handler');

var _handler2 = _interopRequireDefault(_handler);

var _index = require('./index.html');

var _index2 = _interopRequireDefault(_index);

var _cartStore = require('../../script/cart-store');

var _cartStore2 = _interopRequireDefault(_cartStore);

var _cartItem = require('./cart-item');

var _cartItem2 = _interopRequireDefault(_cartItem);

var _confirm = require('confirm');

var _confirm2 = _interopRequireDefault(_confirm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Cart = function (_Component) {
    (0, _inherits3.default)(Cart, _Component);

    function Cart() {
        (0, _classCallCheck3.default)(this, Cart);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Cart.__proto__ || (0, _getPrototypeOf2.default)(Cart)).call(this, {
            className: 'cart-view',
            events: {
                'click .icon-back': 'onBack',
                'click .btn-buy': 'onBuy'
            }
        }));

        _this.freight = 5;

        _this.hander = new _handler2.default(_this.onMsgReceived.bind(_this));
        return _this;
    }

    (0, _createClass3.default)(Cart, [{
        key: 'viewWillDisappear',
        value: function viewWillDisappear() {}
    }, {
        key: 'viewDidAppear',
        value: function viewDidAppear() {}
    }, {
        key: 'render',
        value: function render() {
            (0, _get3.default)(Cart.prototype.__proto__ || (0, _getPrototypeOf2.default)(Cart.prototype), 'render', this).call(this);
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
                for (var _iterator = (0, _getIterator3.default)(items), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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

            this.$el.html((0, _index2.default)({
                productAmount: productAmount,
                freight: this.freight,
                amount: productAmount + this.freight
            }));

            var $items = this.$el.find('.items');
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = (0, _getIterator3.default)(items), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
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
                for (var _iterator3 = (0, _getIterator3.default)(items), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
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
    }, {
        key: 'onMsgReceived',
        value: function onMsgReceived(which, args) {
            switch (which) {
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

},{"../../framework/config":107,"../../script/cart-store":122,"./cart-item":115,"./index.html":116,"babel-runtime/core-js/get-iterator":1,"babel-runtime/core-js/object/get-prototype-of":7,"babel-runtime/helpers/classCallCheck":12,"babel-runtime/helpers/createClass":13,"babel-runtime/helpers/get":15,"babel-runtime/helpers/inherits":16,"babel-runtime/helpers/possibleConstructorReturn":17,"component":"component","confirm":"confirm","handler":"handler"}],118:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="wrapper">\n    <ul class="items"></ul>\n</div>\n';
}
return __p;
};

},{}],119:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _component = require('component');

var _component2 = _interopRequireDefault(_component);

var _handler = require('handler');

var _handler2 = _interopRequireDefault(_handler);

var _infinite = require('infinite');

var _infinite2 = _interopRequireDefault(_infinite);

var _index = require('./index.html');

var _index2 = _interopRequireDefault(_index);

var _productItem = require('./product-item');

var _productItem2 = _interopRequireDefault(_productItem);

var _cartOverlay = require('../../script/component/cart-overlay');

var _cartOverlay2 = _interopRequireDefault(_cartOverlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HomeView = function (_Component) {
    (0, _inherits3.default)(HomeView, _Component);

    function HomeView() {
        (0, _classCallCheck3.default)(this, HomeView);

        var _this = (0, _possibleConstructorReturn3.default)(this, (HomeView.__proto__ || (0, _getPrototypeOf2.default)(HomeView)).call(this, {
            className: 'home-view',
            events: {}
        }));

        _this.hander = new _handler2.default(_this.onMsgReceived.bind(_this));

        _this.infinite = new _infinite2.default({
            url: '/api/list',
            limit: 10,
            onDataReceived: _this.setup.bind(_this)
        });

        _this.cartOverlay = new _cartOverlay2.default();
        return _this;
    }

    (0, _createClass3.default)(HomeView, [{
        key: 'viewDidAppear',
        value: function viewDidAppear() {
            APP.viewport.index();
            this.cartOverlay.refresh();
        }
    }, {
        key: 'render',
        value: function render() {
            (0, _get3.default)(HomeView.prototype.__proto__ || (0, _getPrototypeOf2.default)(HomeView.prototype), 'render', this).call(this);

            this.$el.html((0, _index2.default)());

            this.infinite.render(this.$el.find('.wrapper'));

            this.$el.append(this.cartOverlay.render().el);
            return this;
        }
    }, {
        key: 'setup',
        value: function setup(items) {
            var $items = this.$el.find('.items');
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)(items), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
    }, {
        key: 'onMsgReceived',
        value: function onMsgReceived(which, args) {
            switch (which) {
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

},{"../../script/component/cart-overlay":123,"./index.html":118,"./product-item":120,"babel-runtime/core-js/get-iterator":1,"babel-runtime/core-js/object/get-prototype-of":7,"babel-runtime/helpers/classCallCheck":12,"babel-runtime/helpers/createClass":13,"babel-runtime/helpers/get":15,"babel-runtime/helpers/inherits":16,"babel-runtime/helpers/possibleConstructorReturn":17,"component":"component","handler":"handler","infinite":"infinite"}],120:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _cartStore = require('../../script/cart-store');

var _cartStore2 = _interopRequireDefault(_cartStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProductItem = function (_Backbone$View) {
    (0, _inherits3.default)(ProductItem, _Backbone$View);

    function ProductItem(data, handler) {
        (0, _classCallCheck3.default)(this, ProductItem);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ProductItem.__proto__ || (0, _getPrototypeOf2.default)(ProductItem)).call(this, {
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

    (0, _createClass3.default)(ProductItem, [{
        key: 'render',
        value: function render() {
            this.$el.html(this.template(this.data));
            return this;
        }
    }, {
        key: 'onReduce',
        value: function onReduce() {
            var result = _cartStore2.default.decrease(this.data);
            if (result) {
                this.handler.send(1000);
            }
        }
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

},{"../../script/cart-store":122,"babel-runtime/core-js/object/get-prototype-of":7,"babel-runtime/helpers/classCallCheck":12,"babel-runtime/helpers/createClass":13,"babel-runtime/helpers/inherits":16,"babel-runtime/helpers/possibleConstructorReturn":17}],121:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _router = require('./framework/router');

var _router2 = _interopRequireDefault(_router);

var _home = require('./page/home');

var _home2 = _interopRequireDefault(_home);

var _cart = require('./page/cart');

var _cart2 = _interopRequireDefault(_cart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routers = {

	routes: {
		'': 'toHome',
		'cart': 'toCart'
	},

	toHome: function toHome() {
		_router2.default.fly(_home2.default);
	},
	toCart: function toCart() {
		_router2.default.fly(_cart2.default);
	}
};

exports.default = routers;

},{"./framework/router":112,"./page/cart":117,"./page/home":119}],122:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LKEY = 'local-cart';

var cartStore = {
    count: function count() {
        var cart = localStorage.getItem(LKEY);
        if (cart) {
            cart = JSON.parse(cart);
            var keys = (0, _keys2.default)(cart);
            var count = 0;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)(keys), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
        var keys = (0, _keys2.default)(cart);
        var items = [];
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = (0, _getIterator3.default)(keys), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
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
        localStorage.setItem(LKEY, (0, _stringify2.default)(cart));
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
            localStorage.setItem(LKEY, (0, _stringify2.default)(cart));
            return true;
        }
        return false;
    }
};

exports.default = cartStore;

},{"babel-runtime/core-js/get-iterator":1,"babel-runtime/core-js/json/stringify":2,"babel-runtime/core-js/object/keys":8}],123:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _config = require('../../framework/config');

var _config2 = _interopRequireDefault(_config);

var _cart = require('../../page/cart');

var _cart2 = _interopRequireDefault(_cart);

var _cartStore = require('..//cart-store');

var _cartStore2 = _interopRequireDefault(_cartStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CartOverlay = function (_Backbone$View) {
    (0, _inherits3.default)(CartOverlay, _Backbone$View);

    function CartOverlay() {
        (0, _classCallCheck3.default)(this, CartOverlay);

        var _this = (0, _possibleConstructorReturn3.default)(this, (CartOverlay.__proto__ || (0, _getPrototypeOf2.default)(CartOverlay)).call(this, {
            className: 'cart-overlay',
            events: {
                'click .inner': 'onClick'
            }
        }));

        _this.template = _.template('<div class="inner">\n\t\t\t\t<i class="iconfont icon-cart"/>\n\t\t\t\t<div class="badge"><%=count%></div>\n\t\t\t</div>');
        return _this;
    }

    (0, _createClass3.default)(CartOverlay, [{
        key: 'render',
        value: function render() {
            (0, _get3.default)(CartOverlay.prototype.__proto__ || (0, _getPrototypeOf2.default)(CartOverlay.prototype), 'render', this).call(this);

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

},{"../../framework/config":107,"../../page/cart":117,"..//cart-store":122,"babel-runtime/core-js/object/get-prototype-of":7,"babel-runtime/helpers/classCallCheck":12,"babel-runtime/helpers/createClass":13,"babel-runtime/helpers/get":15,"babel-runtime/helpers/inherits":16,"babel-runtime/helpers/possibleConstructorReturn":17}],"alert":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _modal = require('../../framework/generic/modal');

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    show: function show(title, options) {
        options = options || {};
        options.title = title;

        new AlertModal(options).show();
    }
};

var AlertModal = function (_Modal) {
    (0, _inherits3.default)(AlertModal, _Modal);

    function AlertModal(options) {
        (0, _classCallCheck3.default)(this, AlertModal);

        options.className = 'ui-alert';
        options.events = {
            'click .button': 'onClick'
        };

        var _this = (0, _possibleConstructorReturn3.default)(this, (AlertModal.__proto__ || (0, _getPrototypeOf2.default)(AlertModal)).call(this, (0, _assign2.default)({}, AlertModal.defaults, options)));

        _this.template = _.template('<div class="inner">\n\t\t\t\t<div class="title"><%=title%></div>\n\t\t\t\t<div class="content"><%=content%></div>\n\t\t\t\t<div class="buttons">\n\t\t\t\t\t<div class="button button-clear"><%=buttonText%></div>\n\t\t\t\t</div>\n\t\t\t</div>');
        return _this;
    }

    (0, _createClass3.default)(AlertModal, [{
        key: 'show',
        value: function show() {
            (0, _get3.default)(AlertModal.prototype.__proto__ || (0, _getPrototypeOf2.default)(AlertModal.prototype), 'show', this).call(this, this.template({
                title: this.options.title,
                content: this.options.content,
                buttonText: this.options.buttonText
            }));
        }
    }, {
        key: 'onClick',
        value: function onClick() {
            this.dismiss();
            if (this.options.onDone) {
                this.options.onDone();
            }
        }
    }]);
    return AlertModal;
}(_modal2.default);

AlertModal.defaults = {
    dismissOnBlur: false,
    buttonText: 'OK',
    onDone: null
};

},{"../../framework/generic/modal":"modal","babel-runtime/core-js/object/assign":3,"babel-runtime/core-js/object/get-prototype-of":7,"babel-runtime/helpers/classCallCheck":12,"babel-runtime/helpers/createClass":13,"babel-runtime/helpers/get":15,"babel-runtime/helpers/inherits":16,"babel-runtime/helpers/possibleConstructorReturn":17}],"component":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Component = function (_Backbone$View) {
	(0, _inherits3.default)(Component, _Backbone$View);

	function Component() {
		(0, _classCallCheck3.default)(this, Component);
		return (0, _possibleConstructorReturn3.default)(this, (Component.__proto__ || (0, _getPrototypeOf2.default)(Component)).apply(this, arguments));
	}

	(0, _createClass3.default)(Component, [{
		key: 'render',
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

},{"babel-runtime/core-js/object/get-prototype-of":7,"babel-runtime/helpers/classCallCheck":12,"babel-runtime/helpers/createClass":13,"babel-runtime/helpers/inherits":16,"babel-runtime/helpers/possibleConstructorReturn":17}],"confirm":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _modal = require('../../framework/generic/modal');

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    show: function show(title, options) {
        options = options || {};
        options.title = title;

        new ComfirmModal(options).show();
    }
};

var ComfirmModal = function (_Modal) {
    (0, _inherits3.default)(ComfirmModal, _Modal);

    function ComfirmModal(options) {
        (0, _classCallCheck3.default)(this, ComfirmModal);

        options.className = 'ui-confirm';
        options.events = {
            'click .button-cancel': 'onCancel',
            'click .button-confirm': 'onConfirm'
        };

        var _this = (0, _possibleConstructorReturn3.default)(this, (ComfirmModal.__proto__ || (0, _getPrototypeOf2.default)(ComfirmModal)).call(this, (0, _assign2.default)({}, ComfirmModal.defaults, options)));

        _this.template = _.template('<div class="inner">\n\t\t\t\t<div class="title"><%=title%></div>\n\t\t\t\t<div class="content"><%=content%></div>\n\t\t\t\t<div class="buttons">\n\t\t\t\t\t<div class="button-cancel button button-clear"><%=cancelText%></div>\n\t\t\t\t\t<div class="button-confirm button button-clear"><%=confirmText%></div>\n\t\t\t\t</div>\n\t\t\t</div>');
        return _this;
    }

    (0, _createClass3.default)(ComfirmModal, [{
        key: 'show',
        value: function show() {
            (0, _get3.default)(ComfirmModal.prototype.__proto__ || (0, _getPrototypeOf2.default)(ComfirmModal.prototype), 'show', this).call(this, this.template({
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

},{"../../framework/generic/modal":"modal","babel-runtime/core-js/object/assign":3,"babel-runtime/core-js/object/get-prototype-of":7,"babel-runtime/helpers/classCallCheck":12,"babel-runtime/helpers/createClass":13,"babel-runtime/helpers/get":15,"babel-runtime/helpers/inherits":16,"babel-runtime/helpers/possibleConstructorReturn":17}],"handler":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Handler = function () {
	function Handler(callback) {
		(0, _classCallCheck3.default)(this, Handler);

		this.callback = callback;
	}

	(0, _createClass3.default)(Handler, [{
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

},{"babel-runtime/helpers/classCallCheck":12,"babel-runtime/helpers/createClass":13}],"http":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

require('whatwg-fetch');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createURL(url) {
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    url += (url.indexOf('?') !== -1 ? '&' : '?') + '__v=1';
    return url;
}

function _fetch(url, options) {
    return fetch(url, options).then(function (response) {
        return response.json();
    });
}

function _request(method, url, params) {
    params = params || {};
    url = _createURL(url);

    var header = {};
    var query = (0, _keys2.default)(params).map(function (key) {
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
        opts.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        opts.body = query;
    }

    return _fetch(url, opts);
}

function _upload(method, url, params, files) {
    url = _createURL(url);

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

exports.default = {
    get: function get(url) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        return _request('GET', url, params);
    },
    delete: function _delete(url) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        return _request('DELETE', url, params);
    },
    post: function post(url) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        return _request('POST', url, params);
    },
    upload: function upload(url) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var files = arguments[2];

        return _upload('POST', url, params, files);
    },
    put: function put(url) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var files = arguments[2];

        return _request('PUT', url, params, files);
    }
};

},{"babel-runtime/core-js/object/keys":8,"whatwg-fetch":105}],"infinite":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _http = require('../http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Infinite = function () {
    function Infinite(options) {
        (0, _classCallCheck3.default)(this, Infinite);

        var defaults = {
            url: '',
            autoScroll: true,
            limit: 20,
            delay: 280,
            params: {},
            footerLoadingText: 'Loading...',
            footerMoreText: 'Load More',
            footerClickText: 'Click To Load More'
        };
        options = (0, _assign2.default)({}, defaults, options);

        if (!options.url) {
            throw new Error('must set url to infinite');
        }

        this.skip = null;
        this.isBusy = false;
        this.isCompleted = false;
        this.options = options;
    }

    (0, _createClass3.default)(Infinite, [{
        key: 'render',
        value: function render(target) {
            target.addClass('infinite');

            this.loadMoreBar = new LoadMoreBar({
                footerLoadingText: this.options.footerLoadingText,
                footerMoreText: this.options.footerMoreText,
                footerClickText: this.options.footerClickText,
                onClick: this.load.bind(this)
            });
            this.loadMoreBar.render(target);

            if (this.options.autoScroll) {
                target.scroll(this.onScroll.bind(this));
            }

            this.load();
        }
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

            _http2.default.get(this.options.url, params).then(function (res) {
                if (res.status !== 200) {
                    _this.loadMoreBar.tip();
                } else {
                    var body = res.body;
                    var items = [];
                    if (body.pagination.after) {
                        items = body.data;
                        _this.loadMoreBar.reset();

                        _this.skip = body.pagination.after;
                    } else {
                        _this.loadMoreBar.hide();
                        _this.isCompleted = true;
                    }

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
    }, {
        key: 'onScroll',
        value: function onScroll(e) {
            var _this2 = this;

            var $target = $(e.target);
            if ($target.scrollTop() + $target.height() >= $target.prop('scrollHeight') && !this.isBusy && !this.isCompleted) {
                this.loadMoreBar.loading();

                setTimeout(function () {
                    _this2.load();
                }, this.options.delay);
            }
        }
    }]);
    return Infinite;
}();

var LoadMoreBar = function () {
    function LoadMoreBar(options) {
        (0, _classCallCheck3.default)(this, LoadMoreBar);

        this.footerLoadingText = options.footerLoadingText;
        this.footerMoreText = options.footerMoreText;
        this.footerClickText = options.footerClickText;

        this.onClick = options.onClick;
    }

    (0, _createClass3.default)(LoadMoreBar, [{
        key: 'render',
        value: function render(parentEl) {
            this.$el = $(document.createElement('div'));
            this.$el.addClass('load-more-bar').html('<i class="spinner iconfont icon-loading"/>&nbsp;\n            <div class="text">&nbsp;</div>');
            parentEl.append(this.$el);

            this.hide();

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

},{"../http":"http","babel-runtime/core-js/object/assign":3,"babel-runtime/helpers/classCallCheck":12,"babel-runtime/helpers/createClass":13}],"modal":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _viewport = require('../viewport');

var _viewport2 = _interopRequireDefault(_viewport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Modal = function (_Backbone$View) {
    (0, _inherits3.default)(Modal, _Backbone$View);

    function Modal(options) {
        (0, _classCallCheck3.default)(this, Modal);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Modal.__proto__ || (0, _getPrototypeOf2.default)(Modal)).call(this, options));

        _this.options = (0, _assign2.default)({}, Modal.defaults, options);
        _this.render();
        return _this;
    }

    (0, _createClass3.default)(Modal, [{
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
                this.$el.velocity(this.options.animation, this.options.duration, function () {
                    _this2.didAppear();
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
            this.$el.velocity('fadeOut', this.options.duration, function () {
                _this3.$el.remove();
            });

            _viewport2.default.setActiveModal(null);
        }
    }]);
    return Modal;
}(Backbone.View);

Modal.defaults = {
    duration: 240,
    dismissOnBlur: false,
    animation: 'transition.fadeIn' };
exports.default = Modal;

},{"../viewport":114,"babel-runtime/core-js/object/assign":3,"babel-runtime/core-js/object/get-prototype-of":7,"babel-runtime/helpers/classCallCheck":12,"babel-runtime/helpers/createClass":13,"babel-runtime/helpers/inherits":16,"babel-runtime/helpers/possibleConstructorReturn":17}],"util":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.is = exports.getParameter = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getParameter = exports.getParameter = function getParameter(name) {
	var url = location.href;
	var start = url.indexOf('?') + 1;
	if (start === 0) {
		return '';
	}
	var value = '';
	var queryString = url.substring(start);
	var paraNames = queryString.split('&');
	for (var i = 0; i < paraNames.length; i++) {
		var str = paraNames[i];
		start = str.indexOf('=');
		var parameterName = str;
		if (start !== -1) {
			parameterName = str.substring(0, start);
		}

		if (name === parameterName) {
			start = str.indexOf('=');
			if (start !== -1) {
				value = str.substring(start + 1);
			}
		}
	}
	return value;
};

var is = exports.is = {
	email: function email(str) {
		return (/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(str)
		);
	},
	number: function number(str) {
		return !isNaN(parseFloat(str)) && isFinite(str);
	},
	string: function string(str) {
		return typeof str === 'string';
	},
	object: function object(str) {
		return (typeof str === 'undefined' ? 'undefined' : (0, _typeof3.default)(str)) === 'object';
	},
	integer: function integer(str) {
		return !isNaN(str) && str * 1 === parseInt(str, 10);
	},
	mobile: function mobile(str) {
		return (/^1\d{10}$/.test(str)
		);
	},
	empty: function empty(str) {
		return str === null || str === undefined || str.length === 0;
	}
};

},{"babel-runtime/helpers/typeof":18}]},{},[106]);
