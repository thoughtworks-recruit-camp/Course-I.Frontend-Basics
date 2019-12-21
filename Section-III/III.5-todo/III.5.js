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
  var filterDiv = document.getElementById("filters");

  var currentFilter = "ALL";


  function initEntries() {
    if (localStorage.length === 0) {  // create some initial entries
      var contents = [
        "Learn Basic HTML5 and CSS3",
        "Learn Basic JavaScript",
        "Write simple Web Apps"
      ];
      for (let index = 0; index < 3; index++) {
        entry = {
          "index": index,
          "content": contents[index],
          "done": false
        };
        localStorage.setItem(index.toString(), JSON.stringify(entry));
      }
    }

    for (var index = 0, len = localStorage.length; index < len; index++) {
      var entry = JSON.parse(localStorage.getItem(index.toString()));
      addLi(entry);
    }
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


  initEntries();
  addButton.onclick = addEntry;
  todoList.addEventListener('click', toggleStatus, false);
  filterDiv.addEventListener('click', toggleFilter, false);
};