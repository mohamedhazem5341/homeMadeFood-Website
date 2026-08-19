let menuListDiv = document.querySelector(".menuList");
let menuList = document.querySelectorAll(".menuList li");

let activeList = JSON.parse(localStorage.getItem("activeMenuList")) || "all";
localStorage.setItem("activeMenuList", JSON.stringify(activeList));

//function to save item category in localStorage
function setActiveList(eo) {
  activeList = eo;
  localStorage.setItem("activeMenuList", JSON.stringify(activeList));
}

// to render menu item
function itemMenuRender(category) {
  let allItemsMenu = document.querySelector(".allItemsMenu");
  allItemsMenu.innerHTML = "";
  ourMenu.forEach((item) => {
    let divTemp = `
    <article data-type="${item.category}" data-itemId="${item.id}">
    <div class="itemImg">
        <img src="/images/pancakes 2.webp" alt="" />
    </div>
    <div class="itemMenuInfo">
    <h1>${item.name}</h1>
    <h2>${item.price}$</h2>
    </div>
    <h3>${item.description}</h3>
    <div class="acBtn">
    <button data-type="orderNow" data-itemId="${item.id}">Order Now</button>
    <button data-type="addToCart" data-itemId="${item.id}">Add To Cart</button>
    </div>
    </article>
    `;

    // to choose what item category i want to render
    if (item.category === category) {
      allItemsMenu.innerHTML += divTemp;
    }
    // if the prameter is empty then it will render all items in the menu
    if (category === "all") {
      allItemsMenu.innerHTML += divTemp;
    }
    // to get  all item card and style them
    let itemMenuDiv = document.querySelectorAll(".allItemsMenu article");
    for (let i = 0; i < itemMenuDiv.length; i++) {
      itemMenuDiv[i].classList.add("itemMenuStyle");
    }
  });

  // to control how many word you want to show and replace over words to "..." so it doesn't ruin the style
  let text = document.querySelectorAll(".itemMenuStyle h3");
  text.forEach((item) => {
    if (item.textContent.length > 26) {
      item.textContent = item.textContent.slice(0, 27) + "...";
    }
  });
}

function renderListItemActive() {
  // to give saved list active style
  menuList.forEach((li) => {
    li.classList.remove("active");
    if (li.dataset.type === activeList) {
      li.classList.add("active");
    }
  });
  // to give active style to what user click and render the choosen category
  menuListDiv.addEventListener("click", (eo) => {
    //it prevent from giving the container of lists active class
    if (!eo.target.dataset.type) return;
    if (eo.target.className === "active") return;

    menuList.forEach((li) => {
      li.classList.remove("active");
      eo.target.classList.add("active");
      if (eo.target.dataset.type === "all") {
        itemMenuRender("all");
        setActiveList("all");
        return;
      } else if (eo.target.dataset.type === "starter") {
        itemMenuRender("starter");
        setActiveList("starter");
        return;
      } else if (eo.target.dataset.type === "main") {
        itemMenuRender("main");
        setActiveList("main");
        return;
      } else if (eo.target.dataset.type === "dessert") {
        itemMenuRender("dessert");
        setActiveList("dessert");
        return;
      }
    });
    unavailableItemStyle();
  });
}

itemMenuRender(activeList);
renderListItemActive();

//////////////////////// next task make menu item style for unAvailable ////////////////////////
// to give unavailable item another style
function unavailableItemStyle() {
  ourMenu.forEach((item) => {
    itemAvailablety.forEach((itemAvl) => {
      if (item.id === itemAvl.id && itemAvl.avl === "no") {
        let unAvailableTemp = `
        <div class="unAvailableNote">
        <h2>unAvailable</h2>
        </div>
        `;

        let itemMenuDiv = document.querySelector(`[data-itemId="${item.id}"]`);
        itemMenuDiv.classList.add("unavailableItemMenuStyle");
        itemMenuDiv.innerHTML += unAvailableTemp;
        let itemMenuBtns = document.querySelectorAll(
          `[data-itemId="${item.id}"] .acBtn button`,
        );
        for (let i = 0; i < itemMenuBtns.length; i++) {
          itemMenuBtns[i].setAttribute("disabled", "");
          itemMenuBtns[i].classList.add("disabledBtn");
        }
      }
    });
  });
}
unavailableItemStyle();
//////////////////////// next task add action for Order now & Add to cart btns ////////////////////////
//
let orderNowBtn = document.querySelectorAll(`.acBtn [data-type="orderNow"]`);
orderNowBtn.forEach((orderBtn) => {
  orderBtn.addEventListener("click", (eo) => {
    ourMenu.forEach((item) => {
      if (item.id === eo.target.dataset.itemid) {
        window.location.href = "/pages/order.html"
        confirmOrder.push({ items: [item.id], totalPrice: item.price });
        localStorage.setItem("confirmOrder", JSON.stringify(confirmOrder));
      }
    });
  });
});
//
//
let addToCartBtn = document.querySelectorAll(`.acBtn [data-type="addToCart"]`);
addToCartBtn.forEach((CartBtn) => {
  let cartBtn = document.querySelector(".links-Div .links .cartBtn");
  CartBtn.addEventListener("click", (eo) => {
    ourMenu.forEach((item) => {
      if (item.id === eo.target.dataset.itemid) {
        // to check if the item is already in the cart if yes increase the amount by 1
        const findCartItem = cart.find(
          (i) => i.id === eo.target.dataset.itemid,
        );
        if (findCartItem) {
          findCartItem.Amount++;
          cartBtn.classList.add("plus");
        } else {
          cart.push({ id: item.id, Amount: 1 });
          cartBtn.classList.add("plus");
        }
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    });
    // to remove plus style from the cart btn after the animation
    setTimeout(() => {
      cartBtn.classList.remove("plus");
    }, 800);
  });
});

// addToCartBtn.forEach((CartBtn) => {
//   CartBtn.addEventListener("click", (eo) => {
//     ourMenu.forEach((item) => {
//       if (item.id === eo.target.dataset.itemid) {
//         // to check if the item is already in the cart if yes increase the amount by 1
//         for (let i = 0; i < cart.length; i++) {
//           if (cart[i].id === item.id) {
//             cart[i].Amount++;
//             cartBtn.classList.add("plus");
//             localStorage.setItem("cart", JSON.stringify(cart));
//             return;
//           }
//         }
//         cart.push({ id: item.id, Amount: 1 });
//         cartBtn.classList.add("plus");
//         localStorage.setItem("cart", JSON.stringify(cart));
//       }
//     });
//     // to remove plus style from the cart btn after the animation
//     setTimeout(() => {
//       cartBtn.classList.remove("plus");
//     }, 800);
//   });
// });
