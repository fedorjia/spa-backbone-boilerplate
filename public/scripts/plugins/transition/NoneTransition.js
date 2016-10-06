/***
 * NoneTransition
 */
class NoneTransition {

    static type = 'none';

    constructor(currentView, targetView) {
        this.currentView = currentView;
        this.targetView = targetView;
    }

    push(callback) {
        if(this.currentView) {
            this.currentView.$el.css({ display: 'none', opacity: 0 });
        }
        this.targetView.render();
        this.targetView.$el.css({ display: 'block', opacity: 1 });
        if(callback) {
            callback();
        }
    }

    pop(callback) {
        this.currentView.$el.css({ display: 'none', opacity: 0 });
        this.targetView.$el.css({ display: 'block', opacity: 1 });
        if(callback) {
            callback();
        }
    }
}

export default NoneTransition;
