"use strict";

var
  path = require('path'),
  webpack = require('webpack'),
  defaults = require('./defaults.config.js')
  ;

const ROOT = defaults.ROOT;
const SRC_JS = defaults.SRC_JS_FULLPATH;
const DEST_JS = defaults.DEST_JS;

var configs = {
    target: 'web',
    context: ROOT,
    devtool: "inline-source-map",
    resolve: {
      root: [
        SRC_JS
      ],
      alias: {
        "app": SRC_JS,
        "npm": path.join(ROOT, 'node_modules')
      },
      fallback: [SRC_JS],
      extensions: ['', '.js']
    },
    module: {
      preLoaders: [
        {
          test: /\.js$/,
          loaders: ['eslint']
        }
      ],

      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
            presets: ["es2015"],
            plugins: ["transform-es3-property-literals", "transform-es3-member-expression-literals"]
          }
        }
      ],

      postLoaders: []
    },
    entry: {},
    output: {
      path: DEST_JS,
      filename: "[name]"
    },
    externals: {
      "window/jQuery" : "window.jQuery",
      "window/$M": "window.$M",
      "window/$Y": "window.$Y"
    }
  }
;

defaults.entries.forEach((component, index) => {
  configs.entry[component] = [
    path.join(SRC_JS, `${component}`)
  ];
});

module.exports = configs;
