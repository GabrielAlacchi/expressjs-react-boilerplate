/**
 * Created by gabriel on 14/08/16.
 */

/*
 *
 *  Created using Jean-Pierre Sierens' Gulpfile in his article at http://jpsierens.com/tutorial-gulp-javascript-2015-react/
 *  Respek goes out to this man for this brilliant work
 *
 *	===========================================================================
 */

// declarations, dependencies
// ----------------------------------------------------------------------------
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var babelify = require('babelify');
var imagemin = require('gulp-imagemin');
var postcss = require('gulp-postcss');
var nested = require('postcss-nested');
var scss = require('postcss-scss');
var livereload = require('gulp-livereload');

// keep a count of the times a task refires
// Gulp tasks
// ----------------------------------------------------------------------------
gulp.task('bundle', function () {
  return bundleApp();
});

gulp.task('html', function () {
  return gulp.src('./react-app/*.html')
    .pipe(gulp.dest('./build'))
    .pipe(livereload());
});

gulp.task('images', function () {
  return gulp.src('images/**/*')
    .pipe(imagemin())
    .on('error', gutil.log)
    .pipe(gulp.dest('./build/img'))
    .pipe(livereload());
});

//To use sass switch to using gulp-sass
gulp.task('postcss', function() {
  const processors = [nested];
  return gulp.src('css/**/*.css')
    .pipe(postcss(processors, {syntax: scss}))
    .on('error', gutil.log)
    .pipe(gulp.dest('./build/stylesheets'))
    .pipe(livereload());
});

gulp.task('watch', function () {

  server = livereload({ start: true });

  gulp.watch(['./react-app/src/**/*.js'], ['bundle']);
  gulp.watch(['./images/**/*'], ['images']);
  gulp.watch(['./css/**/*'], ['postcss']);
  gulp.watch(['./react-app/*.html'], ['html']);
});

gulp.task('postinstall', ['bundle', 'html', 'images', 'postcss']);

// When running 'gulp' on the terminal this task will fire.
// It will start watching for changes in every .js file.
// If there's a change, the task 'scripts' defined above will fire.
gulp.task('default', ['bundle', 'html', 'postcss', 'watch']);

// Private Functions
// ----------------------------------------------------------------------------
function bundleApp() {

  // Browserify will bundle all our js files together in to one and will let
  // us use modules in the front end.
  var appBundler = browserify({
    entries: './react-app/src/app.js',
    debug: true
  });

  return appBundler
  // transform ES6 and JSX to ES5 with babelify
    .transform("babelify", {
      presets: ["es2015", "react"],
      plugins: ["react-html-attrs", "transform-class-properties", "transform-decorators-legacy"]
    })
    .bundle()
    .on('error', gutil.log)
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./build/src/'))
    .pipe(livereload());
}
