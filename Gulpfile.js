/**
 * Created by gabriel on 14/08/16.
 */

// declarations, dependencies
// ----------------------------------------------------------------------------
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var webpack = require('webpack-stream');

const isProduction = process.env.NODE_ENV == 'production';

//Plumber function to end a pipe if an error is caught
function onError(err) {
  console.error(err);

  //End the stream
  this.emit('end');
}

// keep a count of the times a task refires
// Gulp tasks
// ----------------------------------------------------------------------------
gulp.task('bundle', function () {
  return gulp.src('./react-app/**/*.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .on('error', onError)
    .pipe(gulp.dest('./build/src'))
    .pipe(browserSync.stream())
    .on('error', onError);
});

gulp.task('html', function () {
  return gulp.src('./react-app/*.html')
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.stream())
    .on('error', onError);
});

gulp.task('images', function () {
  return gulp.src('images/**/*')
    .pipe(imagemin())
    .on('error', onError)
    .pipe(gulp.dest('./build/img'))
    .pipe(browserSync.stream())
    .on('error', onError);
});

//To use sass switch to using gulp-sass
gulp.task('sass', function() {

  const outputStyle = isProduction ? 'compressed' : 'expanded';

  return gulp.src('css/**/*.scss')
    .pipe(sass({outputStyle: outputStyle}))
    .on('error', onError)
    .pipe(gulp.dest('./build/stylesheets'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function () {

  if (isProduction)
    return null;

  browserSync.init({
    proxy: 'localhost:3000'
  });

  gulp.watch(['./react-app/src/**/*.js'], ['bundle']);
  gulp.watch(['./images/**/*'], ['images']);
  gulp.watch(['./css/**/*'], ['sass']);
  gulp.watch(['./react-app/*.html'], ['html']);

});

gulp.task('postinstall', ['bundle', 'html', 'images', 'sass']);

// When running 'gulp' on the terminal this task will fire.
// It will start watching for changes in every .js file.
// If there's a change, the task 'scripts' defined above will fire.
gulp.task('default', ['postinstall', 'watch']);

