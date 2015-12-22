"use strict";

var _ = require('lodash');
var path = require('path');

const PORT = 9876;
const AUTO_WATCH = (function(cliOptions) {
  var res;

  try {
    res = (cliOptions.indexOf('testDrivenDevelopment') > -1)
  } catch(e) {
    res = false;
  }

  (res && console.log('STARTING TEST DRIVEN DEVELOPMENT', '\n', 'SERVER LISTENING AT', '\n', `localhost:${PORT}`, '\n'));
  return res;
})(process.argv);

const COMPONENT = (function(cliOptions) {
  var res = '';
  var needle = /^components=(.+)/;

  // TODO: Adjust when multiple components are passed, actually data.files seems doesn't accept whitelists
  for(var i = 0; i < cliOptions.length; i++) {
    var param = cliOptions[i];
    if(needle.test(param)) {
      res = param.split('=').pop().split(',');
      break;
    }
  }

  if(res.length > 1) {
    res = `{${res.join(',')}}`;
  } else {
    res = res && res.join(',');
  }

  if(res) {
    res = `${res}/**/`;
  }

  if(!AUTO_WATCH) {
    res = '';
  }

  return res;
})(process.argv);

const SOURCES_ALL = `src/**/${COMPONENT}*.js`;
const SOURCES = `src/**/${COMPONENT}!(*.spec).js`;
const SOURCE_SPECS = `src/**/${COMPONENT}*.spec.js`;

module.exports = function(config) {

  var data = {
    basePath: '..',
    colors: true,

    logLevel: config.LOG_INFO,
    port: PORT,
    autoWatch: AUTO_WATCH,
    singleRun: !AUTO_WATCH,

    frameworks: ['jasmine'],
    browsers: ['Chrome', 'PhantomJS']
  };

  data.concurrency = Infinity;

  data.plugins = [
    'karma-chrome-launcher',
    'karma-phantomjs-launcher',
    'karma-babel-preprocessor',
    'karma-coverage',
    'karma-eslint',
    'karma-jasmine'
  ];

  data.files = [
    "node_modules/jquery/dist/jquery.js",
    "node_modules/jasmine-jquery/lib/jasmine-jquery.js",
    {pattern: 'src/**/fixtures/**/*.html', watched: true, served: true, included: false},
    SOURCES_ALL
  ];

  data.preprocessors = {
    [SOURCE_SPECS]: ['babel', 'eslint'],
    [SOURCES]: ['babel', 'coverage', 'eslint']
  };

  data.eslint = {
    stopOnError: true,
    stopOnWarning: false
  };

  data.babelPreprocessor = {
    options: {
      presets: ['es2015'],
      sourceMap: 'inline'
    },
    filename: function(file) {
      return file.originalPath.replace(/\.js$/, '.es5.js');
    },
    sourceFileName: function(file) {
      return file.originalPath;
    }
  };

  data.reporters = ['dots', 'coverage'];
  data.coverageReporter = {
    instrumenters: {
      isparta: require('isparta')
    },

    instrumenter: {
      [SOURCES_ALL]: 'isparta'
    },

    reporters: [
      {
        type: 'text-summary'
      },
      {
        type: 'html',
        dir: 'dist/reports/coverage/'
      }
    ],
    instrumenterOptions: {
      isparta: {
        babel: {
          presets: 'es2015'
        }
      }
    }
  };

  return config.set(data);
};
