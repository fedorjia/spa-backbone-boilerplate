const Handler = () => { };

Handler.prototype = {
	send(flag, args) {
		if (this.callback) {
			this.callback(flag, args);
		}
	},

	onReceive() {
		this.callback = callback;
	}
};

export default Handler;