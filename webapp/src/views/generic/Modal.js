/***
 * Generic Modal
 */
class Modal extends Backbone.View {

    static defaults = {
        duration: 240,
        dismissOnBlur: false
    };

    constructor(options) {
        super(options);
        this.options = Object.assign({}, Modal.defaults, options);
        this.render();
    }

    didAppear() {

    }

    willDisappear() {

    }

    render() {
        const $el = this.$el;
        const $modal = $(document.createElement('div'));

        $el.addClass('modal-overlay');
        $modal.addClass('modal');
        this.$el.append($modal);

        if(this.options.dismissOnBlur) {
            this.$el.on('click', this.dismiss.bind(this));
        }

        return this;
    }

    show($inner) {
        const $body = $('body');
        const $modal = this.$el.find('.modal');

        this.$el.show();
        $modal.html($inner);
        $body.append(this.$el);

        this.$el.velocity('transition.shrinkIn', this.options.duration, () => {
            this.didAppear();
        });
    }

    dismiss(event) {
        if(event && !$(event.target).hasClass('modal')) {
            return;
        }
        this.willDisappear();
        this.$el.velocity('fadeOut', this.options.duration, () => {
            this.$el.remove();
        });
    }
}

export default Modal;
