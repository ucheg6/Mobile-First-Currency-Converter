var gulp = require('gulp'),
    connect = require('gulp-connect');

gulp.task('connect', function() {
    connect.server({
        port:3333
    });
} );

gulp.task('default', ['connect']);