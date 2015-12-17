"use strict";

var _ = require('lodash');
var path = require('path');

module.exports = function(config) {

  var data = {
    basePath: '..',
    colors: true,
    frameworks: ['jasmine'],
    logLevel: config.LOG_INFO,
    port: 9876,
    autoWatch: true,
    singleRun: false,
    browsers: ['Chrome' /*, 'PhantomJS' */]
  };

  data.concurrency = Infinity;

  data.plugins = [
    'karma-jasmine',
    'karma-chrome-launcher',
//    'karma-phantomjs-launcher',
    'karma-babel-preprocessor'
  ];

  data.files = [
    "src/**/*.js"
  ];

  data.preprocessors = {
    "src/**/*.js": ['babel']
  };

  data.babelPreprocessor = {
    options: {
      presets: ['es2015'],
      sourceMap: 'inline'
    },
    filename: function (file) {
      return file.originalPath.replace(/\.js$/, '.es5.js');
    },
    sourceFileName: function (file) {
      return file.originalPath;
    }
  };

  return config.set(data);
};
