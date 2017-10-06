'use strict';

const src = `webapp/src`;
const dist = `webapp/dist`;
const view = './server/view';

module.exports = {
    name: 'app',
    proxy: 'localhost:3200', // browser sync proxy

    /**
     * entry of application
     */
    entry: {
        style: `${src}/page/_style/app.styl`,
        script: `${src}/app.js`
    },

    /**
     * src paths
     */
    src: {
        root: src,
        static: `${src}/static`,
        style: `${src}/static/bundle`,
        script: `${src}/static/bundle`
    },

    /**
     * output paths
     */
    out: {
        root: dist,
        static: `${dist}/static`
    },

    /**
     * common chunks
     */
	common: {
		name: 'core',
		items: [
            // `./webapp/src/static/vendor/jquery.min.js`,
			`./webapp/src/static/vendor/backscore.min.js`,
			`./webapp/src/static/vendor/velocity.all.min.js`
		]
	},

    /**
     * alias component
     */
    alias: {
        'component': './webapp/src/framework/generic/component',
        'modal': './webapp/src/framework/generic/modal',
        'handler': './webapp/src/page/_script/handler',
        'http': './webapp/src/page/_script/http',
        'util': './webapp/src/page/_script/util',
        'alert': './webapp/src/page/_script/widget/alert',
        'confirm': './webapp/src/page/_script/widget/confirm',
        'infinite': './webapp/src/page/_script/widget/infinite',
    }
};
