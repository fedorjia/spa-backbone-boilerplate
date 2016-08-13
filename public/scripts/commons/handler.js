/***
 * Message Handler
 */
class Handler {

	constructor(callback) {
		this.callback = callback;
	}

	send(what, args) {
		if (this.callback) {
			this.callback(what, args);
		}
	}
}

export default Handler;
