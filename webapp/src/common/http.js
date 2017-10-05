import 'whatwg-fetch';

/**
 * URL path
 */
function __createURL(url) {
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    url += (url.indexOf('?') !== -1 ? '&' : '?') + '__v=1';
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
            return {data: json.result, __timestamp__: Date.now()};
        }).catch((ex) => {
            return Promise.reject({message: ex.message, __timestamp__: Date.now()});
        });
}

/**
 * request
 */
function __request(method, url, params) {
	params = params || {};
    url = __createURL(url);

    const header = {};
    const query = Object.keys(params).map((key) => {
        return key + '=' + encodeURIComponent(params[key]);
    }).join('&');

    const opts = {
        headers: header,
        method: method
    };

    if (method === 'GET') {
		if(query) {
			url = url + '&' + query;
		}
    } else {
        // x-www-form-urlencoded
        opts.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        opts.body = query;
    }

    return __fetch(url, opts);
}

/**
 * File upload
 */
function __upload(method, url, params, files) {
    url = __createURL(url);
    // form-data
    const formData = new FormData();
    for (let prop in params) {
        if (params.hasOwnProperty(prop)) {
            formData.append(prop, params[prop]);
        }
    }
    if (files) {
        for(let i=0; i<files.length;i++) {
            const file = files[i];
            formData.append(`${i}-${file.name}`, file);
        }
    }
    return __fetch(url, {
        method: method,
        credentials: 'include',
        body: formData
    });
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
     * UPLOAD
     */
    upload(url, params = {}, files) {
        return __upload('POST', url, params, files);
    },

    /**
     * PUT
     */
    put(url, params = {}, files) {
        return __request('PUT', url, params, files);
    }
};
