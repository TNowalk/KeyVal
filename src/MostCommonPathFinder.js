"use strict";

/*
  Within this file, write your complete solution. As you can see, we read in the log file for you.
*/

const fsp = require('fs-promise');

/**
 * We have written the basics here for you.
 * This is a JS module called MostCommonPathFinder.
 * It contains a single method `findPath` which is
 * where most of your code will go.
 *
 */
const MostCommonPathFinder = (() => {
  /**
   * Any vars you might want here?
   */
  return {
    findPath: (logFilePath) => {
      return fsp.readFile(logFilePath, 'utf8').then((logfileString) => {
        /**
         * Your Code goes here. The logfileString param contains the whole logfile as a string.
         */
        return 'An array of strings containing the most common three path sequence'; // <-- replace this with the answer
      });
    }
  };
})();

module.exports = MostCommonPathFinder;
