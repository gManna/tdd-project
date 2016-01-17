"use strict";

var
  _ = require('lodash'),
  path = require('path'),
  defaults = require('./defaults.config.js'),
  webpackConfigs = _.merge({}, require('./webpack.config.js'))
  ;

delete webpackConfigs.entry;
delete webpackConfigs.output;
delete webpackConfigs.context;
delete webpackConfigs.target;

const IS_WINDOWS = /^win/.test(process.platform);
const PORT = 9876;
const SOURCES_SPECS = defaults.SPECS_SRC_GLOB;

const BROWSERS = ((useAllBrowsers) => {
  let list = ['PhantomJS'];
  let all = ['Chrome', 'Firefox'];
  let windowsBrowsers = ['IE', 'IE9', 'IE8'];

  if(useAllBrowsers) {
    list = list.concat(all);

    if(IS_WINDOWS) {
      list = list.concat(windowsBrowsers);
    }
  }

  return list;
})(!!process.argv.filter(res => res === '--single-run').length);


function karmaConfig(karma) {
  var
    preprocessors = {},
    configs = {
      logLevel: karma.LOG_INFO,
      port: PORT,
      colors: true,
      concurrency: Infinity,

      basePath: '..'
    }
    ;

  configs.browsers = BROWSERS;
  configs.frameworks = ['jasmine'];

  configs.files = [
    "node_modules/jquery/dist/jquery.js",
    "node_modules/jasmine-jquery/lib/jasmine-jquery.js",
    "node_modules/injector/release/predators-es6-injector.js",
    SOURCES_SPECS
  ];

  preprocessors[SOURCES_SPECS] = ['webpack', 'sourcemap'];

  configs.reporters = ['dots', 'coverage'];

  configs.coverageReporter = {
    dir: defaults.ANALYSIS_DIR,
    reporters: [
      {type: 'html', subdir: 'coverage'}
    ]
  };

  configs.plugins = [
    "karma-chrome-launcher",
    "karma-phantomjs-launcher",
    "karma-firefox-launcher",
    "karma-ie-launcher",

    "karma-jasmine",
    "karma-webpack",
    "karma-coverage",
    "karma-sourcemap-loader"
  ];

  configs.customLaunchers = {
    IE10: {
      base: 'IE',
      'x-ua-compatible': 'IE=EmulateIE10',
      flags: ['-extoff']
    },
    IE9: {
      base: 'IE',
      'x-ua-compatible': 'IE=EmulateIE9',
      flags: ['-extoff']
    },
    IE8: {
      base: 'IE',
      'x-ua-compatible': 'IE=EmulateIE8',
      flags: ['-extoff']
    }
  };

  webpackConfigs.devtool = "inline-source-map";
  webpackConfigs.module.preLoaders.unshift({
    test: /\.js$/,
    loader: 'isparta',
    include: defaults.SRC_JS_FULLPATH
  });
  webpackConfigs.isparta = {
    embedSource: true,
    noAutoWrap: true
  };

  configs.webpack = webpackConfigs;
  configs.webpackMiddleware = {
    progress: false,
    stats: false,
    debug: true,
    noInfo: true,
    silent: true
  };
  configs.preprocessors = preprocessors;
  return karma.set(configs);
}

module.exports = karmaConfig;
