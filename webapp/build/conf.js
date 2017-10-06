'use strict';

const src = `webapp/src`;
const dist = `webapp/dist`;
const view = './server/view';

module.exports = {
    name: 'app',
    staticPrefix: 'static',
    proxy: 'localhost:3200',

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

    dist: {
        root: dist,
        static: `${dist}/static`
    },

	core: {
		name: 'core',
		items: [
            // `./webapp/src/static/vendor/jquery.min.js`,
			`./webapp/src/static/vendor/backscore.min.js`,
			`./webapp/src/static/vendor/velocity.all.min.js`
		]
	},

    alias: {
        'component': './webapp/src/framework/generic/component',
        'modal': './webapp/src/framework/generic/modal',
        'handler': './webapp/src/common/handler',
        'http': './webapp/src/common/http',
        'util': './webapp/src/common/util',
        'alert': './webapp/src/common/widget/alert',
        'confirm': './webapp/src/common/widget/confirm',
        'infinite': './webapp/src/common/widget/infinite',
    }
};
