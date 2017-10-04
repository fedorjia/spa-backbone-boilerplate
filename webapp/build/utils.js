'use strict';
const gulp = require('gulp'),
	babel = require('babelify'),
	browserify = require('browserify'),
	watchify = require('watchify'),
	source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	stylus = require('gulp-stylus'),
	notifier = require('node-notifier'),
	underscorify = require('node-underscorify').transform({
		extensions: ['html']
	});

const conf = require('./conf');

module.exports = {
	/**
	 * compile style
	 */
	compileStyle(src, target) {
		target = target.replace(/\//g, '_');
        return gulp.src(src)
            .pipe(stylus())
            .pipe(rename(`${target}.css`))
            .pipe(gulp.dest(`${conf.src.style}`));
	},


	/**
	 * concat script
	 */
	concatScript(src, target) {
		target = target.replace(/\//g, '_');
        return gulp.src(src)
            .pipe(concat(`${target}.js`))
            .pipe(gulp.dest(`${conf.src.script}`));
	},

    /**
     * browserify script
     */
    browserifyScript(isWatch) {
        let bundler = browserify({
            transform: [babel.configure({
                presets: ['stage-0'],

            }), underscorify],
            cache: {},
            packageCache: {},
            fullPaths: false
        });

        function __rebundle() {
            // b.transform(underscorify)
            return bundler.bundle()
                .on('error', (err) => {
                    notifier.notify({ message: 'Error: ' + err.message });
                })
                .pipe(source(conf.name + '.js'))
                .pipe(buffer())
                .pipe(gulp.dest(`${conf.src.script}`));
        }

        if(isWatch) {
            bundler = watchify(bundler);
            bundler.on('update', () => {
                __rebundle()
                    .pipe(browserSync.reload({stream: true}));
            });
        }
        bundler.add(conf.entry.script);

        return __rebundle();
    }
};
