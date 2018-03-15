'use strict'
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var entryPoint = './server.js';
gulp.task('default', ['run']);
var path = require("path");
var url = require("url");
gulp.task('run', function() {
    nodemon({
        script: entryPoint,
        env: {'NODE_ENV': 'development'},
        tasks: []
    });
});