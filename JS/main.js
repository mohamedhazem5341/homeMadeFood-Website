// menu items

let ourMenu = JSON.parse(localStorage.getItem("menu")) || [];
let menuOrdered = JSON.parse(localStorage.getItem("menuOrdered")) || [];
let activeOrder = JSON.parse(localStorage.getItem("order")) || [];

let inputText = document.querySelector(".testText");
let inputNum = document.querySelector(".testNum");
let orderBtn = document.querySelector(".orderBtn");
let doneBtn = document.querySelector(".doneBtn");
let addBtn = document.querySelector(".addBtn");

function addItem(name, price) {
  let valueName = name;
  let valuePrice = price;
  ourMenu.push({
    id: ourMenu.length + 1,
    name: valueName,
    price: valuePrice,
  });
  localStorage.setItem("menu", JSON.stringify(ourMenu));
}

function newOrder(quantity) {
  for (let i = 0; i < ourMenu.length; i++) {
    if (inputText.value === ourMenu[i].name) {
      activeOrder.push({ id: ourMenu[i].id, quantities: quantity });
    }
  }
  localStorage.setItem("order", JSON.stringify(activeOrder));
}
// menuOrdered.push({ id: 1, orders: 1 });
// localStorage.setItem("menuOrdered", JSON.stringify(menuOrdered));

function orderDone(one, two) {
  if (menuOrdered[0] === undefined) {
    menuOrdered.push({id: activeOrder[i].id, orders: activeOrder[i].quantities});
  }

  activeOrder.forEach((item) => {
    console.log("1");
  });

  // if (activeOrder[i].id === menuOrdered[i].id) {
  //   menuOrdered[i].orders += activeOrder[i].quantities;
  // } else if (menuOrdered === "" || activeOrder[i].id) {

  // }

  localStorage.setItem("menuOrdered", JSON.stringify(menuOrdered));
  localStorage.removeItem("order");
}

addBtn.addEventListener("click", () => {
  addItem(inputText.value, parseInt(inputNum.value));
});
////////
orderBtn.addEventListener("click", () => {
  newOrder(parseInt(inputNum.value));
});
////////
doneBtn.addEventListener("click", () => {
  orderDone();
});
