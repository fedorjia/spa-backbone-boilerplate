// Application entry point.
import 'babel-polyfill';
import router from './libs/router';
window.APP = {};

/**
 * APP Entry
 */
$(function() {
	router.start();

	APP.router = router.appRouter;
	// APP.router.nav("/");
}());
