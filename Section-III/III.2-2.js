var carProducts = [
  {
    "id": 1,
    "name": "英雄牌 钢笔",
    "count": 1,
    "price": 69,
    "checked": false
  },
  {
    "id": 2,
    "name": "晨光牌 铅字笔",
    "count": 2,
    "price": 5.5,
    "checked": true
  },
  {
    "id": 3,
    "name": "晨光牌 铅笔",
    "count": 1,
    "price": 2,
    "checked": false
  },
  {
    "id": 4,
    "name": "狗熊牌 橡皮擦",
    "count": 1,
    "price": 1,
    "checked": false
  },
  {
    "id": 5,
    "name": "瑞士牌 双肩书包",
    "count": 1,
    "price": 199,
    "checked": true
  },
  {
    "id": 6,
    "name": "晨光牌 作业本",
    "count": 5,
    "price": 2.5,
    "checked": false
  }
];
"use strict";

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


function init() {
  var cartContents = document.getElementById('cart-contents');

  function updateRowTotal() {
    var price = this.getElementsByClassName("item-price")[0].innerHTML;
    var quantity = this.getElementsByClassName("item-quantity")[0].innerHTML;
    var total = parseFloat(price) * parseInt(quantity);
    this.getElementsByClassName("item-total")[0].innerHTML = total.toString();
  }

  var getSummary = function () {
    var itemRows = this.getElementsByClassName("item-row");
    var sumQuantity = 0;
    var sumTotal = 0.;
    for (var i = 0, len = itemRows.length; i < len; i++) {
      var currentItem = itemRows[i];
      if (currentItem.getElementsByClassName("select-box")[0].checked === true) {
        sumQuantity += parseInt(currentItem.getElementsByClassName("item-quantity")[0].innerText);
        sumTotal += parseFloat(currentItem.getElementsByClassName("item-total")[0].innerText)
      }
    }
    document.getElementById("summary-text").innerHTML = "共计" + sumQuantity.toString() + "件商品，￥" + sumTotal.toString();
  }
      .bind(cartContents);

  function updateCart(event) {
    var target = event.target;

    function updateSelectionAll() {
      var selectBoxes = document.getElementsByClassName("select-box");
      var boxesCount = selectBoxes.length;
      var checks = 0;
      for (var i = 0; i < boxesCount; i++) {
        checks += selectBoxes[i].checked;
      }
      var selectAllButton = document.getElementById("select-all-button");
      selectAllButton.checked = checks === boxesCount;
    }

    function updateQuantity(offset) {
      var quantityElement =
          offset === 1 ? target.previousElementSibling : target.nextElementSibling;  // m-button[->]quantity[<-]p-button
      var currentQuantity = parseInt(quantityElement.innerHTML);
      currentQuantity += offset;
      var currentRow = target.parentNode.parentNode;  // input -> td -> tr
      quantityElement.innerHTML = currentQuantity.toString();
      updateRowTotal.call(currentRow);
      if (currentQuantity === 0) {
        currentRow.parentNode.removeChild(currentRow);
      }
    }

    switch (target.className) {
      case "select-box": {
        updateSelectionAll();
        break;
      }
      case "m-button": {
        updateQuantity(-1);
        break;
      }
      case "p-button": {
        updateQuantity(1);
        break;
      }
      default: {
        return
      }
    }
    getSummary();
  }

  function toggleAll(event) {
    var target = event.target;
    if (target.id === "select-all-button") {
      var selectBoxes = cartContents.getElementsByClassName("select-box");
      for (var selectBox of selectBoxes) {
        selectBox.checked = target.checked;
      }
      getSummary();
    }
  }

  function CartRow(productData) {
    this.data = productData;

    this.toCheckboxCell = (isChecked) => {
      var cell = document.createElement("td");
      var checkBox = document.createElement("input");
      setAttributes.call(checkBox, ["type", "class", "checked"], ["checkbox", "select-box", isChecked]);
      cell.appendChild(checkBox);
      return cell;
    };
    this.toTextCell = (text, className) => {
      var cell = document.createElement("td");
      var span = document.createElement("span");
      span.setAttribute("class", className);
      span.innerHTML = text;
      cell.appendChild(span);
      return cell;
    };
    this.toQuantityCell = (quantity) => {
      var cell = document.createElement("td");
      var minusButton = document.createElement("input");
      setAttributes.call(minusButton, ["type", "class", "value"], ["button", "m-button", "-"]);
      var quantityText = document.createElement("span");
      quantityText.setAttribute("class", "item-quantity");
      quantityText.innerText = quantity;
      var plusButton = document.createElement("input");
      setAttributes.call(plusButton, ["type", "class", "value"], ["button", "p-button", "+"]);
      appendChildren.call(cell, [minusButton, quantityText, plusButton]);
      return cell;
    };
    var itemRow = document.createElement("tr");
    itemRow.setAttribute("class", "item-row");
    var checkBoxCell = this.toCheckboxCell(this.data.checked);  // 选择
    var nameCell = this.toTextCell(this.data.name, "item-name");  // 商品名称
    var priceCell = this.toTextCell(this.data.price, "item-price");  // 商品单价(￥)
    var quantityCell = this.toQuantityCell(this.data.count);  // 商品数量
    var totalCell = this.toTextCell("", "item-total");  // 总价(￥)
    appendChildren.call(itemRow, [checkBoxCell, nameCell, priceCell, quantityCell, totalCell]);
    updateRowTotal.call(itemRow);
    return itemRow;
  }


  for (var productData of carProducts) {
    var cartRow = new CartRow(productData);
    cartContents.appendChild(cartRow);
  }
  getSummary.call(cartContents);
  cartContents.addEventListener('click', updateCart, false);
  var selectAllButton = document.getElementById("select-all-button");
  selectAllButton.onclick = toggleAll;
}

window.onload = init;