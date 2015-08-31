'use strict';
var gulp = require('gulp');
var path = require('path');
var fs = require('fs');
var bowerPath = JSON.parse(fs.readFileSync('./.bowerrc')).directory;

gulp.task('sass', function() {
	var sass = require('gulp-sass');

	return gulp.src('sass/*.scss')
		.pipe(sass({
			includePaths: []
		}).on('error', sass.logError))
		.pipe(gulp.dest('public/css'));
});

gulp.task('watch', function() {
	var livereload = require('gulp-livereload');

	livereload.listen();

	function handleChanges(stream) {
		stream.on('change', livereload.changed);
	}
});