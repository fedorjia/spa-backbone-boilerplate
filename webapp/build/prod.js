'use strict';
require('shelljs/global');

const gulp = require('gulp'),
	utils = require('./utils'),
	streamify = require('gulp-streamify'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	conf = require('./conf');


const path = conf.path;
const hash = Math.ceil(Date.now()/1000);

const mainTask = 'main-build';
const coreTask = 'core-build';
const cleanTask = 'clean-build';
const styleTask = 'style-build';
const scriptTask = 'script-build';

/** clean **/
gulp.task(cleanTask, () => {
	rm('-rf', path.dist.root);
	mkdir('-p', path.dist.static);
	cp('-R', path.src.index, path.dist.index); // move index page
	cp('-R', `${path.src.static}/*`, `${path.dist.static}`); // move static
});


/** core **/
gulp.task(coreTask, () => {
	return utils.generateScript(conf.core.items, conf.core.name, 'build', hash);
});

/** style **/
gulp.task(styleTask, () => {
	return utils.generateStyle(path.styleEntry, conf.appname, 'build', hash);
});

/** script **/
gulp.task(scriptTask, () => {
	const piped = utils.browserifyScripts(false);
	return piped.pipe(rename({ suffix: `.min.${hash}` }))
			.pipe(streamify(uglify()))
			.pipe(gulp.dest(conf.path.dist.script));
});

gulp.task(mainTask, [cleanTask, coreTask, styleTask, scriptTask], () => {
	// inject html
	return utils.injectHTML('build');
});

exports.task = mainTask;