import Modal from 'framework/modal';
// import template from '../tpl/widget/confirm.html';

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
        };
        super(Object.assign({}, ComfirmModal.defaults, options));

        this.template = _.template(
			`<div class="inner">
				<div class="title"><%=title%></div>
				<div class="content"><%=content%></div>
				<div class="buttons">
					<div class="button-cancel button button-clear"><%=cancelText%></div>
					<div class="button-confirm button button-clear"><%=confirmText%></div>
				</div>
			</div>`
		);
    }

    show() {
        super.show(this.template({
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
