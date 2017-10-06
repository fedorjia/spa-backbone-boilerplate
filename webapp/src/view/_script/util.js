/***
 * get parameter by name
 */
export const getParameter = (name) => {
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
};


/***
 * is
 */
export const is = {
	email (str) {
		return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(str);
	},

	number (str) {
		return !isNaN(parseFloat(str)) && isFinite(str);
	},

	string(str) {
		return typeof str === 'string';
	},

	object(str) {
		return typeof str === 'object';
	},

	integer(str) {
		return !isNaN(str) && (str*1 === parseInt(str, 10));
	},

	mobile (str) {
		return /^1\d{10}$/.test(str);
	},

	empty (str) {
		return str === null || str === undefined || str.length === 0;
	}
};