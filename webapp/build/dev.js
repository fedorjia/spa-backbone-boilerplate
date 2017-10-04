'use strict';
require('shelljs/global');
global.browserSync = require('browser-sync').create();

const gulp = require('gulp'),
	utils = require('./utils'),
	conf = require('./conf');

const hash = Math.ceil(Date.now()/1000);

const indexTask = 'index-dev';
const mainTask = 'main-dev';
const coreTask = 'core-dev';
const styleTask = 'style-dev';
const scriptTask = 'script-dev';

gulp.task(indexTask, () => {
    cp('-R', conf.app.src.index, conf.app.dist.index); // move index page
});

/** core **/
gulp.task(coreTask, () => {
	return utils.generateScript(conf.core.items, conf.core.name, 'dev');
});

/** style **/
gulp.task(styleTask, () => {
	return utils.generateStyle(conf.app.entry.style, conf.app.name, 'dev', hash);
});

/** script **/
gulp.task(scriptTask, () => {
	return utils.browserifyScripts(true);
});

/** main **/
gulp.task(mainTask, [indexTask, coreTask, styleTask, scriptTask], () => {
    // watch stylus
	gulp.watch(conf.app.src.root + '/**/*.styl', [styleTask]);

	// start browserSync server
	browserSync.init({
        proxy: "localhost:3100"
	});

    // inject html
	return utils.injectHTML('dev');
});

exports.task = mainTask;
