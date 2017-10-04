'use strict';

const staticName = 'static';
const src = `webapp/src`;
const dist = `webapp/dist`;

module.exports = {
    staticName: staticName,

    app: {
	    name: 'app',
        entry: {
            style: `${src}/style/app.styl`,
            script: `${src}/app.js`
        },

        src: {
            root: src,
            index: `${src}/index.html`,
            static: `${src}/${staticName}`,
            style: `${src}/${staticName}/bundle`,
            script: `${src}/${staticName}/bundle`
        },

        dist: {
            root: dist,
            index: './server/view/index.html',
            static: `${dist}`,
            style: `${dist}/style`,
            script: `${dist}/script`
        }
    },

	core: {
		name: 'core',
		items: [
            // `./webapp/src/static/vendor/jquery.min.js`,
			`./webapp/src/static/vendor/backscore.min.js`,
			`./webapp/src/static/vendor/velocity.all.min.js`
		]
	}
};
