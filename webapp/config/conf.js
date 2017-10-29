'use strict';

const src = `webapp/src`;
const dist = `webapp/dist`;

module.exports = {
    name: 'app',
    proxy: 'localhost:3200', // browser sync proxy

    src,

    dist,

    /**
     * entry of application
     */
    entry: {
        style: `${src}/app.styl`,
        script: `${src}/app.js`
    },

    // /**
    //  * src paths
    //  */
    // src: {
    //     root: src,
    //     static: `${src}/static`,
    //     style: `${src}/static/bundle`,
    //     script: `${src}/static/bundle`
    // },
	//
    // /**
    //  * output paths
    //  */
    // out: {
    //     root: dist,
    //     static: `${dist}/static`
    // },

    /**
     * common chunks
     */
	common: {
		name: 'core',
		items: [
            `./webapp/src/static/vendor/zepto.min.js`,
			`./webapp/src/static/vendor/underscore.min.js`,
            `./webapp/src/static/vendor/backbone.min.js`,
			`./webapp/src/static/vendor/anime.min.js`
		]
	},

    /**
     * alias component
     */
    alias: {
        'framework': './webapp/src/framework/**/*.js',
        'component': './webapp/src/component/**/*.js',
        'widget': './webapp/src/widget/**/*.js',
        'generic': './webapp/src/generic/**/*.js'
    }
};
