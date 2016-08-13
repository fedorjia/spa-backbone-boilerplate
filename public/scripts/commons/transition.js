import NoneTransition from '../plugins/transition/NoneTransition';
import FadeTransition from '../plugins/transition/FadeTransition';
import SlideTransition from '../plugins/transition/SlideTransition';

/***
 * transition
 */
const transition = {

	defaultAnimation: 'none',

	get(currentView, targetView, animation) {
		let result;
		switch (animation) {
			case 'none': {
				result = new NoneTransition(currentView, targetView);
				break;
			}
			case 'fade': {
				result = new FadeTransition(currentView, targetView);
				break;
			}
			case 'slide': {
				result = new SlideTransition(currentView, targetView).animate();
				break;
			}
		}
		return result;
	}
};

export default transition;