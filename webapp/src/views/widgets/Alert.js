import Modal from '../generic/Modal';
import template from '../tpls/widgets/alert.html';

export default {
    show(title, options) {
        options = options || {};
        options.title = title;

        new AlertModal(options).show();
    }
};

/**
 * AlertModal
 */
class AlertModal extends Modal {
    static defaults = {
        dismissOnBlur: false,
        buttonText: 'OK',
        onDone: null
    };

    constructor(options) {
        options.className = 'ui-alert';
        options.events = {
            'click .button': 'onClick'
        }
        super(Object.assign({}, AlertModal.defaults, options));
    }

    show() {
        super.show(template({
            title: this.options.title,
            content: this.options.content,
            buttonText: this.options.buttonText
        }));
    }

    onClick() {
        this.dismiss();
        if(this.options.onDone) {
            this.options.onDone();
        }
    }
}
