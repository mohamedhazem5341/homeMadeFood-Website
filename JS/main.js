let inputText = document.querySelector(".testText");
let inputNum = document.querySelector(".testNum");
let orderBtn = document.querySelector(".orderBtn");
let doneBtn = document.querySelector(".doneBtn");
let addBtn = document.querySelector(".addBtn");

// menu items
let ourMenu = JSON.parse(localStorage.getItem("menu")) || []; // static
let cart = JSON.parse(localStorage.getItem("cart")) || []; // dynamic
let activeOrder = JSON.parse(localStorage.getItem("order")) || []; // dynamic
let menuOrdered = JSON.parse(localStorage.getItem("menuOrdered")) || []; // dynamic

////////// add items to ourMenu array //////////
function addItem(name, price) {
  let valueName = name;
  let valuePrice = price;
  ourMenu.push({
    id: crypto.randomUUID(),
    name: valueName,
    price: valuePrice,
  });
  localStorage.setItem("menu", JSON.stringify(ourMenu));
}
addBtn.addEventListener("click", () => {
  addItem(inputText.value, parseInt(inputNum.value));
});

////////// add items order to cart array //////////
function addToCart() {
  const selectedItem = ourMenu.find((i) => i.name === inputText.value);
  if (selectedItem) {
    console.log("we have it");
    console.log(selectedItem);
  } else {
    console.log("we do not have it sorry bawss");
    return;
  }

  const item = cart.find((i) => i.id === selectedItem.id);

  if (item) {
    item.qty += parseInt(inputNum.value);
  } else {
    cart.push({ id: selectedItem.id, qty: parseInt(inputNum.value) });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}
orderBtn.addEventListener("click", () => {
  addToCart();
});

////////// move items from cart array to activeOrder array & update menuOrdered array //////////
function addToOrderList() {
  cart.forEach((item) => {
    // getting total price from cart and ourmenu //
    const calcPrice = ourMenu.find((i) => i.id === item.id);
    if (!calcPrice) return;
    console.log(calcPrice, item.qty, "hi");
    let totalItemPrice = +calcPrice.price * item.qty;
    // console.log(totalP, "this is your total price please pay in cash");

    // updating menuOrdered to know what item is popular //
    const sentItem = menuOrdered.find((i) => i.id === item.id);

    if (sentItem) {
      sentItem.ordersDone += item.qty;
    } else {
      menuOrdered.push({ id: item.id, ordersDone: item.qty });
    }

    // moving items from cart to activeOrder and clear cart //
    const orderItem = activeOrder.find((i) => i.id === item.id);

    if (orderItem) {
      orderItem.orders += item.qty;
      orderItem.totalPrice += totalItemPrice;
    } else {
      activeOrder.push({
        id: item.id,
        orders: item.qty,
        totalPrice: totalItemPrice,
      });
    }
  });
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("menuOrdered", JSON.stringify(menuOrdered));
  localStorage.setItem("order", JSON.stringify(activeOrder));
}

//////
doneBtn.addEventListener("click", () => {
  addToOrderList();
});
