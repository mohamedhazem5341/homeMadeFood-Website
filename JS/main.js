let inputText = document.querySelector(".testText");
let inputNum = document.querySelector(".testNum");
let orderBtn = document.querySelector(".orderBtn");
let doneBtn = document.querySelector(".doneBtn");
let addBtn = document.querySelector(".addBtn");

// menu items
let ourMenu = JSON.parse(localStorage.getItem("menu")) || []; // static
let cart = JSON.parse(localStorage.getItem("cart")) || []; // dynamic
let activeOrder = JSON.parse(localStorage.getItem("order")) || []; // dynamic
// make new array for total price only tomorrow =>
let TotalPrice = JSON.parse(localStorage.getItem("totalPrice")) || []; // dynamic
let menuOrdered = JSON.parse(localStorage.getItem("menuOrdered")) || []; // dynamic

////////// add items to ourMenu array //////////
function addItem(name, price) {
  let valueName = name;
  let valuePrice = price;
  if (!valueName || !valuePrice) {
    console.log("enter a name you dumass");
    return;
  } else {
    ourMenu.push({
      id: crypto.randomUUID(),
      name: valueName,
      price: valuePrice,
    });
  }

  localStorage.setItem("menu", JSON.stringify(ourMenu));
}
addBtn.addEventListener("click", () => {
  addItem(inputText.value, Number(inputNum.value));
});

////////// add items order to cart array //////////
function addToCart() {
  const selectedItem = ourMenu.find((i) => i.name === inputText.value); // i want to change it to search by id not name
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
  let totalP = 0;
  cart.forEach((item) => {
    // getting total price from cart and ourmenu //
    const calcPrice = ourMenu.find((i) => i.id === item.id);
    if (!calcPrice) return;

    let totalItemPrice = calcPrice.price * item.qty;

    if (totalP) {
      totalP += totalItemPrice;
    } else {
      totalP = totalItemPrice;
    }

    console.log(totalItemPrice, "this is total item price");
    console.log(totalP, "this is total price");

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
      orderItem.totalItemPrice += totalItemPrice;
    } else {
      activeOrder.push({
        id: item.id,
        orders: item.qty,
        totalItemPrice: totalItemPrice,
      });
    }

    const findPrice = activeOrder.find((i) => i.TotalPrice);

    if (findPrice) {
      findPrice.TotalPrice += totalP;
    } else {
      activeOrder.push({ TotalPrice: totalP });
    }

    console.log(totalP, "total all");
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
