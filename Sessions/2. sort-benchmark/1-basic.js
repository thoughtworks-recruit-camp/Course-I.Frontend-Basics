var sortBenchmark = require('./benchmark');
var methods = require('./methods');

dataSets = [
  {
    dataName: "Small Array(5)",
    data: [5, 1, 8, 10, 4]
  }
];

sortBenchmark(methods, dataSets);