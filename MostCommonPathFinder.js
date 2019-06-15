"use strict";

// NOTE: Having two files named the same thing tripped me up for a minute, I started work in here
// and spent a few minutes trying to figure out why I wasn't seeing my changes.  Eventually I followed
// the npm comment, to jasmine, to ./spec/support/jasmine.json to see it was loading from ./src.
// Additionally, there are duplicate spec files in ./spec that aren't used.  Not sure if these
// are included intentionally, but wanted to make a note of it.

/*
  Within this file, write your complete solution. As you can see, we read in the log file for you.
*/

const fsp = require('fs-promise');

const MostCommonPathFinder = (() => {
  let findPath = (logFilePath) => {
    return fsp.readFile(logFilePath, 'utf8').then((logfileString) => { // read the log file

      return `The Answer`;
    });
  }

  // return exposed methods
  return {
    findPath: findPath
  };
})();

module.exports = MostCommonPathFinder;
