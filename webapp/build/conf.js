'use strict';

const webapp = 'webapp';
const src = `${webapp}/src`;
const dist = `${webapp}/dist`;
const staticName = 'static';
const coreName = 'core';

const path = {
	static: staticName,
	webapp: webapp,
	styleEntry: `${src}/style/app.styl`,
	scriptEntry: `${src}/app.js`,
	src: {
		root: src,
		index: `${webapp}/index.html`,
		static: `${webapp}/${staticName}`,
        style: `${webapp}/${staticName}/bundle/style`,
        script: `${webapp}/${staticName}/bundle/script`
	},

	dist: {
		root: dist,
		index: `${dist}/index.html`,
		static: `${dist}/${staticName}`,
		style: `${dist}/${staticName}/style`,
		script: `${dist}/${staticName}/script`
	}
};

const conf = {
	appname: 'app',
	path: path,
	core: {
		name: coreName,
		items: [
			`${path.src.static}/vendor/backscore.min.js`,
			`${path.src.static}/vendor/velocity.all.min.js`
		]
	}
};

module.exports = conf;
