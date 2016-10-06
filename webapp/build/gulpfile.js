'use strict';

const gulp = require('gulp'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    source = require('vinyl-source-stream'),
    streamify = require('gulp-streamify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    stylus = require('gulp-stylus'),
    notifier = require('node-notifier'),
    del = require('del'),
    inject = require('gulp-inject'),
    util = require('gulp-util'),
    babel = require('babelify'),
    underscorify = require('node-underscorify').transform({
        extensions: ['html']
    });

const hash = Math.floor(Date.now()/1000);
const PUBLIC = 'public';
const appName = 'app';
const coreName = 'core';

const P = {
    indexPage: `${PUBLIC}/index.html`,
    scriptEntry: `${PUBLIC}/scripts/${appName}.js`,
    styleEntry: `${PUBLIC}/styles/${appName}.styl`,
    scripts: `${PUBLIC}/scripts`,
    styles: `${PUBLIC}/styles`,
    vendors: `${PUBLIC}/vendors`,
    icons: `${PUBLIC}/icons`,
    images: `${PUBLIC}/images`,
    tpls: `${PUBLIC}/tpls`,
    distScripts: `${PUBLIC}/dist/scripts`,
    distStyles: `${PUBLIC}/dist/styles`
};

P.coreScripts = [
    P.vendors + '/backscore.min.js',
    P.vendors + '/velocity.all.min.js'
];


/**
* inject to html
*/
function injectHTML(targetHTML, injectName, mode) {
    const targetObject = gulp.src(`${targetHTML}`);
    injectName = injectName.replace(/\//g, '_');

    let sourcesCss = gulp.src(`${P.distStyles}/bundle/${injectName}.css`, {read: false});
    let sourcesJs = gulp.src(`${P.distScripts}/bundle/${injectName}.js`, {read: false});

    if(mode === 'build') {
        sourcesCss = gulp.src(`${P.distStyles}/build/${injectName}.min.${hash}.css`, {read: false});
        sourcesJs = gulp.src(`${P.distScripts}/build/${injectName}.min.${hash}.js`, {read: false});
    }

    // inject
    targetObject.pipe(inject(sourcesCss, {
            addRootSlash: false,
            transform :(filePath) => {
                return `<link rel="stylesheet" href="${filePath.substring(PUBLIC.length)}"/>`;
            }
        }))
        .pipe(gulp.dest(PUBLIC))
        .pipe(inject(sourcesJs, {
            addRootSlash: false,
            transform :(filePath) => {
                return `<script src="${filePath.substring(PUBLIC.length)}"></script>`;
            }
        }))
        .pipe(gulp.dest(PUBLIC));
}

/**
 * generate style
 */
function generateStyle(src, target, mode) {
    target = target.replace(/\//g, '_');
    if(src) {
        if(mode === 'build') {
            return gulp.src(src)
                .pipe(stylus({ compress: true }))
                .pipe(rename(`${target}.min.${hash}.css`))
                .pipe(gulp.dest(`${P.distStyles}/build`));
        } else {
            return gulp.src(src)
                .pipe(stylus())
                .pipe(rename(`${target}.css`))
                .pipe(gulp.dest(`${P.distStyles}/bundle`));
        }
    }
}

/**
 * generate script
 */
function generateScript(src, target, mode) {
    target = target.replace(/\//g, '_');
    if(src) {
        if(mode === 'build') {
            return gulp.src(src)
                .pipe(concat(`${target}.js`))
                .pipe(gulp.dest(`${P.distScripts}/bundle`))
                .pipe(rename({ suffix: '.min.' + hash }))
                .pipe(uglify())
                .pipe(gulp.dest(`${P.distScripts}/build`));
        } else {
            return gulp.src(src)
                .pipe(concat(`${target}.js`))
                .pipe(gulp.dest(`${P.distScripts}/bundle`));
        }
    }
}

/**
 * browserify script
 * @param isWatch
 */
function browserifyScripts(isWatch) {
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
                util.log(util.colors.red(err.message));
                notifier.notify({ message: 'Error: ' + err.message });
            })
            .pipe(source(appName + '.js'))
            .pipe(gulp.dest(`${P.distScripts}/bundle`));
    }

    if(isWatch) {
        bundler = watchify(bundler);
        bundler.on('update', () => {
            util.log(util.colors.green('re-bundle scripts.'));
            __rebundle();
        });
    }
    bundler.add(P.scriptEntry);
    return __rebundle();
}

/******************** dev core ******************/

/** dev core js **/
gulp.task('core-script-dev', () => {
    return generateScript(P.coreScripts, coreName, 'dev');
});

/** !!!! dev core !!!! **/
gulp.task('core-dev', ['core-script-dev'], () => {
    // injectHTML(`${P.indexPage}`, coreName, 'dev');
    setTimeout(() => {
        // watch script
        P.coreScripts.forEach((script) => {
            gulp.watch(script, ['core-script-dev']);
        });
    }, 50);
});


/******************** build core ******************/

/** build core clean **/
gulp.task('core-clean-build', () => {
    del([`${P.distScripts}/build/${coreName}.min.*.js`]);
});

/** build core js **/
gulp.task('core-script-build', () => {
    return generateScript(P.coreScripts, coreName, 'build');
});

/** !!!! build core !!!! **/
gulp.task('core-build', ['core-clean-build', 'core-script-build'], () => {
    // injectHTML(`${P.indexPage}`, coreName, 'build');
});


/************************************************************
 * dev
 * **********************************************************/

gulp.task('style-dev', () => {
    return generateStyle(P.styleEntry, appName, 'dev');
});

gulp.task('script-dev', () => {
    browserifyScripts(true);
});

gulp.task('just-script-dev', () => {
    browserifyScripts(false);
});

gulp.task('dev', ['style-dev', 'script-dev'], () => {
    gulp.watch(P.styles+'/**/*.styl', ['style-dev']);
    gulp.watch(P.tpls+'/**/*', ['just-script-dev']);
    // inject html
    injectHTML(`${P.indexPage}`, appName, 'dev');
});

/************************************************************
 * build
 * **********************************************************/

gulp.task('clean-build', () => {
    del([`${P.distScripts}/build/${appName}.min.*.js`]);
});

gulp.task('style-build', () => {
    return generateStyle(P.styleEntry, appName, 'build');
});

gulp.task('script-build', () => {
    const piped = browserifyScripts(false);
    return piped.pipe(rename({ suffix: `.min.${hash}` }))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest(`${P.distScripts}/build`));
});

gulp.task('build', ['clean-build', 'style-build', 'script-build'], () => {
    // inject html
    injectHTML(`${P.indexPage}`, appName, 'build');
    notifier.notify({ message: `Build ${appName} complete` });
});