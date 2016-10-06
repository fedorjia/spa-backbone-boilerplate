import 'whatwg-fetch';

function __createURL(url) {
	let hasQ = url.indexOf('?') !== -1;
	url += (hasQ ? '&' : '?') + '_auth=x';
	return url;
}

/**
 * fetch
 */
function __fetch(url, options) {
	return fetch(url, options)
			.then((response) => {
				return response.json();
			}).then((json) => {
				if(json.success) {
					return { data: json.result, __timestamp__: Date.now() };
				} else {
					return Promise.reject(new Error(json.result));
				}
			}).catch((ex) => {
				return Promise.reject({ message: ex.message, __timestamp__: Date.now() });
			});
}

/**
 * request
 */
function __request(method, url, params) {
	url = __createURL(url);
	if(method === 'GET' || method === 'DELETE') {
		for (const prop in params) {
			if (params.hasOwnProperty(prop)) {
				url += `&${prop}=${params[prop]}`;
			}
		}
		return __fetch(url, { method: method });
	} else {
		// x-www-form-urlencoded
		const body = Object.keys(params).map((key) => {
			return key + '=' + encodeURIComponent(params[key]);
		}).join('&');

		return __fetch(url, {
			method: method,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: body
		});
	}
}

/*********************************************
 * HTTP Client
 *********************************************/
export default {
	/**
	 * GET
	 */
	get(url, params = {}) {
		return __request('GET', url, params);
	},

	/**
	 * DELETE
	 */
	delete(url, params = {}) {
		return __request('DELETE', url, params);
	},

	/**
	 * POST
	 */
	post(url, params = {}) {
		return __request('POST', url, params);
	},

	/**
	 * PUT
	 */
	put(url, params = {}, files) {
		return __request('PUT', url, params, files);
	}
};