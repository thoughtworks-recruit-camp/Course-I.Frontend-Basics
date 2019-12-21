function isOverlap(A, B) {
  return (((B.xMin < A.xMin && A.xMin < B.xMax) || (B.xMin < A.xMax && A.xMax < B.xMax))  // X overlap
    &&
    ((B.yMin < A.yMin && A.yMin < B.yMax) || (B.yMin < A.yMax && A.yMax < B.yMax))) // Y overlap
}

function init() {
  var container = document.getElementById('container');
  var activeBlock = document.getElementById("active-block");
  var staticBlock = document.getElementById("static-block");

  var containerLeft = container.offsetLeft;
  var containerTop = container.offsetTop;
  var cHalfWidth = container.offsetWidth / 2;
  var cHalfHeight = container.offsetHeight / 2;

  var coordinatesStatic = {
    xMin: staticBlock.offsetLeft,
    xMax: staticBlock.offsetLeft + staticBlock.offsetWidth,
    yMin: staticBlock.offsetTop,
    yMax: staticBlock.offsetTop + staticBlock.offsetHeight
  };

  function checkOverlap() {
    if (staticBlock.style.background !== "blue") {
      var coordinatesActive = {
        xMin: activeBlock.offsetLeft,
        xMax: activeBlock.offsetLeft + activeBlock.offsetWidth,
        yMin: activeBlock.offsetTop,
        yMax: activeBlock.offsetTop + activeBlock.offsetHeight
      };
      if (isOverlap(coordinatesActive, coordinatesStatic)) {
        staticBlock.style.background = "blue";
      }
    }
  }

  function updateTracking(event) {
    var relativeX = event.clientX + window.scrollX - containerLeft;  // 考虑屏幕滚动影响
    var relativeY = event.clientY + window.scrollY - containerTop;

    var bHalfWidth = activeBlock.offsetWidth / 2;
    var bHalfHeight = activeBlock.offsetHeight / 2;

    var leftPos = (Math.abs(relativeX - cHalfWidth) < cHalfWidth - bHalfWidth) ?  //  ? Is In Container Area
      relativeX - bHalfWidth : ((relativeX < cHalfWidth) ?  // Real Position : Border Position (? Which Border)
        0 : (cHalfWidth - bHalfWidth) * 2);  // Left Border : Right Border
    var topPos = (Math.abs(relativeY - cHalfHeight) < cHalfHeight - bHalfHeight) ?  //  ? Is In Container Area
      relativeY - bHalfHeight : ((relativeY < cHalfHeight) ?  // Real Position : Border Position (? Which Border)
        0 : (cHalfHeight - bHalfHeight) * 2);  // Top Border : Bottom Border
    activeBlock.style.left = leftPos.toString() + "px";
    activeBlock.style.top = topPos.toString() + "px";
    checkOverlap();
  }

  function activateTracking() {
    document.onmousemove = updateTracking;  // 绑定到container的话鼠标移出去activeBlock就不动了，有时会卡在接近边缘的位置
  }

  function deactivateTracking() {
    document.onmousemove = null;
  }

  activeBlock.onmousedown = activateTracking;
  document.onmouseup = deactivateTracking;  // 绑定到activeBlock的话鼠标移出去container不会解除跟踪
}


window.onload = init;
