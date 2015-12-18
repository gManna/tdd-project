'use strict';

var
  gulp = require('gulp'),
  path = require('path')
  ;

let
  configsPath = path.join(__dirname, 'configs'),
  configs = require(path.join(configsPath, 'defaults.js'))(gulp, __dirname),
  taskFile = (task) => require(path.join.call(path, configsPath, 'gulp-tasks', task))(gulp, configs, __dirname)
;

gulp.task('javascript', taskFile('JavascriptTranspile'));


gulp.task('watch', () => {
  gulp.watch(configs.srcGlob, ['javascript']);
});
