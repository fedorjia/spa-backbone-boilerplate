'use strict';
require('shelljs/global');
const sequence = require('gulp-sequence');
const gulp = require('gulp');
const utils = require('./utils');
const conf = require('./conf');

global.browserSync = require('browser-sync').create();

const mainTask = 'main-dev';
const copyTask = 'copy-dev';
const coreTask = 'core-dev';
const styleTask = 'style-dev';
const scriptTask = 'script-dev';

gulp.task(copyTask, () => {
    cp('-R', conf.view.template, conf.view.index); // move index page
});

/** core **/
gulp.task(coreTask, () => {
	return utils.concatScript(conf.core.items, conf.core.name);
});

/** style **/
gulp.task(styleTask, () => {
	return utils.compileStyle(conf.entry.style, conf.name)
        .pipe(browserSync.reload({stream: true}));
});

/** script **/
gulp.task(scriptTask, () => {
	return utils.browserifyScript(true);
});

/** main **/
gulp.task(mainTask, () => {
    sequence(copyTask, [styleTask, coreTask, scriptTask], () => {
        // watch stylus
        gulp.watch(conf.src.root + '/**/*.styl', [styleTask]);

        // start browserSync server
        browserSync.init({
            proxy: conf.proxy
        });
    });
});

exports.task = mainTask;
