"use strict";
var
  fs = require('fs'),
  path = require('path'),

  requireScripts = path.join.bind(path, __dirname, './store-requires/'),
  desktopScripts = require(requireScripts('desktop.json')),
  smartphoneScripts = require(requireScripts('smartphone.json')),

  configs = {},
  entries = []
;


configs.ROOT = path.resolve(__dirname, '..');
configs.SRC_JS = 'src';
configs.SPECS_SRC = `${configs.SRC_JS}/**/specs`;
configs.DEST_JS = path.join(configs.ROOT, 'public');
configs.ANALYSIS_DIR = path.join(configs.DEST_JS, 'reports');
configs.SPECS_SRC_GLOB = `**/${configs.SPECS_SRC}/**/*.spec.js`;
configs.SRC_JS_FULLPATH = path.resolve(configs.ROOT, configs.SRC_JS);
configs.METRICS_OUTPUT_DIR = path.join(configs.ANALYSIS_DIR, 'metrics');

let addEntries = (sources, device) => {
  sources.forEach((item, index) => {

    item.Scripts.forEach((src, index) => {
      let file = path.join(device, src);

      entries.push(file);
    });

  });
};

addEntries(desktopScripts, 'Desktop');
addEntries(smartphoneScripts, 'Smartphone');

configs.entries = entries;
module.exports = configs;
