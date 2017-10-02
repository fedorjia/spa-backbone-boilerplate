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
        const delay = this.currentView ? SlideVerticalTransition.duration/4 : 0;

        // target view
        this.targetView.render();

        this.targetView.$el.velocity('transition.slideUpIn', {
            delay: delay,
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
        const delay = this.currentView ? SlideVerticalTransition.duration/4 : 0;
        this.targetView.$el.css({ opacity: 1, display: 'block' });

        // current view
        if(this.currentView) {
            this.currentView.$el.velocity('transition.slideDownOut', {
                delay: delay,
                duration: SlideVerticalTransition.duration,
                complete: () => {
                    if(callback) {
                        callback();
                    }
                }
            });
        }
    }
}

export default SlideVerticalTransition;
