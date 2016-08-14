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
        // current view
        if(this.currentView) {
            this.currentView.$el.velocity('fadeOut', SlideVerticalTransition.duration, () => {
                this.currentView.didDisappear();
            });
        }

        const delay = this.currentView ? SlideVerticalTransition.duration/2 : 0;
        
        // target view
        this.targetView.render();

        this.targetView.$el.velocity('transition.slideUpIn', {
            delay: delay,
            duration: SlideVerticalTransition.duration,
            complete: () => {
                this.targetView.didAppear();
                if(callback) {
                    callback();
                }
            }
        });
    }

    pop(callback) {
        // current view
        if(this.currentView) {
            this.currentView.$el.velocity('fadeOut', SlideVerticalTransition.duration, () => {
                this.currentView.didDisappear();
            });
        }

        const delay = this.currentView ? SlideVerticalTransition.duration/2 : 0;

        // target view
        this.targetView.$el.velocity('transition.slideDownIn', {
            delay: delay,
            duration: SlideVerticalTransition.duration,
            complete: () => {
                this.targetView.didAppear();
                if(callback) {
                    callback();
                }
            }
        });
    }
}

export default SlideVerticalTransition;
