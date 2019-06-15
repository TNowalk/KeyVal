## Description
A simple log file parser which reads in files that contain a list of user `ids` and the `path` of the web application that they have visited.  The logs are expected to be in chronological order, but multiple users are expected to be using the app simultaneously.  The objective of the parser is to return the most comment paths as efficiently as possible.

#### Example Log Contents

```cs
1 /home
1 /cart
1 /dragon
2 /dashboard
2 /home
2 /cart
3 /home
3 /cart
3 /dragon
```

The expected run value for this example would be: `['/home', '/cart', '/dragon']`

### Installing

Clone the project locally and cd into it
```
git clone git@github.com:TNowalk/KeyVal.git && cd $_
```

Install Dependencies
```
npm Install
```

### Usage

```javascript
const MostCommonPathFinder = require('./MostCommonPathFinder');

MostCommonPathFinder.findPath('./path/to/file.log').then((results) => {
 // Do something with results
});
```

##### Arguments

* **logFilePath**: Path to the log file (_Required_)
* **length**: The number of top paths to be returned (_Default: 3_)
* **method**: The aggregation method to be used (_[simple, reduce, map], Default: simple_)

> Note: The results will be returned in the same order, regardless of what method was chosen.  The methods are used here as more of a proof of concept, in testing, the `simple` method has shown to be the fastest.

Example:
```javascript
const MostCommonPathFinder = require('./MostCommonPathFinder');

MostCommonPathFinder.findPath('./path/to/file.log', 100, 'reduce').then((results) => {
 // Do something with results
});
```

### Tests

Unit tests can be run with `npm run test`

### Benchmarking

To perform benchmarking of the various methods used, can run `npm run benchmark`.

By default, the benchmark will generate a file with 10 randomly created log file entries.  To override the default number of rows, pass in `--rows=n` as an argument when calling the benchmark script.  

Example:
```bash
node run benchmark -- --rows=1000000

Generating 1000000 random log entries...
Writing log entries to ./benchmark.log...
Starting benchmarks...
Benchmark for simple: 1815.408ms
Benchmark for reduce: 1761.439ms
Benchmark for map: 2111.196ms
```

> Note: If using an older version of npm, you must include the extra `--` when executing the npm script to pass through the arguments.  In newer versions of npm, this is not necessary and you can just use `npm run benchmark --rows=1000000`

<!-- # Most Common Three Path Sequence


## Explanation
You are given a log file of unknown length which contains a list of user `ids` and the `path` of a web application they have visited. The logs are in order but multiple users are simultaneously using the application. The objective is to write an algorithm that returns the most common three path sequence as efficiently as possible.

The log file will be in this format:
```
1 /home
1 /cart
1 /dragon
2 /dashboard
2 /home
2 /cart
3 /home
3 /cart
3 /dragon
```
and we have already read the file in for you.

The return value for this example would be: `['/home', '/cart', '/dragon']`

User `1` and `3` both went to the path `home cart dragon`.

We have written a unit test to prove your solution. Before committing the code to your own repo, be sure to run the test to verify your code matches with `jasmine`.

## Instructions
1. `npm install` at root of project.
1. Familiarize  yourself with the existing code, then write your solution in MostCommonPathFinder.js.
1. Run tests with `npm run test` to make sure your code returns matching expected format and criteria.

## Extra Credit
* Rewrite with async/await and remove IIFE module.
* Write more unit tests to further prove your algorithm.
* Include benchmarking with different solutions.
* Allow parameterized length of sequence. -->
