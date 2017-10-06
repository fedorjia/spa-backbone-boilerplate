import 'whatwg-fetch';

/**
 * URL path
 */
function _createURL(url) {
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    url += (url.indexOf('?') !== -1 ? '&' : '?') + '__v=1';
    return url;
}

/**
 * fetch
 */
function _fetch(url, options) {
    return fetch(url, options)
        .then((response) => {
            return response.json();
        });
}

/**
 * request
 */
function _request(method, url, params) {
	params = params || {};
    url = _createURL(url);

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

    return _fetch(url, opts);
}

/**
 * File upload
 */
function _upload(method, url, params, files) {
    url = _createURL(url);
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
    return _fetch(url, {
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
        return _request('GET', url, params);
    },

    /**
     * DELETE
     */
    delete(url, params = {}) {
        return _request('DELETE', url, params);
    },

    /**
     * POST
     */
    post(url, params = {}) {
        return _request('POST', url, params);
    },

    /**
     * UPLOAD
     */
    upload(url, params = {}, files) {
        return _upload('POST', url, params, files);
    },

    /**
     * PUT
     */
    put(url, params = {}, files) {
        return _request('PUT', url, params, files);
    }
};
