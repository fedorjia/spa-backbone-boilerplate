import { slideUpIn, slideDownOut } from '../../anime';

/***
 * SlideVerticalTransition
 */
class SlideVerticalTransition {

    static type = 'slide-v';

    static duration = 320;

    constructor(currentView, targetView) {
        this.currentView = currentView;
        this.targetView = targetView;
    }

    push(callback) {
        // target view
        this.targetView.render();

        slideUpIn(this.targetView.$el.get(0), {
            duration: SlideVerticalTransition.duration,
            complete: () => {
                // current view
                if(this.currentView) {
                    this.currentView.$el.css({ opacity: 0, display: 'none' });
                }
                if(callback) {
                    callback();
                }
            }
        });
    }

    pop(callback) {
        this.targetView.$el.css({ opacity: 1, display: 'block' });

        // current view
        if(this.currentView) {
            slideDownOut(this.currentView.$el.get(0), {
                duration: SlideVerticalTransition.duration,
                complete: callback
            });
        }
    }
}

export default SlideVerticalTransition;
