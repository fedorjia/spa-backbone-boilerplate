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
            this.currentView.$el.velocity('fadeOut', SlideHorizontalTransition.duration);
        }

        const delay = this.currentView ? SlideHorizontalTransition.duration/4 : 0;

        // target view
        this.targetView.render();

        this.targetView.$el.velocity('transition.slideRightIn', {
            delay: delay,
            duration: SlideHorizontalTransition.duration,
            complete: () => {
                if(callback) {
                    callback();
                }
            }
        });
    }

    pop(callback) {
        // current view
        if(this.currentView) {
            this.currentView.$el.velocity('fadeOut', SlideHorizontalTransition.duration);
        }

        const delay = this.currentView ? SlideHorizontalTransition.duration/4 : 0;

        // target view
        this.targetView.$el.velocity('transition.slideLeftIn', {
            delay: delay,
            duration: SlideHorizontalTransition.duration,
            complete: () => {
                if(callback) {
                    callback();
                }
            }
        });
    }
}

export default SlideHorizontalTransition;
