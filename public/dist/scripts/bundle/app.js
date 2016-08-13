(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/fedor/works/private/github/single-page-application-boilerplate-mobile/public/scripts/app.js":[function(require,module,exports){
'use strict';

var _viewport = require('./commons/viewport');

var _viewport2 = _interopRequireDefault(_viewport);

var _HomeView = require('./views/HomeView');

var _HomeView2 = _interopRequireDefault(_HomeView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * APP Entry
 */
// Application entry point.
$(function () {
  _viewport2.default.push(_HomeView2.default);
}());

},{"./commons/viewport":"/Users/fedor/works/private/github/single-page-application-boilerplate-mobile/public/scripts/commons/viewport.js","./views/HomeView":"/Users/fedor/works/private/github/single-page-application-boilerplate-mobile/public/scripts/views/HomeView.js"}],"/Users/fedor/works/private/github/single-page-application-boilerplate-mobile/public/scripts/commons/consts.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/***
 * constants
 */
var consts = {
	DEBUG: 2
};

switch (consts.DEBUG) {
	case 1:
		//development
		consts.DOMAIN = 'http://192.168.1.100:3016';
		consts.WX_API_URL = 'http://wxapi.postio.me';
		consts.WX_APPID = 'wx50d746e9d0f0af1d';
		break;
	case 2:
		//test
		consts.DOMAIN = 'http://nana.postio.me';
		consts.WX_API_URL = 'http://wxapi.postio.me';
		consts.WX_APPID = 'wx50d746e9d0f0af1d';
		break;
	case 3:
		//production
		consts.DOMAIN = 'http://nana.postio.me';
		consts.WX_API_URL = 'http://wxapi.postio.me';
		consts.WX_APPID = 'wx50d746e9d0f0af1d';
		break;
}

consts.DOMAIN_SHORT = consts.DOMAIN.substr(7);

consts.WX_SHARE_TITLE_DEFAULT = 'Title';
consts.WX_SHARE_DESC_DEFAULT = 'Desc';
consts.WX_SHARE_ICON = consts.DOMAIN + '/icons/share_icon.png';
consts.WX_SHARED_PAGE = consts.DOMAIN + '/';

consts.PRIORITYS = {
	'home-view': 1000,
	'speak-view': 1000
};

exports.default = consts;

},{}],"/Users/fedor/works/private/github/single-page-application-boilerplate-mobile/public/scripts/commons/viewport.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _consts = require('./consts');

var _consts2 = _interopRequireDefault(_consts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var appViews = [];

var viewport = {

	options: {
		animation: 'fade',
		duration: '280' // animation duration
	},

	/**
  * 进入页面
     */
	push: function push(defination, options, arg1, arg2, arg3) {
		var instance = new defination(arg1, arg2, arg3);
		instance.render();

		// push array
		appViews.push({ key: defination, value: instance });

		// place options
		options = options || {};
		for (var option in this.options) {
			if (this.options.hasOwnProperty(option)) {
				if (options[option] === undefined) {
					options[option] = this.options[option];
				}
			}
		}

		var len = appViews.length;
		if (len > 1) {
			// current View disappear
			var currentView = appViews[len - 2].value;
			options.animationType = this.getAnimationType(options.animation, 'out');
			currentView.didDisappear(options);
		}

		var cloneOptions = _.clone(options);
		// target view appare
		cloneOptions.animationType = this.getAnimationType(options.animation, 'in');
		instance.didAppear(cloneOptions);
	},


	/**
  * 离开页面
     */
	pop: function pop(options) {
		var _this = this;

		var len = appViews.length;
		if (len > 1) {
			var option;

			(function () {
				// place options
				options = options || {};
				for (option in _this.options) {
					if (_this.options.hasOwnProperty(option)) {
						if (options[option] === undefined) {
							options[option] = _this.options[option];
						}
					}
				}

				// current view disappear
				var currentView = appViews[len - 1].value;
				options.animationType = _this.getAnimationType(options.animation, 'out');
				currentView.didDisappear(options);

				var cloneOptions = _.clone(options);
				// prev view appear
				var prevView = appViews[len - 2].value;
				cloneOptions.animationType = _this.getAnimationType(options.animation, 'in');
				prevView.didAppear(cloneOptions, function () {
					currentView.remove();
				});
			})();
		}
	},


	/**
  * 切换页面
     */
	transform: function transform(defination, arg1, arg2, arg3) {
		var len = appViews.length;
		if (len > 0) {
			var currentView = appViews[len - 1].value;
			currentView.didDisappear();
		}

		var instance = this.getInstanceByDefination(defination);
		if (!instance) {
			// push
			instance = new defination(arg1, arg2, arg3);
			instance.render();
			instance.didAppear();
			appViews.push({ key: defination, value: instance });
		} else {
			instance.didAppear();
		}

		var viewPriority = _consts2.default.PRIORITYS[instance.className];
		len = appViews.length;

		if (len > 1) {
			console.log(viewPriority);
			for (var prop in _consts2.default.PRIORITYS) {
				if (_consts2.default.PRIORITYS.hasOwnProperty(prop)) {
					var priority = _consts2.default.PRIORITYS[prop];

					// find high priority and destroy them
					if (priority >= viewPriority) {
						var view = this.getViewByClassName(prop);
						if (view) {
							if (view.key !== defination) {
								// destroy viewObject
								var viewObj = view.value;
								viewObj.didDisappear();
								viewObj.remove();

								// splice array
								appViews.splice(appViews.indexOf(view), 1);
							}
						}
					}
				}
			}
		}
	},


	/**
  * get animation type
     */
	getAnimationType: function getAnimationType(animation, which) {
		var result = '';
		switch (animation) {
			case 'fade':
				if (which === 'in') {
					result = 'fadeIn';
				} else {
					result = 'fadeOut';
				}
				break;
		}
		return result;
	},


	/**
  * get instance of defination
     */
	getInstanceByDefination: function getInstanceByDefination(defination) {
		var viewObject = void 0;
		for (var i = 0; i < appViews.length; i++) {
			var view = appViews[i];
			if (view.key === defination) {
				viewObject = view.value;
				break;
			}
		}
		return viewObject;
	},


	/**
  * get view by className
     */
	getViewByClassName: function getViewByClassName(className) {
		var result = void 0;
		for (var i = 0; i < appViews.length; i++) {
			var view = appViews[i];
			var object = view.value;
			if (object.className === className) {
				result = view;
				break;
			}
		}
		return result;
	}
};

exports.default = viewport;

},{"./consts":"/Users/fedor/works/private/github/single-page-application-boilerplate-mobile/public/scripts/commons/consts.js"}],"/Users/fedor/works/private/github/single-page-application-boilerplate-mobile/public/scripts/views/HomeView.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Component = require('./generic/Component');

