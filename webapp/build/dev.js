'use strict';
require('shelljs/global');

const gulp = require('gulp'),
	utils = require('./utils'),
	conf = require('./conf');

const path = conf.path;
const hash = Math.ceil(Date.now()/1000);

const mainTask = 'main-dev';
const coreTask = 'core-dev';
const styleTask = 'style-dev';
const scriptTask = 'script-dev';
//const notWatchScriptTask = 'notwatch-scirpt-dev';

/** core **/
gulp.task(coreTask, () => {
	return utils.generateScript(conf.core.items, conf.core.name, 'dev');
});

/** style **/
gulp.task(styleTask, () => {
	return utils.generateStyle(path.styleEntry, conf.appname, 'dev', hash);
});

/** script **/
gulp.task(scriptTask, () => {
	return utils.browserifyScripts(true);
});

///** script not watch **/
//gulp.task(notWatchScriptTask, () => {
//	return utils.browserifyScripts(false);
//});

/** main **/
gulp.task(mainTask, [coreTask, styleTask, scriptTask], () => {
	gulp.watch(path.src.root + '/**/*.styl', [styleTask]);
	// inject html
	return utils.injectHTML('dev');
});

exports.task = mainTask;
