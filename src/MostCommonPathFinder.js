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
// const MostCommonPathFinder = (() => {
//   /**
//    * Any vars you might want here?
//    */
//   return {
//     findPath: (logFilePath) => {
//       return fsp.readFile(logFilePath, 'utf8').then((logfileString) => {
//         /**
//          * Your Code goes here. The logfileString param contains the whole logfile as a string.
//          */
//         return 'An array of strings containing the most common three path sequence'; // <-- replace this with the answer
//       });
//     }
//   };
// })();

function reduceMethod(arr) {
  return arr.reduce((counter, line) => {
    let [ user, path ] = line;
    // TODO: Figure out why I'm getting a 1 and why /home isn't getting a value
    if (!path) {
      return counter;
    }
    console.log('path', path);
    console.log('counter', counter);
    counter[path] = counter.hasOwnProperty(path) ? counter[path] + 1 : 1;
    return counter;
  });
}

const MostCommonPathFinder = {
  // TODO: Add method parameter, to be used with benchmarking.  Will create a
  // separate file (and npm task) that will loop through the available methods
  // and run each, perform benchmark
  // TODO: Add parameter for length of sequence to be returned
  findPath: async (logFilePath) => {
    // TODO: Need to update the tests to mock valid / invalid responses before uncommenting
    // if (!(await fsp.exists(logFilePath))) {
    //   throw new Error(`Could not find file (${logFilePath})`);
    // }

    const data = await fsp.readFile(logFilePath, 'utf8').then(contents => {
      // Take the raw file contents, we expect the file to be new line separated
      contents = contents.split('\n');

      // Take into account that there might be empty rows
      contents = contents.filter(line => line.length);

      // We assume that each valid line is space separated
      contents = contents.map(line => line.split(' '));

      // TODO: Add a check for row length, throw error if 0

      return contents;
    });

    const map = reduceMethod(data);

    console.log(map);

    // console.log(logFilePath);
    // console.log(data);

    return [ '/2', '/3', '/4' ];
  },
  reduceMethod: () => {
    return 'true';
  }
};

module.exports = MostCommonPathFinder;
