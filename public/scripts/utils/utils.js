/***
 * utils
 */
const utils = {
    /**
	 * get parameter value of url
	 **/
    getParameter(name) {
		const url = location.href;
		let start = url.indexOf('?')+1;
		if (start === 0) {
			return '';
		}
		let value = '';
		const queryString = url.substring(start);
		const paraNames = queryString.split('&');
		for (let i=0; i<paraNames.length; i++) {
			const str = paraNames[i];
			start = str.indexOf('=');
			let parameterName = str;
			if (start !== -1) {
				parameterName = str.substring(0,start);
			}

			if (name === parameterName) {
				start = str.indexOf('=');
				if (start !== -1) {
					value = str.substring(start+1);
				}
			}
		}
		return value;
    }
};

export default utils;
