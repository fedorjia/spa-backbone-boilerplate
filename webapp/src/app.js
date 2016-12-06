// Application entry point.
import 'babel-polyfill';
import Home from './views/Home';
import viewport from './libs/viewport';
import router from './libs/router';
import config from './libs/config';
window.APP = {};

/**
 * APP Entry
 */
$(function() {
	if(config.isActiveRouter) {
		router.start();
	} else {
		viewport.fly(Home);
	}
}());
