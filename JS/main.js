let boardList = document.querySelector(".boardList");
let Lists = document.querySelectorAll(".boardList li");
let itemDash = document.querySelectorAll(".itemDash");

// to get list&section data-type for active style
let activeDoor = JSON.parse(localStorage.getItem("door")) || "addItem";
let saveActivation = document.querySelectorAll(
  `[data-section="${activeDoor}"]`,
);

saveActivation.forEach((i) => {
  i.classList.add("active");
});

boardList.addEventListener("click", (eo) => {
  if (eo.target.id === "listUl") return;
  // to show clicked list active style
  Lists.forEach((item) => {
    item.classList.remove("active");
    eo.target.classList.add("active");

    // to save clicked list&section data-type for active style memory
    localStorage.setItem("door", JSON.stringify(eo.target.dataset.section));
  });

  // to show clicked section active style
  itemDash.forEach((item) => {
    item.classList.remove("active");
    if (eo.target.dataset.section === item.dataset.section) {
      item.classList.add("active");
    }
  });
});
///////////////////////////

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

let itemNameInput = document.getElementById("itemNameInput");
let itemCategoryInput = document.getElementById("itemCategoryInput");
let itemPriceInput = document.getElementById("itemPriceInput");
let itemDescribeInput = document.getElementById("itemDescribeInput");
let addItemBtn = document.getElementById("addItemBtn");
let dishAmount = document.querySelector(".dishAmount");

let allItems = document.querySelector(".allItems");
let spanItem = document.querySelectorAll(".allItems section span");
// let sectionItem = document.querySelectorAll(".allItems section");
// console.log(sectionItem);

// for (let i = 0; i < ourMenu.length; i++) {
//   let sectionItem = document.querySelectorAll(`.allItems [data-article="${ourMenu[i].category}"]`);
// }
function renderItems() {
  allItems.innerHTML = "";
  let sectionItem = document.querySelectorAll(".allItems section");
  ourMenu.forEach((item) => {
    console.log(sectionItem);
    for (let i = 0; i < ourMenu.length; i++) {
      if ((sectionItem = "")) {
        console.log("idk");
      } else if (item.category === sectionItem[i].dataset.article) {
        console.log("its here");
      } else {
        console.log("its not here");
      }
    }
  });
}
renderItems();

//   let temp = `
// <div class="item">
//             <div class="itemImg">
//               <img src="/images/pancakes 2.webp" alt="" />
//             </div>
//             <div class="itemInfo">
//               <h2>${item.name}</h2>
//               <p>${item.description}</p>
//             </div>
//             <div class="itemPrice">
//               <h2>${item.price}$</h2>
//             </div>
//           </div>
// `;
//   let newTemp = `
//   <section data-article="${item.category}">
//     <span data-section="${item.category}">${item.category.toUpperCase()}</span>
//           <div class="item">
//             <div class="itemImg">
//               <img src="/images/pancakes 2.webp" alt="" />
//             </div>
//             <div class="itemInfo">
//               <h2>${item.name}</h2>
//               <p>${item.description}</p>
//             </div>
//             <div class="itemPrice">
//               <h2>${item.price}$</h2>
//             </div>
//           </div>
//   </section>
// `;
// userOrderBtn[0].setAttribute("data-id", `${ourMenu[0].id}`); //// =>

dishAmount.innerHTML = `${ourMenu.length} ITEMS ACTIVE`;

////////// add items to ourMenu array //////////
function addItem(name, describe, price, category) {
  let valueName = name;
  let valueDescribe = describe;
  let valuePrice = price;
  let valueCategory = category.toLowerCase();
  if (!valueName || valuePrice <= 0 || valuePrice === NaN) {
    console.log("enter a name you dumass");
    return;
  } else {
    ourMenu.push({
      id: crypto.randomUUID(),
      name: valueName,
      description: valueDescribe,
      price: valuePrice,
      category: valueCategory,
    });
  }

  localStorage.setItem("menu", JSON.stringify(ourMenu));
}
addItemBtn.addEventListener("click", (eo) => {
  eo.preventDefault;
  addItem(
    itemNameInput.value,
    itemDescribeInput.value,
    Number(itemPriceInput.value),
    itemCategoryInput.value,
  );
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
