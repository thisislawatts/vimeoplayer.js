var gulp = require('gulp');
plugins = require('gulp-load-plugins')();

gulp.task('build', function() {
    gulp.src('vimeoplayer.js')
        .pipe(plugins.stripDebug())
        .pipe(plugins.uglify('vimeoplayer.min.js'))
        .pipe(gulp.dest('dist'))
});