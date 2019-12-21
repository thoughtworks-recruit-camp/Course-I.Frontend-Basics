function init() {
  function movementUpdate(event) {
    var activeBlock = document.getElementById("active-block");
    var container = document.getElementById('container');
    var offsetLeft = container.offsetLeft;
    var offsetTop = container.offsetTop;
    var adjustWidth = activeBlock.offsetWidth / 2;
    var adjustHeight = activeBlock.offsetHeight / 2;
    activeBlock.style.left = (event.clientX + window.scrollX - offsetLeft - adjustWidth).toString() + "px";
    activeBlock.style.top = (event.clientY + window.scrollY - offsetTop - adjustHeight).toString() + "px";
  }

  function overlapCheck() {
    var staticBlock = document.getElementById("static-block");
    var vicinity = document.getElementById('vicinity-checker');
    staticBlock.style.background = "blue";
    vicinity.style.zIndex = "-1";
    vicinity.onmouseover = null;
  }

  var border = document.getElementById('border-checker');
  var vicinity = document.getElementById('vicinity-checker');
  border.onmousemove = movementUpdate;
  vicinity.onmouseover = overlapCheck;
}

window.onload = init;
