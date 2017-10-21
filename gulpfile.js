'use strict';

const gulp = require('gulp');
// const notifier = require('node-notifier');

const devTask = require('./webapp/config/dev').task;
const buildTask = require('./webapp/config/prod').task;

/** developement **/
gulp.task('dev', [devTask], () => {});

/** production **/
gulp.task('prod', [buildTask], () => {});
