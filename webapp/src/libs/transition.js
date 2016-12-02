import NoneTransition from '../plugins/transition/NoneTransition';
import FadeTransition from '../plugins/transition/FadeTransition';
import SlideHorizontalTransition from '../plugins/transition/SlideHorizontalTransition';
import SlideVerticalTransition from '../plugins/transition/SlideVerticalTransition';

/***
 * transition
 */
const transition = {

	defaultAnimation: 'slide-h', // none, fade, slide-h, slide-v

	get(currentView, targetView, animation) {
		let result;

		let animationType = animation;
		if(_.isObject(animation)) {
			animationType = animation.type;
		}

		switch (animationType) {
			case 'fade': {
				result = new FadeTransition(currentView, targetView);
				break;
			}
			case 'slide-h': {
				result = new SlideHorizontalTransition(currentView, targetView);
				break;
			}
			case 'slide-v': {
				result = new SlideVerticalTransition(currentView, targetView);
				break;
			}
			default: {
				result = new NoneTransition(currentView, targetView);
				break;
			}
		}
		return result;
	}
};

export default transition;
