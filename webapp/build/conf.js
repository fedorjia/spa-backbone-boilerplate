'use strict';

const webapp = 'webapp';
const src = `${webapp}/src`;
const dist = `${webapp}/dist`;
const staticName = 'static';
const coreName = 'core';

const path = {
	static: staticName,
	webapp: webapp,
	styleEntry: `${src}/styles/app.styl`,
	scriptEntry: `${src}/app.js`,
	src: {
		root: src,
		index: `${webapp}/index.html`,
		static: `${webapp}/${staticName}`,
		style: `${src}/styles`,
		script: `${src}/scripts`
	},

	dist: {
		root: dist,
		index: `${dist}/index.html`,
		static: `${dist}/${staticName}`,
		style: `${dist}/${staticName}/styles`,
		script: `${dist}/${staticName}/scripts`
	}
};

const conf = {
	appname: 'app',
	path: path,
	core: {
		name: coreName,
		items: [
			`${path.src.static}/vendors/backscore.min.js`,
			`${path.src.static}/vendors/velocity.all.min.js`
		]
	}
};

module.exports = conf;