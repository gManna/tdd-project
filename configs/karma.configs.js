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
    browsers: ['Chrome', 'PhantomJS']
  };

  data.concurrency = Infinity;

  data.plugins = [
//    'karma-chrome-launcher',
    'karma-phantomjs-launcher',
    'karma-babel-preprocessor',
    'karma-jasmine'
  ];

  data.files = [
    "node_modules/jquery/dist/jquery.js",
    "src/**/*.js"
  ];

  data.preprocessors = {
    "src/**/*.spec.js": ['babel'],
    "src/**/!(*.spec).js": ['babel', 'coverage']
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

  data.coverageReporter = {
    instrumenters: {isparta: require('isparta')},

    instrumenter: {
      'src/*.js': 'isparta'
    },

    reporters: [
      {
        type: 'text-summary',
      },
      {
        type: 'html',
        dir: 'coverage/'
      }
    ]
  };

  return config.set(data);
};
