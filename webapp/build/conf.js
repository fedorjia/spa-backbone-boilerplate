'use strict';

const src = `webapp/src`;
const dist = `webapp/dist`;
const view = './server/view';

module.exports = {
    staticPrefix: 'static',
    name: 'app',

    view: {
        path: view,
        template: `./webapp/src/index.html`,
        index: `${view}/index.html`,
    },

    entry: {
        style: `${src}/style/app.styl`,
        script: `${src}/app.js`
    },

    src: {
        root: src,
        static: `${src}/static`,
        style: `${src}/static/bundle`,
        script: `${src}/static/bundle`
    },

    dist: dist,

	core: {
		name: 'core',
		items: [
            // `./webapp/src/static/vendor/jquery.min.js`,
			`./webapp/src/static/vendor/backscore.min.js`,
			`./webapp/src/static/vendor/velocity.all.min.js`
		]
	}
};
