var sortBenchmark = require('./benchmark');
var methods = require('./methods');


dataSets = [
  {
    dataName: "Small Array(5)",
    data: [5, 1, 8, 10, 4]
  },
  {
    dataName: "Sequential Array(1000)",
    data: function () {
      var array = [];
      for (var index = 0; index < 1000; index++) {
        array.push(index)
      }
      return array
    }()
  },
  {
    dataName: "Random Array(1000)",
    data: function () {
      var array = [];
      for (var index = 0; index < 1000; index++) {
        array.push(Math.floor(Math.random() * 1000))
      }
      return array
    }()
  },
  {
    dataName: "Reversed Array(1000)",
    data: function () {
      var array = [];
      for (var index = 0; index < 1000; index++) {
        array.push(1000 - index)
      }
      return array
    }()
  }
];

sortBenchmark(methods, dataSets);