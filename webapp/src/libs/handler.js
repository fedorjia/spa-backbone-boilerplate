/***
 * Message Handler
 */
class Handler {

	constructor(callback) {
		this.callback = callback;
	}

	send(which, args) {
		if (this.callback) {
			this.callback(which, args);
		}
	}
}

export default Handler;
