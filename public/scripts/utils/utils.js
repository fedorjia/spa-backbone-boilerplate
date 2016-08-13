/***
 * utils
 */
const utils = {
    /**
	 * 获取URL的paramter value
	 * */
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
    },

	/**
	 * get transition event
     */
    whichTransitionEvent() {
		let t;
		const el = document.createElement('fakeelement');
		const transitions = {
			'transition':'transitionend',
			'OTransition':'oTransitionEnd',
			'MozTransition':'transitionend',
			'WebkitTransition':'webkitTransitionEnd'
		};

		for(t in transitions){
			if( el.style[t] !== undefined ){
				return transitions[t];
			}
		}
	}
};

export default utils;
