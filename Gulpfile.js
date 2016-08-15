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

// External dependencies you do not want to rebundle while developing,
// but include in your application deployment
var dependencies = [
  'react',
  'react-dom'
];
// keep a count of the times a task refires
var scriptsCount = 0;

var isProduction = process.env.NODE_ENV !== 'production';

// Gulp tasks
// ----------------------------------------------------------------------------
gulp.task('bundle', function () {
  bundleApp();
});

gulp.task('watch', function () {
  gulp.watch(['./react-app/*.js'], ['scripts']);
});

gulp.task('default', 'bundle');

// When running 'gulp' on the terminal this task will fire.
// It will start watching for changes in every .js file.
// If there's a change, the task 'scripts' defined above will fire.
gulp.task('default', ['scripts','watch']);

// Private Functions
// ----------------------------------------------------------------------------
function bundleApp() {
  scriptsCount++;
  // Browserify will bundle all our js files together in to one and will let
  // us use modules in the front end.
  var appBundler = browserify({
    entries: './react-app/react-app.js',
    debug: true
  });

  // If it's not for production, a separate vendors.js file will be created
  // the first time gulp is run so that we don't have to rebundle things like
  // react everytime there's a change in the js file
  if (!isProduction && scriptsCount === 1){
    // create vendors.js for dev environment.
    browserify({
      require: dependencies,
      debug: true
    })
      .bundle()
      .on('error', gutil.log)
      .pipe(source('vendors.js'))
      .pipe(gulp.dest('./build/js/'));
  }
  if (!isProduction){
    // make the dependencies external so they dont get bundled by the
    // react-app bundler. Dependencies are already bundled in vendor.js for
    // development environments.
    dependencies.forEach(function(dep){
      appBundler.external(dep);
    })
  }

  appBundler
  // transform ES6 and JSX to ES5 with babelify
    .transform("babelify", {
      presets: ["es2015", "react"],
      plugins: ["react-html-attrs", "transform-class-properties", "transform-decorators-legacy"]
    })
    .bundle()
    .on('error',gutil.log)
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./build/js/'));
}
