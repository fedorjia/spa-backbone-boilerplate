'use strict';
const gulp = require('gulp'),
	babel = require('babelify'),
	browserify = require('browserify'),
	watchify = require('watchify'),
	source = require('vinyl-source-stream'),
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

const path = conf.path;

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
						.pipe(gulp.dest(`${path.dist.style}`));
			} else {
				return gulp.src(src)
						.pipe(stylus())
						.pipe(rename(`${target}.css`))
						.pipe(gulp.dest(`${path.src.static}/bundle/style`));
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
						.pipe(gulp.dest(`${path.dist.script}`));
			} else {
				return gulp.src(src)
						.pipe(concat(`${target}.js`))
						.pipe(gulp.dest(`${path.src.static}/bundle/script`));
			}
		}
	},


	/**
	 * inject to html
	 */
	injectHTML(mode) {
		let root;
		let cssPath;
		let jsPath;

		if (mode === 'build') {
			root = path.dist.root;
			cssPath = [`${path.dist.style}/${conf.appname}.min.*.css`];
			jsPath = [`${path.dist.script}/${conf.core.name}.min.*.js`, `${path.dist.script}/${conf.appname}.min.*.js`];
		} else {
			root = path.webapp;
			cssPath = [`${path.src.static}/bundle/style/${conf.appname}.css`];
			jsPath = [`${path.src.static}/bundle/script/${conf.core.name}.js`, `${path.src.static}/bundle/script/${conf.appname}.js`];
		}

		let targetObject = gulp.src(`${root}/index.html`);
		let sourcesCss = gulp.src(cssPath, {read: false});
		let sourcesJs = gulp.src(jsPath, {read: false});

		// inject
		const p = targetObject.pipe(inject(sourcesCss, {
					addRootSlash: false,
					transform: (filePath) => {
						const index = filePath.indexOf('/' + path.static);
						return `<link rel="stylesheet" href="${filePath.substring(index)}"/>`;
					}
				}))
				.pipe(gulp.dest(root))
				.pipe(inject(sourcesJs, {
					addRootSlash: false,
					transform: (filePath) => {
						const index = filePath.indexOf('/' + path.static);
						return `<script src="${filePath.substring(index)}"></script>`;
					}
				}));

		if(mode === 'build') {
			// minify html
			p.pipe(htmlmin({
				collapseWhitespace: true,
				removeComments: true,
				minifyJS: true
			})).pipe(gulp.dest(root));
		} else {
			p.pipe(gulp.dest(root));
		}
	},


	/**
	 * browserify script
	 */
	browserifyScripts(isWatch) {
		let bundler = browserify({
			transform: [babel.configure({extensions: ['.js']}), underscorify],
			cache: {},
			packageCache: {},
			fullPaths: true
		});

		function __rebundle() {
			// b.transform(underscorify)
			return bundler.bundle()
					.on('error', (err) => {
						notifier.notify({ message: 'Error: ' + err.message });
						throw new Error(err.message);
					})
					.pipe(source(conf.appname + '.js'))
					.pipe(gulp.dest(`${conf.path.src.static}/bundle/script`));
		}

		if(isWatch) {
			bundler = watchify(bundler);
			bundler.on('update', () => {
				util.log(util.colors.green('rebundle script.'));
				__rebundle();
			});
		}
		bundler.add(conf.path.scriptEntry);
		return __rebundle();
	}
};