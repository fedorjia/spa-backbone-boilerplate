import { fadeIn, fadeOut } from '../../anime';
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
            fadeOut(this.currentView.$el.get(0), { duration: FadeTransition.duration });
        }

        // target view
        this.targetView.render();
        fadeIn(this.targetView.$el.get(0), {
            duration: FadeTransition.duration,
            complete: callback
        });
    }

    pop(callback) {
        // current view
        if(this.currentView) {
            fadeOut(this.currentView.$el.get(0), { duration: FadeTransition.duration });
        }

        // target view
        fadeIn(this.targetView.$el.get(0), {
            duration: FadeTransition.duration,
            complete: callback
        });
    }
}

export default FadeTransition;
