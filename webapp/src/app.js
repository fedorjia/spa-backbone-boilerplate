// Application entry point.
// import 'babel-polyfill';
import viewport from 'framework/viewport';
import router from 'framework/router';
import config from 'framework/config';

import Home from './container/home';
import routers from './router';

window.APP = {};

/**
 * APP Entry
 */
$(function() {
    APP.viewport = viewport;
    APP.router = router;

	if(config.isActiveRouter) {
        router.start(routers);
	} else {
        viewport.fly(Home);
	}
}());
