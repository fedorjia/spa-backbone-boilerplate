import 'whatwg-fetch';

const http = {
	/**
	 * get
     */
	get(url, params = {}) {
		let i = 0;
		let str = '';
		for(var prop in params) {
			if(params.hasOwnProperty(prop)) {
				str = (i === 0) ? (str+`?${prop}=${params[prop]}`) : (str+`&${prop}=${params[prop]}`);
			}
			i++;
		}

		return fetch(url + str, {
			method: 'GET'
		})
		.then(
			(response) => response.json()
			.then((json) => ({ json, response }))
		)
		.then(({ json, response }) => {
			if (!response.ok) {
				return Promise.reject(json);
			}
			return json;
		})
		.catch(function(ex) {
			return Promise.reject(ex);
		});
	},
	
	// post
	post: (url, params) => {
		const formData = new FormData();
		for(const prop in params) {
			if(params.hasOwnProperty(prop)) {
				formData.append(prop, params[prop]);
			}
		}

		return fetch(url, {
			method: 'POST',
			body: formData
		})
		.then(
			(response) => response.json()
			.then((json) => ({ json, response }))
		)
		.then(({ json, response }) => {
			if (!response.ok) {
				return Promise.reject(json);
			}
			return json;
		})
		.catch(function(ex) {
			return Promise.reject(ex);
		});
	}
};

export default http;
