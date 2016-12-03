import Modal from '../generic/Modal';
import template from '../tpls/widgets/confirm.html';

export default {
    show(title, options) {
        options = options || {};
        options.title = title;

        new ComfirmModal(options).show();
    }
};

/**
 * ConfirmModal
 */
class ComfirmModal extends Modal {
    static defaults = {
        dismissOnBlur: false,
        confirmText: 'Confirm',
        cancelText: 'Cancel',
        onSelect: null
    };

    constructor(options) {
        options.className = 'ui-confirm';
        options.events = {
            'click .button-cancel': 'onCancel',
            'click .button-confirm': 'onConfirm'
        }
        super(Object.assign({}, ComfirmModal.defaults, options));
    }

    show() {
        super.show(template({
            title: this.options.title,
            content: this.options.content,
            confirmText: this.options.confirmText,
            cancelText: this.options.cancelText
        }));
    }

    onCancel() {
        this.dismiss();
        if(this.options.onSelect) {
            this.options.onSelect(0);
        }
    }

    onConfirm() {
        this.dismiss();
        if(this.options.onSelect) {
            this.options.onSelect(1);
        }
    }
}
