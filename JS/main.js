let inputText = document.querySelector(".testText");
let inputNum = document.querySelector(".testNum");
let orderBtn = document.querySelector(".orderBtn");
let doneBtn = document.querySelector(".doneBtn");
let addBtn = document.querySelector(".addBtn");
let userOrderBtn = document.querySelectorAll(".order");

// menu items
let ourMenu = JSON.parse(localStorage.getItem("menu")) || []; // static
let cart = JSON.parse(localStorage.getItem("cart")) || []; // dynamic
let activeOrder = JSON.parse(localStorage.getItem("order")) || [
  { items: [], totalPrice: 0 },
]; // dynamic
let menuOrdered = JSON.parse(localStorage.getItem("menuOrdered")) || []; // dynamic
let orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || []; // dynamic

// userOrderBtn[0].setAttribute("data-id", `${ourMenu[0].id}`); //// =>


let darkBtn = document.querySelector(".darkBtn")


darkBtn.addEventListener("click", ()=>{
  document.body.classList.toggle("dark")
})





////////// add items to ourMenu array //////////
function addItem(name, price) {
  let valueName = name;
  let valuePrice = price;
  if (!valueName || valuePrice <= 0 || valuePrice === NaN) {
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
  } else {
    console.log("we do not have it sorry, bawss");
    return;
  }

  const item = cart.find((i) => i.id === selectedItem.id);

  if (item) {
    item.qty += Number(inputNum.value);
  } else {
    cart.push({ id: selectedItem.id, qty: Number(inputNum.value) });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}
orderBtn.addEventListener("click", () => {
  addToCart();
});

////////// move items from cart array to activeOrder array & update menuOrdered array //////////
function addToOrderList() {
  let totalValue = 0;
  if (cart.length === 0) return;
  cart.forEach((item) => {
    // getting total price from cart and ourMenu //
    const calcPrice = ourMenu.find((i) => i.id === item.id);
    if (!calcPrice) return;

    let totalItemPrice = calcPrice.price * item.qty; // to calculate total item price //
    //-//
    // to calculate total order price //
    totalValue = totalItemPrice;
    //-//
    // updating menuOrdered to know what item is popular //
    const sentItem = menuOrdered.find((i) => i.id === item.id);

    if (sentItem) {
      sentItem.ordersDone += item.qty;
    } else {
      menuOrdered.push({ id: item.id, ordersDone: item.qty });
    }

    // moving items from cart to activeOrder and clear cart //
    // and show total item price //
    const orderItem = activeOrder[0].items.find((i) => i.id === item.id);
    if (orderItem) {
      orderItem.orders += item.qty;
      orderItem.totalItemPrice += totalItemPrice;
    } else {
      activeOrder[0].items.push({
        id: item.id,
        orders: item.qty,
        totalItemPrice: totalItemPrice,
      });
    }
    //// to show the total price of the order ////
    activeOrder[0].totalPrice += totalItemPrice;
    // const findPrice = activeOrder.find((i) => i.totalPrice);
    // if (findPrice) {
    //   findPrice.totalPrice += totalItemPrice;
    //   // to find where totalprice object and send it to last
    //   const index = activeOrder.findIndex((item) => item.totalPrice);
    //   if (index !== -1) {
    //     activeOrder.push(activeOrder.splice(index, 1)[0]);
    //   }
    // } else {
    //   activeOrder.push({ totalPrice: totalValue });
    // }
    //-//
    // TotalOrderHistory array to show total price History of the user //
    // orderHistory[0].totalPriceHistory += totalItemPrice;
  });
  orderHistory.push(activeOrder);
  //-//
  // save arrays in local storage and clear cart array //
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("menuOrdered", JSON.stringify(menuOrdered));
  localStorage.setItem("order", JSON.stringify(activeOrder));
  // after 10 second order array gets clear "simulates that order has been arrived to the customer"
  // setTimeout(() => {
  //   localStorage.removeItem("order");
  // }, 10000);
  localStorage.setItem("orderHistory", JSON.stringify(orderHistory));
}
//////
doneBtn.addEventListener("click", () => {
  addToOrderList();
});



