// Application entry point.
import router from './router';

window.APP = {};

/**
 * APP Entry
 */
$(function() {
	router.start();

	APP.router = router.appRouter;
	// APP.router.nav("/");
}());