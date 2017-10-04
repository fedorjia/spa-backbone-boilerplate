// Application entry point.
// import 'babel-polyfill';
import Home from './page/home';
import viewport from './framework/viewport';
import router from './framework/router';
import config from './framework/config';

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
