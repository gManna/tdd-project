"use strict";

var
  _ = require('lodash'),
  defaults = require('./defaults.config.js'),
  webpackConfigs = _.merge({}, require('./webpack.config.js'))
  ;

delete webpackConfigs.entry;
delete webpackConfigs.output;
delete webpackConfigs.context;
delete webpackConfigs.target;


const PORT = 9876;
const SRC_JS = defaults.SRC_JS;
const PUBLIC_JS = defaults.DEST_JS;

const SOURCES_SPECS = defaults.SPECS_SRC_GLOB;
const SOURCES = `${SRC_JS}/**/!(*.spec).js`;

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

  configs.browsers = ['Chrome', 'PhantomJS'];
  configs.frameworks = ['jasmine'];

  configs.files = [
    "node_modules/jquery/dist/jquery.js",
    "node_modules/jasmine-jquery/lib/jasmine-jquery.js",
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
    "karma-jasmine",
    "karma-webpack",
    "karma-coverage",
    'karma-phantomjs-launcher',
    "karma-chrome-launcher",
    "karma-sourcemap-loader"
  ];

  webpackConfigs.devtool = "inline-source-map";
  webpackConfigs.module.preLoaders.unshift({
    test: /\.js$/,
    loader: 'isparta',
    include: defaults.SRC_JS_FULLPATH
  });
  webpackConfigs.isparta = {
    embedSource: true,
    noAutoWrap: true,
    babel: {
      presets: ['es2015']
    }
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
