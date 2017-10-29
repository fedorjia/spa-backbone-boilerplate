import { fadeIn, fadeOut } from './anime';
import viewport from './viewport';
/***
 * Generic Modal
 */
class Modal extends Backbone.View {

    static defaults = {
        duration: 240,
        dismissOnBlur: false,
        animation: 'transition.fadeIn' // none, transition.fadeIn, transition.shrinkIn
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

        if(this.options.animation === 'none') {
            this.$el.css({opacity: 1});
            this.didAppear();
        } else {
            this.$el.css({ display: 'block' });
            fadeIn(this.$el.get(0), {
                duration: this.options.duration,
                complete: () => {
                    this.didAppear();
                }
            });
        }

        viewport.setActiveModal(this);
    }

    dismiss(event) {
        if(event && !$(event.target).hasClass('modal')) {
            return;
        }
        this.willDisappear();

        fadeOut(this.$el.get(0), {
            duration: this.options.duration,
            complete: () => {
                this.$el.remove();
            }
        });

        viewport.setActiveModal(null);
    }
}

export default Modal;
