DedupM1 = {
  methodName: "Method-ES6-Set",
  methodFunction: function (array) {
    return Array.from(new Set(array));
  }
};

DedupM2 = {
  methodName: "Method-indexOf",
  methodFunction: function (array) {
    var newArray = [];
    for (var i = 0, length = array.length; i < length; i++) {
      if (newArray.indexOf(array[i]) === -1) {
        newArray.push(array[i])
      }
    }
    return newArray;
  }
};

DedupM3 = {
  methodName: "Method-includes",
  methodFunction: function (array) {
    var newArray = [];
    for (var i = 0, length = array.length; i < length; i++) {
      if (!newArray.includes(array[i])) {
        newArray.push(array[i]);
      }
    }
    return newArray;
  }
};

DedupM4 = {
  methodName: "Method-filter",
  methodFunction: function (array) {
    return array.filter(function (item, index, array) {
      return array.indexOf(item, 0) === index;
    });
  }
};

FlatM1 = {
  methodName: "Method-ES6-flat",
  methodFunction: function (array) {
    return array.flat(Infinity)
  }
};

FlatM2 = {
  methodName: "Method-toString",
  methodFunction: function (array) {
    return array.toString().split(',').map(item => Number(item))
  }
};
FlatM3 = {
  methodName: "Method-recursion",
  methodFunction: function (arr) {
    var result = [];
    function flat(arr, result) {
      for (var item of arr) {
        if (typeof item !== "object") {
          result.push(item)
        } else {
          flat(item, result)
        }
      }
      return result
    }
    return flat(arr, result)
  }
};


function dedupBenchmark(Method, data) {
  var methodName = Method.methodName;
  var dataName = "Array" + "(" + data.length + ")";
  var dedupFunction = Method.methodFunction;
  var iterations = Math.floor(10000 / data.length) * 10000;
  var startTime = (new Date()).getTime();
  for (var i = 1; i <= iterations; i++) {
    dedupFunction(data);
  }
  var stopTime = new Date().getTime() - startTime;
  var averTimeNs = Math.round(stopTime / iterations * 1000000);
  console.log((stopTime.toString() + "ms (" + averTimeNs.toString() + "ns per iteration) consumed by "
      + iterations + " runs of " + methodName + " for " + dataName));
  return(dedupFunction(data))
}

function flatBenchmark(Method, data, isDeep) {
  var methodName = Method.methodName;
  var dataName = "NestedArray" + "(" + (isDeep ? "Deep" : "Normal") + ")";
  var flatFunction = Method.methodFunction;
  var iterations = isDeep ? 10000 : 1000000;
  var startTime = (new Date()).getTime();
  for (var i = 1; i <= iterations; i++) {
    flatFunction(data);
  }
  var stopTime = new Date().getTime() - startTime;
  var averTimeNs = Math.round(stopTime / iterations * 1000000);
  console.log(stopTime.toString() + "ms (" + averTimeNs.toString() + "ns per iteration) consumed by "
      + iterations + " runs of " + methodName + " for " + dataName);
  return(flatFunction(data))
}

var smallArray = [1, 2, 3, 4, 5, 6, 5, 3, 2, 4, 56, 4, 1, 2, 1, 9, 1, 1, 11, 1, 56, 45, 56];
var LargeArray = function () {
  var newArray = [];
  for (var i = 1; i <= 100; i++) {
    newArray = newArray.concat(smallArray)
  }
  return newArray
}();

var nestedArray = [1, [2, [3, 4]], [5, 6, [7, [8, 9]]]];
var deepNestedArray = function () {
  var newArray = nestedArray.concat();
  for (var i = 1; i <= 100; i++) {
    var tempArray = newArray.concat();
    newArray = nestedArray.concat();
    newArray.push(tempArray)
  }
  return newArray
}();
// dedupBenchmark(DedupM1, smallArray);
// dedupBenchmark(DedupM2, smallArray);
// dedupBenchmark(DedupM3, smallArray);
// dedupBenchmark(DedupM4, smallArray);
// dedupBenchmark(DedupM1, LargeArray);
// dedupBenchmark(DedupM2, LargeArray);
// dedupBenchmark(DedupM3, LargeArray);
// dedupBenchmark(DedupM4, LargeArray);

flatResultString1=flatBenchmark(FlatM1, nestedArray, false).toString();
flatResultString2=flatBenchmark(FlatM2, nestedArray, false).toString();
flatResultString3=flatBenchmark(FlatM3, nestedArray, false).toString();
console.assert(flatResultString1===flatResultString2 && flatResultString2===flatResultString3);
flatBenchmark(FlatM1, deepNestedArray, true);
flatBenchmark(FlatM2, deepNestedArray, true);
flatBenchmark(FlatM3, deepNestedArray, true);