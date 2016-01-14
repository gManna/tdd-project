"use strict";

const scripts = require('../../package.json').scripts;
var exec = ((driver) => {

  return function(command) {
    return new Promise((resolve, reject) => {
      driver(command, (err, stdout, stderr) => {
        if(err) {
          return reject(err);
        }

        return resolve(stdout);
      });
    });
  }
})(require('child_process').exec);

exec(scripts.js)
  .then(res => {
    return exec(scripts.test);
  })
  .then(res => {
    return exec(scripts.metrics);
  })
  .then(
  () => console.log('Script Executed'),
  () => console.log('Script Executed')
);
