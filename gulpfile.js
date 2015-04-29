var gulp = require('gulp');
	plugins = require('gulp-load-plugins')();

gulp.task('build', function() {
	gulp.src('vimeo.js')
	.pipe( plugins.stripDebug() )
	.pipe( plugins.uglify('vimeo.min.js') )
	.pipe( gulp.dest('dist') )
});