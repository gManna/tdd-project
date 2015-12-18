'use strict';

var babel = require('gulp-babel');
var cache = require('gulp-cached');
var plumber = require('gulp-plumber');
var path = require('path');

function JavascriptTranspile(gulp, configs, APP_DIR) {

  return function JavascriptTranspileWorker(callback) {

    return gulp
        .src(configs.srcGlob)
        .pipe(cache('javascript-transpile', {optimizeMemory: true}))
        .pipe(plumber({errorHandler: error => console.log('transpile.tests:ERROR', error)}))
        .pipe(babel({
          presets: ['es2015']
        }))
        .pipe(gulp.dest(path.join(configs.dist, 'release')))
      ;
  }
}

module.exports = JavascriptTranspile;
