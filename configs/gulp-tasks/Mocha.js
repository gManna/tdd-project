'use strict';

var mocha = require('gulp-mocha');

function MochaTask(gulp, configs, APP_DIR) {

  return function MochaTaskWorker(callback) {
    return gulp
      .src(configs.testsGlob, {
        read: false
      })
      .pipe(mocha({
        reporter: 'nyan',
        ui: 'tdd'
      }))
    ;
  }
}

module.exports = MochaTask;
