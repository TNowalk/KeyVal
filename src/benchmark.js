const MostCommonPathFinder = require('./MostCommonPathFinder');
const argv = require('yargs').argv;
const fs = require('fs');

const supportedMethods = ['simple', 'reduce', 'map'];
const benchmarkLogPath = './benchmark.log';

let rows = +argv.rows || 10;

if (!Number.isInteger(rows)) {
  console.info(`Unexepcted row value (${argv.rows}), defaulting to 10`);
  rows = 10;
}

if (rows < 10) {
  console.info(`Expected at least 10 rows, increasing row count`);
  rows = 10;
}

run();

async function run() {
  // Generate test data
  console.info(`Generating ${rows} random log entries...`);
  let data = [];
  for (let i = 0; i < rows; i++) {
    data.push([randomNumber(1000, 1000 + (rows * 1.5)), generateRandomPath()].join(' '));
  }
  data = data.join('\n');

  // Generate a test file to be used for all methods
  console.info(`Writing log entries to ${benchmarkLogPath}...`);
  fs.writeFileSync(benchmarkLogPath, data);

  console.info('Starting benchmarks...');
  for (let method of supportedMethods) {
    console.time(`Benchmark for ${method}`);
    await MostCommonPathFinder.findPath(benchmarkLogPath, 5, method).then((res) => {
      console.timeEnd(`Benchmark for ${method}`);
    });
  }
}

function randomNumber(min = 1, max = 9999) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomPath() {
  const paths = [
    '/',
    '/about',
    '/careers',
    '/pricing',
    '/terms',
    '/blog',
    '/developers',
    '/explorer',
    '/blockchain-definitions',
    '/blog/blockchain_loyalty_program',
    '/technology-innovations',
    '/about/leadership',
    '/privacy-policy',
    '/explore/dragonscale',
    '/blockchain-platform',
    '/resources/faq',
    '/blog/developer_plan_available_now',
    '/contact-us',
    '/news-embargo',
    '/resources/slumber-score'
  ];

  return paths[randomNumber(0, paths.length - 1)];
}
