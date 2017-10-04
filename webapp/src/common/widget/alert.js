import Modal from '../../framework/generic/modal';
// import template from '../tpl/widget/alert.html';

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
        };
        super(Object.assign({}, AlertModal.defaults, options));

        this.template = _.template(
        	`<div class="inner">
				<div class="title"><%=title%></div>
				<div class="content"><%=content%></div>
				<div class="buttons">
					<div class="button button-clear"><%=buttonText%></div>
				</div>
			</div>`
		);
    }

    show() {
        super.show(this.template({
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
