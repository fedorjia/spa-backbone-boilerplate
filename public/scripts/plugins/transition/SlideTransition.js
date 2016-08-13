/***
 * SlideTransition
 */
class SlideTransition {
    constructor(currentView, targetView) {
        this.currentView = currentView;
        this.targetView = targetView;
    }

    animatePush(callback) {
        this.currentView.didDisappear();
        this.targetView.didAppear();
        if(callback) {
            callback();
        }
    }

    animatePop(callback) {
        this.currentView.didDisappear();
        this.targetView.didAppear();
        if(callback) {
            callback();
        }
    }
}

export default SlideTransition;
