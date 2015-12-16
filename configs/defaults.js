'use strict';

let path = require('path');

function defaultFrontendConfigs(gulp, APP_DIR) {
  var res = {};

  res.APP_DIR = APP_DIR;

  res.src = path.join(APP_DIR, './src');

  res.srcGlob = path.join(res.src, '**', '*.js');
  res.srcTestsGlob = path.join(res.src, '**', '*.spec.js');

  res.dist = path.join(APP_DIR, 'dist');

  res.testsGlob = path.join(res.dist, 'tests', '**', '*.spec.js');
  return res;
}

module.exports = defaultFrontendConfigs;
