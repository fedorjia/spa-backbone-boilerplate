import { slideRightIn, slideLeftIn, fadeOut } from '../../anime';

/***
 * SlideHorizontalTransition
 */
class SlideHorizontalTransition {

    static type = 'slide-h';

    static duration = 320;

    constructor(currentView, targetView) {
        this.currentView = currentView;
        this.targetView = targetView;
    }

    push(callback) {
        // current view
        if(this.currentView) {
            fadeOut(this.currentView.$el.get(0), {
                duration: SlideHorizontalTransition.duration + 120
            });
        }

        // target view
        this.targetView.render();
        slideRightIn(this.targetView.$el.get(0), {
            duration: SlideHorizontalTransition.duration,
            complete: callback
        })
    }

    pop(callback) {
        // current view
        if(this.currentView) {
            fadeOut(this.currentView.$el.get(0), {
                duration: SlideHorizontalTransition.duration + 120
            });
        }

        // target view
        slideLeftIn(this.targetView.$el.get(0), {
            duration: SlideHorizontalTransition.duration,
            complete: callback
        })
    }
}

export default SlideHorizontalTransition;
