import NoneTransition from '../plugins/transition/NoneTransition';
import FadeTransition from '../plugins/transition/FadeTransition';
import SlideHorizontalTransition from '../plugins/transition/SlideHorizontalTransition';
import SlideVerticalTransition from '../plugins/transition/SlideVerticalTransition';

/***
 * transition manager
 */
const trmanager = {

	defaultAnimation: 'fade', // none, fade, slide-h, slide-v

	get(currentView, targetView, animation) {
		let result;

		let animationType = animation;
		if(_.isObject(animation)) {
			animationType = animation.type;
		}

		switch (animationType) {
			case 'none': {
				result = new NoneTransition(currentView, targetView, animation);
				break;
			}
			case 'fade': {
				result = new FadeTransition(currentView, targetView, animation);
				break;
			}
			case 'slide-h': {
				result = new SlideHorizontalTransition(currentView, targetView, animation);
				break;
			}
			case 'slide-v': {
				result = new SlideVerticalTransition(currentView, targetView, animation);
				break;
			}
		}
		return result;
	}
};

export default trmanager;