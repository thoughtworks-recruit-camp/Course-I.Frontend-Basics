module.exports =
  [
    {
      methodName: "Sort-JS-sort",
      methodFunction: function (rawArray) {
        return rawArray.sort((a, b) => b - a)
      }
    },

    {
      methodName: "Sort-BubbleSort",
      methodFunction: function (array) {
        for (var outerIndex = 0, len = array.length; outerIndex < len - 1; outerIndex++) {
          for (var innerIndex = 0; innerIndex < len - outerIndex - 1; innerIndex++) {
            if (array[innerIndex] < array[innerIndex + 1]) {
              var temp = array[innerIndex];
              array[innerIndex] = array[innerIndex + 1];
              array[innerIndex + 1] = temp;
            }
          }
        }
        return array;
      }
    },

    {
      methodName: "Sort-QuickSort",
      methodFunction: function quickSort(array) {
        if (array.length <= 1) {
          return array;
        }
        var pivotIndex = Math.floor(array.length / 2);
        var pivot = array.splice(pivotIndex, 1)[0];
        var left = [];
        var right = [];
        for (var index = 0, len = array.length; index < len; index++) {
          if (array[index] > pivot) {
            left.push(array[index]);
          } else {
            right.push(array[index]);
          }
        }
        return quickSort(left).concat([pivot], quickSort(right));
      }
    }
  ];