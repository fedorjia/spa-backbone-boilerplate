/***
 * FadeTransition
 */
class FadeTransition {

    static type = 'fade';

    static duration = 320;

    constructor(currentView, targetView) {
        this.currentView = currentView;
        this.targetView = targetView;
    }

    push(callback) {
        // current view
        if(this.currentView) {
            this.currentView.$el.velocity('fadeOut', FadeTransition.duration);
        }

        // target view
        this.targetView.render();
        this.targetView.$el.velocity('fadeIn', {
            delay: FadeTransition.duration/4,
            duration: FadeTransition.duration,
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
            this.currentView.$el.velocity('fadeOut', FadeTransition.duration);
        }

        // target view
        this.targetView.$el.velocity('fadeIn', {
            delay: FadeTransition.duration/4,
            duration: FadeTransition.duration,
            complete: () => {
                if(callback) {
                    callback();
                }
            }
        });
    }
}

export default FadeTransition;
