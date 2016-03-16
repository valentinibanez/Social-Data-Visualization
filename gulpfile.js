var gulp = require('gulp');
var connect = require('gulp-connect');
// Default Task
gulp.task('default', ['watch']);

gulp.task('webserver', function() {
  connect.server();
});

gulp.task('default', ['webserver']);
