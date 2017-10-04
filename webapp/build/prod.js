'use strict';
require('shelljs/global');

const gulp = require('gulp');
const sequence = require('gulp-sequence');
const rev = require('gulp-rev');
const revCss = require('gulp-rev-css-url');
const revCollector = require('gulp-rev-collector');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const streamify = require('gulp-streamify');
const size = require('gulp-size');
const gutil = require('gulp-util');

const conf = require('./conf');
const utils = require('./utils');

const mainTask = 'main-build';
const coreTask = 'core-build';
const cleanTask = 'clean-build';
const styleTask = 'style-build';
const scriptTask = 'script-build';
const revAssetTask = 'revscript-build';
const collectorTask = 'collector-build';

/** clean **/
gulp.task(cleanTask, () => {
    rm('-rf', conf.dist);
});


/** core **/
gulp.task(coreTask, () => {
    return utils.concatScript(conf.core.items, conf.core.name)
        .pipe(streamify(uglify()))
        .pipe(size())
        .pipe(gulp.dest(`${conf.src.script}`));
});

/** style **/
gulp.task(styleTask, () => {
    return utils.compileStyle(conf.entry.style, conf.name)
        .pipe(cleanCSS())
        .pipe(size())
        .pipe(gulp.dest(`${conf.src.style}`));
});

/** script **/
gulp.task(scriptTask, () => {
    return utils.browserifyScript(false)
        .pipe(streamify(uglify()))
        .pipe(size())
        .pipe(gulp.dest(`${conf.src.script}`));
});

/**
 * rev resources
 */
gulp.task(revAssetTask, () => {
    return gulp.src(`${conf.src.static}/**/*`)
        .pipe(rev())
        .pipe(revCss())
        .pipe(gulp.dest(`${conf.dist}`))
        .pipe(rev.manifest())
        .pipe(gulp.dest(`${conf.dist}`))
});

/**
 * collector
 */
gulp.task(collectorTask, () => {
    return gulp.src([`${conf.dist}/*.json`, `${conf.src.root}/*.html`])
        .pipe(revCollector({
            // replaceReved: true,
            // dirReplacements: {
            //     '/static/bundle': '/static'
            //     'cdn/': function(manifest_value) {
            //         return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot' + '/img/' + manifest_value;
            //     }
            // }
        }))
        .pipe(gulp.dest(conf.view.path));
});


gulp.task(mainTask, () => {
    sequence(
        cleanTask,
        [styleTask, coreTask, scriptTask],
        [revAssetTask],
        collectorTask, () => {
            gutil.log(gutil.colors.green('build succeed'));
        });
});

exports.task = mainTask;
