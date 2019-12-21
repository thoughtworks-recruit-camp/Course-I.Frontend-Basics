var sortBenchmark = require('./benchmark');
var methods = require('./methods');

dataSets = [
  {
    dataName: "Random Array(2000)",
    data: function () {
      var array = [];
      for (var index = 0; index < 2000; index++) {
        array.push(Math.floor(Math.random() * 2000))
      }
      return array
    }()
  },
  {
    dataName: "Random Array(4000)",
    data: function () {
      var array = [];
      for (var index = 0; index < 4000; index++) {
        array.push(Math.floor(Math.random() * 4000))
      }
      return array
    }()
  }
];

sortBenchmark(methods,dataSets);