require('shelljs/global');

const gulp = require('gulp');
const sequence = require('run-sequence');
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


/** clean **/
gulp.task('prod-clean', () => {
    rm('-rf', conf.dist);
});


/** core **/
gulp.task('prod-core', () => {
    return utils.concatScript(conf.common.items, conf.common.name, `${conf.src}/static/bundle`)
        .pipe(streamify(uglify()))
        .pipe(size())
        .pipe(gulp.dest(`${conf.src}/static/bundle`));
});

/** style **/
gulp.task('prod-style', () => {
    return utils.compileStyle(conf.entry.style, conf.name, `${conf.src}/static/bundle`)
        .pipe(cleanCSS())
        .pipe(size())
        .pipe(gulp.dest(`${conf.src}/static/bundle`));
});

/** script **/
gulp.task('prod-script', () => {
    return utils.browserifyScript(false, conf.entry.script, `${conf.src}/static/bundle`)
        .pipe(streamify(uglify()))
        .pipe(size())
        .pipe(gulp.dest(`${conf.src}/static/bundle`));
});

/**
 * rev resources
 */
gulp.task('prod-rev', () => {
    return gulp.src(`${conf.src}/static/**/*`)
        .pipe(rev())
        .pipe(revCss())
        .pipe(gulp.dest(`${conf.dist}/static`))
        .pipe(rev.manifest())
        .pipe(gulp.dest(`${conf.dist}`))
});

/**
 * collector
 */
gulp.task('prod-collector', () => {
    return gulp.src([`${conf.dist}/*.json`, `${conf.src}/*.html`])
        .pipe(revCollector({
            // replaceReved: true,
            // dirReplacements: {
            //     '/static/bundle': '/static'
            //     'cdn/': function(manifest_value) {
            //         return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot' + '/img/' + manifest_value;
            //     }
            // }
        }))
        .pipe(gulp.dest(conf.dist));
});


const main = 'prod-main';
gulp.task(main, () => {
    sequence(
        'prod-clean',
        ['prod-core', 'prod-style', 'prod-script'],
        ['prod-rev'],
        'prod-collector', () => {
            gutil.log(gutil.colors.green('build succeed'));
        });
});

exports.task = main;
