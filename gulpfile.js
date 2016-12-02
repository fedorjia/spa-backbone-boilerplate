'use strict';

const gulp = require('gulp');
const notifier = require('node-notifier');

const devTask = require('./webapp/build/dev').task;
const buildTask = require('./webapp/build/prod').task;

/** developement **/
gulp.task('dev', [devTask], () => {
    notifier.notify({ message: 'Development ready' });
});

/** production **/
gulp.task('prod', [buildTask], function() {
    notifier.notify({ message: 'Productoin completed' });
});