var _Component2 = _interopRequireDefault(_Component);

var _home = require('../../tpls/home.html');

var _home2 = _interopRequireDefault(_home);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import DetailView from './DetailView';

var HomeView = _Component2.default.extend({
    className: 'home-view',
    events: {},

    initialize: function initialize() {
        this.constructor.__super__.initialize.apply(this);
    },
    render: function render() {
        this.constructor.__super__.render.apply(this);
        // append to html
        this.$el.html((0, _home2.default)({}));
        // add events, 阻止300ms延时
        this.addEvents();
        return this;
    },


    /********************** events ********************/
    onListen: function onListen(event) {
        if (this.fetchFlag) {
            return;
        }
        this.fetchFlag = true;
        $(event.target).velocity('callout.pulse', 200);
        this.animate();
    }
});

exports.default = HomeView;

},{"../../tpls/home.html":"/Users/fedor/works/private/github/single-page-application-boilerplate-mobile/public/tpls/home.html","./generic/Component":"/Users/fedor/works/private/github/single-page-application-boilerplate-mobile/public/scripts/views/generic/Component.js"}],"/Users/fedor/works/private/github/single-page-application-boilerplate-mobile/public/scripts/views/generic/Component.js":[function(require,module,exports){
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

   didDisappear: function didDisappear(options, callback) {
      if (options.animationType) {
         this.$el.velocity(options.animationType, {
            duration: options.duration,
            display: 'none',
            complete: function () {
               this.$el.css({ 'opacity': 0 });
               if (callback) {
                  callback();
               }
            }.bind(this)
         });
      } else {
         this.$el.css({ 'opacity': 0, 'display': 'none' });
      }
   },

   didAppear: function didAppear(options, callback) {
      if (options.animationType) {
         this.$el.velocity(options.animationType, {
            duration: options.duration,
            display: 'block',
            complete: function () {
               this.$el.css({ 'opacity': 1 });
               if (callback) {
                  callback();
               }
            }.bind(this)
         });
      } else {
         this.$el.css({ 'opacity': 1, 'display': 'block' });
      }
   }
});

module.exports = Component;

},{}],"/Users/fedor/works/private/github/single-page-application-boilerplate-mobile/public/tpls/home.html":[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<audio></audio>\n\n<div class="home-box">\n\t<img class="label" src="../images/label_start.png"/>\n\t<div class="btn-wrap">\n\t\t<img class="btn" src="../icons/btn_listen.png"/>\n\t</div>\n</div>\n\n<div class="listen-box">\n\t<img class="label1" src="../images/label_talking.png"/>\n\t<img class="label2" src="../images/label_story.png"/>\n</div>\n\n<img class="bottle" src="../images/bottle.png"/>\n<img class="watter" src="../images/watter.png"/>\n<img class="snot" src="../icons/snot.png"/>\n\n<div class="bubbles"></div>';
}
return __p;
};

},{}]},{},["/Users/fedor/works/private/github/single-page-application-boilerplate-mobile/public/scripts/app.js"]);
