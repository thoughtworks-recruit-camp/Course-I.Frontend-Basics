function setAttributes(attrNames, attrValues) {  // shortcut for setAttribute
  console.assert(attrNames.length === attrValues.length);
  for (var i = 0, length = attrNames.length; i < length; i++) {
    this.setAttribute(attrNames[i], attrValues[i]);
  }
}

function appendChildren(children) {  // shortcut for appendChild
  for (var i = 0, length = children.length; i < length; i++) {
    this.appendChild(children[i]);
  }
}

window.onload = function () {


  var textBox = document.getElementById("text-box");
  var addButton = document.getElementById("add-button");
  var todoList = document.getElementsByTagName("ol")[0];
  var listItems = document.getElementsByTagName("li");
  var checkBoxes = document.getElementsByClassName("check-box");
  var filterDiv = document.getElementById("filters");

  var currentFilter = "ALL";

  function addLi(entry) {
    var li = document.createElement("li");
    li.setAttribute("item-index", entry.index);
    var checkBox = document.createElement("input");
    setAttributes.call(checkBox, ["type", "class"], ["checkbox", "check-box"]);
    checkBox.checked = entry.done;
    var content = document.createElement("span");
    content.innerHTML = entry.content;
    appendChildren.call(li, [checkBox, content]);
    todoList.appendChild(li);
  }

  function addEntry() {
    if (textBox.value) {
      var index = localStorage.length.toString();
      var entry = {"index": index, "content": textBox.value, "done": false};
      addLi(entry);
      textBox.value = "";
      localStorage.setItem(index, JSON.stringify(entry));
    }
    updateFilter();
  }

  function toggleFilter(event) {
    var filterCode = event.target.value;
    updateFilter(filterCode);
    updateButtons();
  }

  function updateButtons() {
    for (var filter of filterDiv.getElementsByTagName("INPUT")) {
      filter.style.borderColor = filter.value === currentFilter ? "#fcadb0" : ""
    }
  }

  function updateFilter(filterCode) {
    if (filterCode) {
      currentFilter = filterCode;
    }
    switch (currentFilter) {
      case "ALL":
        for (var li of listItems) {
          li.hidden = false
        }
        break;
      case "Active":
        for (var li of listItems) {
          li.hidden = li.firstElementChild.checked;
        }
        break;
      case "Complete":
        for (var li of listItems) {
          li.hidden = !li.firstElementChild.checked;
        }
        break;
    }
  }


  function toggleStatus(event) {
    var target = event.target;
    if (target.tagName === "INPUT") {
      var index = target.parentElement.getAttribute("item-index");
      var entry = JSON.parse(localStorage.getItem(index));
      entry.done = target.checked;
      localStorage.setItem(index, JSON.stringify(entry));
      updateFilter();
    }
  }

  function initEntries() {
    for (var i = 0, len = localStorage.length; i < len; i++) {
      var entry = JSON.parse(localStorage.getItem(i.toString()));
      addLi(entry);
    }
  }

  initEntries();

  addButton.onclick = addEntry;
  todoList.addEventListener('click', toggleStatus, false);
  filterDiv.addEventListener('click', toggleFilter, false);

};