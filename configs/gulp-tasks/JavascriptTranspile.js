'use strict';

var babel = require('gulp-babel');
var cache = require('gulp-cached');
var plumber = require('gulp-plumber');
var merge = require('merge2');
var path = require('path');
var globby = require('globby');

function JavascriptTranspile(gulp, configs, APP_DIR) {

  return function JavascriptTranspileWorker(callback) {

    const sourcesFiles = globby.sync(
      [
        '**/*.js',
        '!**/*.spec.js'
      ],
      {
        cwd: configs.src
      }
    ).map(file => path.join(configs.src, file));

    let sources = gulp
        .src(sourcesFiles)
        .pipe(cache('javascript-transpile', {optimizeMemory: true}))
        .pipe(plumber({errorHandler: error => console.log('transpile.tests:ERROR', error)}))
        .pipe(babel({
          presets: ['es2015']
        }))
        .pipe(gulp.dest(path.join(configs.dist, 'release')))
      ;

    let tests = gulp
        .src(configs.srcTestsGlob)
        .pipe(cache('javascript-transpile-tests', {optimizeMemory: true}))
        .pipe(plumber({errorHandler: error => console.log('transpile.tests:ERROR', error)}))
        .pipe(babel({
          presets: ['es2015']
        }))
        .pipe(gulp.dest(path.join(configs.dist, 'tests')))
      ;

    return merge(sources, tests);
  }
}

module.exports = JavascriptTranspile;
