/***
 * spinner
 */
class Spinner {
	constructor() {
		this.el = this.__createEl();
	}

	__createEl() {
		const targetEl = document.querySelector('body');
		const overlayEl = document.createElement('div');
		const spinnerEl = document.createElement('div');

		overlayEl.className = 'overlay';
		spinnerEl.className = 'spinner';
		overlayEl.appendChild(spinnerEl);
		targetEl.appendChild(overlayEl);

		spinnerEl.innerHTML =
			`<div class="inner">
				<div class="message">${this.message}</div>
			</div>`;
		
		return {
			spinner: $(spinnerEl),
			overlay: $(overlayEl)
		};
	}

	start(message) {
		this.el.spinner.find('.message').text(message);

		this.el.overlay.velocity({
			opacity: 1
		}, {
			display: 'block',
			duration: 280
		});

		this.el.spinner.velocity({
			opacity: 1
		}, {
			duration: 280
		});
	}

	stop() {
		this.el.overlay.velocity({
			opacity: 0
		}, {
			display: 'none',
			duration: 280
		});

		this.el.spinner.velocity({
			opacity: 0
		}, {
			duration: 280
		});
	}

	remove() {
		this.el.overlay.remove();
	}
}

export default Spinner;
