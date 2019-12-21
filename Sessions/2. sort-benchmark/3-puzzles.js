var sortBenchmark = require('./benchmark');
var methods = require('./methods');

dataSets = [

  {
    dataName: "Random Array(100)",
    data: function () {
      var array = [];
      for (var index = 0; index < 100; index++) {
        array.push(Math.floor(Math.random() * 100))
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
    dataName: "Random Array(10000)",
    data: function () {
      var array = [];
      for (var index = 0; index < 10000; index++) {
        array.push(Math.floor(Math.random() * 10000))
      }
      return array
    }()
  }

];

sortBenchmark(methods,dataSets);