'use strict';
const gulp = require('gulp'),
	babel = require('babelify'),
	browserify = require('browserify'),
	watchify = require('watchify'),
	source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    size = require('gulp-size'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	stylus = require('gulp-stylus'),
	inject = require('gulp-inject'),
	htmlmin = require('gulp-htmlmin'),
	util = require('gulp-util'),
	notifier = require('node-notifier'),
	underscorify = require('node-underscorify').transform({
		extensions: ['html']
	}),
	conf = require('./conf');

module.exports = {
	/**
	 * generate style
	 */
	generateStyle(src, target, mode, hash) {
		target = target.replace(/\//g, '_');
		if (src) {
			if (mode === 'build') {
				return gulp.src(src)
						.pipe(stylus({compress: true}))
						.pipe(rename(`${target}.min.${hash}.css`))
						.pipe(gulp.dest(`${conf.app.dist.style}`));
			} else {
				return gulp.src(src)
						.pipe(stylus({url: {name: 'embedurl'}}))
						.pipe(rename(`${target}.css`))
						.pipe(gulp.dest(`${conf.app.src.style}`))
                        .pipe(browserSync.reload({stream: true}));
			}
		}
	},


	/**
	 * generate script
	 */
	generateScript(src, target, mode, hash) {
		target = target.replace(/\//g, '_');
		if (src) {
			if (mode === 'build') {
				return gulp.src(src)
						.pipe(concat(`${target}.js`))
						.pipe(rename({suffix: '.min.' + hash}))
						.pipe(uglify())
                        .pipe(size())
						.pipe(gulp.dest(`${conf.app.dist.script}`));
			} else {
				return gulp.src(src)
						.pipe(concat(`${target}.js`))
						.pipe(gulp.dest(`${conf.app.src.script}`));
			}
		}
	},


	/**
	 * inject to html
	 */
	injectHTML(mode) {
		let cssPath;
		let jsPath;

		const lastIndex = conf.app.dist.index.lastIndexOf('/');
        const indexRoot = conf.app.dist.index.substring(0, lastIndex);
        let staticPath;

		if (mode === 'build') {
            staticPath = conf.app.dist.static;
			cssPath = [`${conf.app.dist.style}/${conf.app.name}.min.*.css`];
			jsPath = [`${conf.app.dist.script}/${conf.core.name}.min.*.js`, `${conf.app.dist.script}/${conf.app.name}.min.*.js`];
		} else {
            staticPath = conf.app.src.static;
			cssPath = [`${conf.app.src.style}/${conf.app.name}.css`];
			jsPath = [`${conf.app.src.script}/${conf.core.name}.js`, `${conf.app.src.script}/${conf.app.name}.js`];
		}

		let targetIndex = gulp.src(`${conf.app.src.index}`);
		let sourcesCss = gulp.src(cssPath, {read: false});
		let sourcesJs = gulp.src(jsPath, {read: false});

		// inject
		const p = targetIndex.pipe(inject(sourcesCss, {
					addRootSlash: false,
					transform: (filePath) => {
						return `<link rel="stylesheet" href="/${conf.staticName}${filePath.substring(staticPath.length)}"/>`;
					}
				}))
				.pipe(inject(sourcesJs, {
					addRootSlash: false,
					transform: (filePath) => {
						return `<script src="/${conf.staticName}${filePath.substring(staticPath.length)}"></script>`;
					}
				}));

		if(mode === 'build') { // minify html
			p.pipe(htmlmin({
				collapseWhitespace: true,
				removeComments: true,
				minifyJS: true
			})).pipe(gulp.dest(indexRoot));
		} else {
			p.pipe(gulp.dest(indexRoot));
		}
	},


	/**
	 * browserify script
	 */
	browserifyScripts(isWatch) {
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
						throw new Error(err.message);
					})
					.pipe(source(conf.app.name + '.js'))
                    .pipe(buffer())
					.pipe(gulp.dest(`${conf.app.src.script}`));
		}

		if(isWatch) {
			bundler = watchify(bundler);
			bundler.on('update', () => {
				__rebundle()
                    .pipe(browserSync.reload({stream: true}));
			});
		}
		bundler.add(conf.app.entry.script);

		return __rebundle();
	}
};
