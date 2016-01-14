"use strict";

var
  plato = require('plato'),
  globby = require('globby'),
  path = require('path'),
  fs = require('fs'),

  defaults = require('./defaults.config.js'),
  jshint = { globals: {}, options: {}},
  jshintrc = fs.readFileSync(path.join(defaults.ROOT, '.jshintrc')).toString().trim()
;
const OUTPUT_DIR = defaults.METRICS_OUTPUT_DIR;
var files = globby.sync(path.join(`${defaults.SRC_JS_FULLPATH}`, '**', '*.js'));

try {
  jshintrc = JSON.parse(jshintrc);
} catch(e) {
  console.log('Parse jshintrc Error', e);
}

if(jshintrc.globals) {
  jshint.globals = jshintrc.globals;
  delete jshintrc.globals;
}

jshint.options = jshintrc;

let isRan = false;
plato.inspect(files, OUTPUT_DIR, {
  "jshint": jshint
}, (report) => {
  isRan || console.log('Metrics available at \n', path.join(OUTPUT_DIR, 'index.html'));
  isRan = true;
});
