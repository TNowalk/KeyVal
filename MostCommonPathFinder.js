"use strict";

// TODO: revert this back, add a note that it's confusing to have the same file named twice in two locations

/*
  Within this file, write your complete solution. As you can see, we read in the log file for you.
*/

const fsp = require('fs-promise');

const MostCommonPathFinder = {
  findPath: async (logFilePath) => {
    const data = []; //await fsp.readFile(logFilePath, 'utf8');

    return data;
  }
}

// const MostCommonPathFinder = (() => {
//   let findPath = (logFilePath) => {
//     return fsp.readFile(logFilePath, 'utf8').then((logfileString) => { // read the log file
//
//       return `The Answer`;
//     });
//   }
//
//   // return exposed methods
//   return {
//     findPath: findPath
//   };
// })();

module.exports = MostCommonPathFinder;
