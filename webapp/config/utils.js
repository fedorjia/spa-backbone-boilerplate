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
    remapify = require('remapify'),
	underscorify = require('node-underscorify').transform({
		extensions: ['html']
	});

const conf = require('./conf');

module.exports = {
	/**
	 * compile style
	 */
    compileStyle(src, targetName, targetPath) {
        // target = target.replace(/\//g, '_');
        return gulp.src(src)
            .pipe(stylus())
            .pipe(rename(`${targetName}.css`))
            .pipe(gulp.dest(`${targetPath}`));
    },


	/**
	 * concat script
	 */
    concatScript(src, targetName, targetPath) {
        // target = target.replace(/\//g, '_');
        return gulp.src(src)
            .pipe(concat(`${targetName}.js`))
            .pipe(gulp.dest(`${targetPath}`));
    },

    /**
     * browserify script
     */
    browserifyScript(isWatch, src, target) {
        let bundler = browserify({
            paths: [conf.src], // base path for module finding
            transform: [babel.configure({
                "presets": [
                    [
                        "env"
                    ]
                ],
                "plugins": [
                    "transform-class-properties",
                    "transform-object-rest-spread"
                ]
            }), underscorify],
            cache: {},
            packageCache: {},
            fullPaths: false
        });

        if(conf.alias) {
            // alias
            let aliases = [];
            for(let prop in conf.alias) {
                if(conf.alias.hasOwnProperty(prop)) {
                    aliases.push({ src: conf.alias[prop], expose: prop });
                }
            }
            bundler.plugin(remapify, aliases);
        }

        function __rebundle() {
            // b.transform(underscorify)
            return bundler.bundle()
                .on('error', (err) => {
                    console.log(err.message);
                    notifier.notify({ message: 'Error: ' + err.message });
                })
                .pipe(source(conf.name + '.js'))
                .pipe(buffer())
                .pipe(gulp.dest(`${target}`));
        }

        if(isWatch) {
            bundler = watchify(bundler);
            bundler.on('update', () => {
                __rebundle()
                    .pipe(browserSync.reload({stream: true}));
            });
        }
        bundler.add(src);

        return __rebundle();
    }
};
