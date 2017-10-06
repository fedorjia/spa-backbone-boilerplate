'use strict';

const src = `webapp/src`;
const dist = `webapp/dist`;

module.exports = {
    name: 'app',
    proxy: 'localhost:3200', // browser sync proxy

    /**
     * entry of application
     */
    entry: {
        style: `${src}/view/_style/app.styl`,
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
        'handler': './webapp/src/script/handler',
        'http': './webapp/src/script/http',
        'util': './webapp/src/script/util',
        'alert': './webapp/src/script/widget/alert',
        'confirm': './webapp/src/script/widget/confirm',
        'infinite': './webapp/src/script/widget/infinite',
    }
};
