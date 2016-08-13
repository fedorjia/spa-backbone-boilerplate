// Application entry point.
import viewport from './commons/viewport';
import HomeView from './views/HomeView';

/**
 * APP Entry
 */
$(function() {
	viewport.push(HomeView);
}());