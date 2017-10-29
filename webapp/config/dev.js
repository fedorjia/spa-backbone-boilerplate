require('shelljs/global');
// const sequence = require('gulp-sequence');
const gulp = require('gulp');
const utils = require('./utils');
const conf = require('./conf');

global.browserSync = require('browser-sync').create();


/** core **/
gulp.task('dev-core', () => {
	return utils.concatScript(conf.common.items, conf.common.name, `${conf.src}/static/bundle`);
});

/** style **/
gulp.task('dev-style', () => {
	return utils.compileStyle(conf.entry.style, conf.name, `${conf.src}/static/bundle`)
        .pipe(browserSync.reload({stream: true}));
});

/** script **/
gulp.task('dev-script', () => {
	return utils.browserifyScript(true, conf.entry.script, `${conf.src}/static/bundle`);
});

/** main **/
const main = 'dev-main';
gulp.task(main, [ 'dev-core', 'dev-style', 'dev-script' ], () => {
    // watch stylus
    gulp.watch(conf.src + '/**/*.styl', [ 'dev-style' ]);

    // start browserSync server
    browserSync.init({
        proxy: conf.proxy,
        open: false
    });
});

exports.task = main;
