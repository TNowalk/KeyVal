"use strict";

const fsp = require('fs-promise');

function sortObjByValue(obj) {
  // For the purposes of the exercise, only care about the path (key).  Grab
  // the keys from the object passed in (path => count).  Sort the list of
  // paths, use the key to get the count sort in descending order.  Note, this
  // will return paths with the same counts in the order in which they were
  // found in the log.
  return Object.keys(obj).sort(( a,b ) => obj[b] - obj[a])
}

function simpleMethod(arr) {
  if (!Array.isArray(arr)) {
    throw new Error(`[simpleMethod] Invalid input, expected array but got ${typeof arr}`);
  }

  let counts = {};

  arr.forEach(val => {
    counts[val.path] = counts[val.path] || 0;
    counts[val.path]++;
  });

  return sortObjByValue(counts);
}

function reduceMethod(arr) {
  if (!Array.isArray(arr)) {
    throw new Error(`[reduceMethod] Invalid input, expected array but got ${typeof arr}`);
  }

  const counts = arr.reduce((counter, val) => {
    counter[val.path] = counter[val.path] || 0;
    counter[val.path]++;
    return counter;
  }, {}); // Initialize counter as empty object

  return sortObjByValue(counts);
}

function mapMethod(arr) {
  if (!Array.isArray(arr)) {
    throw new Error(`[mapMethod] Invalid input, expected array but got ${typeof arr}`);
  }

  let counts = {};

  arr.map(val => {
    counts[val.path] = counts[val.path] || 0;
    counts[val.path]++;
    return val;
  });

  return sortObjByValue(counts);
}

const MostCommonPathFinder = {
  findPath: async (logFilePath, length = 3, method = 'simple') => {
    if (!(await fsp.exists(logFilePath))) {
      throw new Error(`File does not exist (${logFilePath})`);
    }

    const data = await fsp.readFile(logFilePath, 'utf8').then(contents => {
      if (!contents.length) {
        throw new Error('[findPath] Empty file');
      }

      // Take the raw file contents, we expect the file to be new line separated
      contents = contents.split('\n');

      // Take into account that there might be empty rows
      contents = contents.filter(line => line.length);

      // Remove invalid rows, should have two columns
      contents = contents.filter(line => line.split(' ').length == 2);

      // We assume that each valid line is space separated
      contents = contents.map(line => {
        const [ user, path ] = line.split(' ');
        return { user, path };
      });

      if (!contents.length) {
        throw new Error('[findPath] No valid rows found');
      }

      return contents;
    });

    let mappedPaths;

    switch (method) {
      case 'reduce': mappedPaths = reduceMethod(data); break;
      case 'map': mappedPaths = mapMethod(data); break;
      default: mappedPaths = simpleMethod(data);
    }

    return mappedPaths.slice(0, length);
  }
};

module.exports = MostCommonPathFinder;
