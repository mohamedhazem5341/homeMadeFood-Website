let boardList = document.querySelector(".boardList");
let Lists = document.querySelectorAll(".boardList li");
let itemDash = document.querySelectorAll(".itemDash");

// to get list&section data-type for active style
let activeList = JSON.parse(localStorage.getItem("activeList")) || "addItem";
let saveActivation = document.querySelectorAll(
  `[data-section="${activeList}"]`,
);
//
saveActivation.forEach((i) => {
  i.classList.add("active");
});
//
boardList.addEventListener("click", (eo) => {
  if (eo.target.id === "listUl") return;
  // to show clicked list active style
  Lists.forEach((item) => {
    item.classList.remove("active");
    eo.target.classList.add("active");

    // to save clicked list&section data-type for active style memory
    localStorage.setItem(
      "activeList",
      JSON.stringify(eo.target.dataset.section),
    );
  });

  // to show clicked section active style
  itemDash.forEach((item) => {
    item.classList.remove("active");
    if (eo.target.dataset.section === item.dataset.section) {
      item.classList.add("active");
    }
  });
});
//////////////////////
let dishAmount = document.querySelector(".dishAmount");
dishAmount.innerHTML = `${ourMenu.length} ITEMS ACTIVE`;
//
let itemNameInput = document.getElementById("itemNameInput");
let itemDescribeInput = document.getElementById("itemDescribeInput");
let itemPriceInput = document.getElementById("itemPriceInput");
let itemCategoryInput = document.getElementById("itemCategoryInput");
let addItemBtn = document.getElementById("addItemBtn");

////////////////////// Add item to ourMenu array //////////////////////
let tempPush = {};
function addItem(name, describe, price, category) {
  let valueName = name;
  let valueDescribe = describe;
  let valuePrice = price;
  let valueCategory = category.value.toLowerCase();

  if (
    !valueName ||
    valuePrice <= 0 ||
    valuePrice === NaN ||
    !valueDescribe ||
    valueCategory === ""
  ) {
    // if there is input is invalid or empty
    console.log("Fill your inputs");

    addItemBtn.setAttribute("style", "background-color: rgb(167, 0, 0); ");
    addItemBtn.textContent = "Failed | Fill the inputs";

    setTimeout(() => {
      addItemBtn.removeAttribute("style");
      addBtnContent();
    }, 1500);

    return;
  } else {
    // if all inputs valid
    tempPush = {
      id: crypto.randomUUID(),
      name: valueName,
      description: valueDescribe,
      price: valuePrice,
      category: valueCategory,
    };
    ourMenu.push(tempPush);

    addItemBtn.setAttribute("style", `background-color: rgb(25, 167, 0);`);
    addItemBtn.textContent = "Successful";

    setTimeout(() => {
      addItemBtn.removeAttribute("style");
      addBtnContent();
    }, 1500);

    itemNameInput.value = "";
    itemDescribeInput.value = "";
    itemPriceInput.value = "";
    itemCategoryInput.value = "";
  }

  localStorage.setItem("menu", JSON.stringify(ourMenu));
}
function addBtnContent() {
  addItemBtn.textContent = "ADD TO REPERTOIRE";
}
addBtnContent();
addItemBtn.addEventListener("click", (eo) => {
  eo.preventDefault();

  addItem(
    itemNameInput.value,
    itemDescribeInput.value,
    Number(itemPriceInput.value),
    itemCategoryInput,
  );
  renderAddItems();
  itemOrderedRender();
  // to give added item green background animation for 1.2s
  if (tempPush.id) {
    document.getElementById(`${tempPush.id}`).classList.add("added");

    setTimeout(() => {
      document.getElementById(`${tempPush.id}`).classList.remove("added");
      tempPush = {};
    }, 1200);
  }
});

////////////////////// Render items //////////////////////
let allItems = document.querySelector(".allItems");
let spanItem = document.querySelectorAll(".allItems section span");
let deleteBtn = document.querySelectorAll(".deleteDiv button");

function renderAddItems() {
  allItems.innerHTML = "";
  // to render all item in menu
  ourMenu.forEach((item) => {
    dishAmount.innerHTML = `${ourMenu.length} ITEMS ACTIVE`;
    tempItemDiv = `
<div id="${item.id}" data-type="${item.category}" data-id="${item.id}" class="item">
            <div class="itemImg">
              <img src="/images/pancakes 2.webp" alt="" />
            </div>
            <div class="itemInfo">
              <h2>${item.name}</h2>
              <p>${item.description}</p>
            </div>
            <div class="itemPrice">
              <h2>${item.price}$</h2>
            </div>
            <div class="editDiv">
            <button onclick="editItem()" data-itemid="${item.id}">Edit</button>
            </div>
            
            <div class="deleteDiv">
            <button onclick="deleteItem()" data-itemid="${item.id}"><img src="/images/trash bin.webp" alt=""></button>
            </div>
            <div class="OrderDiv">
            <button onclick="orderItem()" data-itemid="${item.id}">Order</button>
            </div>
            
          </div>
`;
    let sections = document.querySelectorAll(".allItems section");
    let spans = document.querySelectorAll(".allItems section span");

    for (let i = 0; i < sections.length; i++) {
      // loop see if there section for item to put it in
      if (item.category === sections[i].dataset.type) {
        sections[i].innerHTML += tempItemDiv;
        deleteBtn = document.querySelectorAll(".deleteDiv button"); /////
        // to check if the item id in available array or not, this codes prevent for adding item id more than one time
        for (let j = 0; j < itemAvailablety.length; j++) {
          if (item.id === itemAvailablety[j].id) return;
        }
        itemAvailablety.push({ id: item.id, avl: "yes" });
        localStorage.setItem("available", JSON.stringify(itemAvailablety));
        return;
      }
    }

    // create section for item if there is no section for the item
    let sectionItem = document.createElement("section");
    sectionItem.setAttribute("data-type", `${item.category}`);

    let spanItem = document.createElement("span");
    spanItem.textContent = item.category;
    sectionItem.appendChild(spanItem);
    sectionItem.innerHTML += tempItemDiv;

    allItems.appendChild(sectionItem);

    // to check if the item id in available array or not, this codes prevent for adding item id more than one time
    for (let i = 0; i < itemAvailablety.length; i++) {
      if (item.id === itemAvailablety[i].id) return;
    }
    itemAvailablety.push({ id: item.id, avl: "yes" });
    localStorage.setItem("available", JSON.stringify(itemAvailablety));
  });

  itemAvailablety.forEach((itemAvl) => {
    if (itemAvl.avl === "no") {
      let itemIsHere = document.getElementById(itemAvl.id);
      let itemIsHereImg = document.querySelector(
        `[data-id="${itemAvl.id}"] .itemImg img`,
      );
      itemIsHere.classList.add("unAvailableEditItem");
      unAvailableTemp = `
      <div class="unAvailableNote">
      <h2>unAvailable</h2>
      </div>
      `;
      itemIsHere.innerHTML += unAvailableTemp;
    }
  });
  deleteItem();
  editItem();
  orderItem();
}
renderAddItems();
/////////////////////

// function renderEditItems() {
//   ourMenu.forEach((item) => {
//     let sectionItem = document.createElement("section");
//     sectionItem.innerHTML += tempItemDiv;
//     editItemArticle.appendChild(sectionItem);
//     deleteBtn = document.querySelectorAll(".deleteDiv button"); ////
//     editBtn = document.querySelectorAll(".editDiv button"); ////
//   });
//   deleteItem();
//   editItem();
// }
// renderEditItems();

////////////////////// Delete item //////////////////////

function deleteItem() {
  deleteBtn = document.querySelectorAll(".deleteDiv button"); ////
  if (!deleteBtn) return;
  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", (eo) => {
      ourMenu.forEach((item) => {
        if (eo.target.dataset.itemid === item.id) {
          // to get item index from ourMenu array to delete the item
          const index = ourMenu.indexOf(item);
          if (index > -1) {
            let itemId = document.querySelectorAll(`[data-id= "${item.id}"]`);
            console.log(itemId);
            itemId.forEach((item) => {
              item.classList.add("removed");
            });

            setTimeout(() => {
              ourMenu.splice(index, 1);
              renderAddItems();
              itemOrderedRender();
              dishAmount.innerHTML = `${ourMenu.length} ITEMS ACTIVE`;
              localStorage.setItem("menu", JSON.stringify(ourMenu));
            }, 1200);
          }
        }

        // to get item index from itemAvailablety array to delete the item
        itemAvailablety.forEach((item) => {
          if (eo.target.dataset.itemid === item.id) {
            const index2 = itemAvailablety.indexOf(item);
            itemAvailablety.splice(index2, 1);
            localStorage.setItem("available", JSON.stringify(itemAvailablety));
          }
        });
      });
    });
  });
}
////////////////////// Edit item //////////////////////
let popup = document.querySelector(".popup");
let closeBtn = document.querySelector(".closeBtn");

function editItem() {
  editBtn = document.querySelectorAll(".editDiv button"); ////
  if (!editBtn) return;
  editBtn.forEach((btn) => {
    btn.addEventListener("click", (eo) => {
      ourMenu.forEach((item) => {
        if (eo.target.dataset.itemid === item.id) {
          //
          popup.classList.add("show");
          // //
          itemInfoNameInput = document.getElementById("itemInfoNameInput");
          itemInfoDescriptionInput = document.getElementById(
            "itemInfoDescriptionInput",
          );
          itemInfoPriceInput = document.getElementById("itemInfoPriceInput");
          itemCategoryEditInput = document.getElementById(
            "itemCategoryEditInput",
          );
          itemAvailableEditInput = document.getElementById(
            "itemAvailableEditInput",
          );
          // here see if item avl in the itemAvailablety array if yes select available and opposite
          itemAvailablety.forEach((itemAvl) => {
            if (item.id === itemAvl.id) {
              if (itemAvl.avl === "yes") {
                itemAvailableEditInput.innerHTML = `
                <option value="Available" selected>Available</option>
                <option value="Unavailable">Unavailable</option>
                `;
              } else {
                itemAvailableEditInput.innerHTML = `
                <option value="Available">Available</option>
                <option value="Unavailable" selected>Unavailable</option>
                `;
              }
            }
          });
          //
          itemInfoNameInput.value = item.name;
          itemInfoDescriptionInput.value = item.description;
          itemInfoPriceInput.value = item.price;
          //
          // here select option that the item in already
          itemCategoryValue = item.category;
          if (itemCategoryValue === "starter") {
            itemCategoryEditInput.innerHTML = `
                <option value="Starter" selected>Starter</option>
                <option value="Main">Main</option>
                <option value="Dessert">Dessert</option>`;
          } else if (itemCategoryValue === "main") {
            itemCategoryEditInput.innerHTML = `
                <option value="Starter">Starter</option>
                <option value="Main" selected>Main</option>
                <option value="Dessert">Dessert</option>`;
          } else if (itemCategoryValue === "dessert") {
            itemCategoryEditInput.innerHTML = `
                <option value="Starter">Starter</option>
                <option value="Main">Main</option>
                <option value="Dessert" selected>Dessert</option>`;
          }
          //
          cancelBtn = document.querySelector(".cancelBtn");
          confirmBtn = document.querySelector(".confirmBtn");
          // it gives confirm btn data-id same as item id that you editing
          confirmBtn.dataset.itemid = item.id;
        }
      });
    });
  });
}
// to close popup Edit //
closeBtn.addEventListener("click", (eo) => {
  popup.classList.remove("show");
  renderAddItems();
});
// to cancel editing the item and close popup Edit //
function cancelEdit() {
  if (!cancelBtn) return;
  popup.classList.remove("show");
}
// to confirm edited item from popup Edit //
function confirmEdit() {
  if (!confirmBtn) return;
  ourMenu.forEach((item, i) => {
    if (confirmBtn.dataset.itemid === item.id) {
      let ItemNewNameValue = itemInfoNameInput.value;
      let ItemNewDescValue = itemInfoDescriptionInput.value;
      let ItemNewPriceValue = itemInfoPriceInput.value;
      let ItemNewCategoryValue = itemCategoryEditInput.value.toLowerCase();
      let itemNewAvailabletyEditInput =
        itemAvailableEditInput.value.toLowerCase();

      ourMenu[i].name = ItemNewNameValue;
      ourMenu[i].description = ItemNewDescValue;
      ourMenu[i].price = ItemNewPriceValue;
      ourMenu[i].category = ItemNewCategoryValue;
      // here see new selected value (availablety) and change it in the itemAvailablety array and saves it in localstorage
      for (let j = 0; j < itemAvailablety.length; j++) {
        if (item.id === itemAvailablety[j].id) {
          if (itemNewAvailabletyEditInput === "available") {
            itemAvailablety[j].avl = "yes";
            localStorage.setItem("available", JSON.stringify(itemAvailablety));
          } else if (itemNewAvailabletyEditInput === "unavailable") {
            itemAvailablety[j].avl = "no";
            localStorage.setItem("available", JSON.stringify(itemAvailablety));
          }
        }
      }
      //here saves item changes in the ourMenu array
      localStorage.setItem("menu", JSON.stringify(ourMenu));
      deleteBtn = document.querySelectorAll(".deleteDiv button"); ////
      editBtn = document.querySelectorAll(".editDiv button"); ////

      popup.classList.remove("show");
      renderAddItems();
      itemOrderedRender();
    }
  });
}

function orderItem() {
  OrderBtn = document.querySelectorAll(".OrderDiv button");
  if (!OrderBtn) return;
  OrderBtn.forEach((btn) => {
    btn.addEventListener("click", (eo) => {
      console.log(eo.target.dataset.itemid);
      for (let i = 0; i < menuOrdered.length; i++) {
        if (eo.target.dataset.itemid === menuOrdered[i].id) {
          menuOrdered[i].orderAmount++;
          localStorage.setItem("menuOrdered", JSON.stringify(menuOrdered));
          renderAddItems();
          itemOrderedRender();
          return;
        }
      }
      menuOrdered.push({ id: eo.target.dataset.itemid, orderAmount: 1 });
      localStorage.setItem("menuOrdered", JSON.stringify(menuOrdered));
      renderAddItems();
      itemOrderedRender();
    });
  });
}
//////////////////

let itemOrdered = document.querySelector(".itemOrdered");

function itemOrderedRender() {
  itemOrdered.innerHTML = "";

  ourMenu.forEach((item) => {
    itemAvailablety.forEach((itemAvl) => {
      if (item.id === itemAvl.id) {
        let itemOrderedTemp = `
        <div class="itemOrderedStyle" data-itemOrderedId="${item.id}">
        <div class="itemImg">
          <img src="/images/pancakes 2.webp" alt="" />
        </div>
        <div class="itemOrderedInfo">
        <h1>${item.name}</h1>
        <h2>${item.price}$</h2>
        </div>
        <h3>${item.description}</h3>
        <h4>Ordered Amount: 0</h4>
        </div>
        `;

        let itemSections = document.querySelectorAll(
          `[data-section="itemOrdered"] section`,
        );

        for (let i = 0; i < itemSections.length; i++) {
          // add item to its category that already there
          if (item.category === itemSections[i].dataset.category) {
            itemSections[i].innerHTML += itemOrderedTemp;
            itemDiv = document.querySelector(
              `[data-itemOrderedId="${itemAvl.id}"]`,
            );
            return;
          }
        }
        //create new section for new category ///
        let itemOrderedSection = document.createElement("section");
        itemOrderedSection.setAttribute("data-category", `${item.category}`);
        itemOrderedSection.classList.add("itemOrderedSection");
        let itemCategorySpan = document.createElement("span");
        itemCategorySpan.textContent = item.category;
        itemOrderedSection.appendChild(itemCategorySpan);
        itemOrderedSection.innerHTML += itemOrderedTemp;
        itemOrdered.appendChild(itemOrderedSection);
        ///
      }
      //
    });
  });
  orderAmountCheck();
  availabletyCheck();
}
itemOrderedRender();
//
function orderAmountCheck() {
  ourMenu.forEach((item) => {
    let orderAmount = document.querySelector(
      `[data-itemOrderedId="${item.id}"] h4`,
    );
    menuOrdered.forEach((itemOrder) => {
      if (item.id === itemOrder.id) {
        orderAmount.textContent = `Ordered Amount: ${itemOrder.orderAmount}`;
      }
    });
  });
}
//
function availabletyCheck() {
  ourMenu.forEach((item) => {
    itemAvailablety.forEach((itemAvl) => {
      if (item.id === itemAvl.id && itemAvl.avl === "no") {
        let itemDiv = document.querySelector(
          `[data-itemOrderedId="${itemAvl.id}"]`,
        );
        itemDiv.classList.add("unAvailableItem");
        itemDiv.innerHTML += unAvailableTemp;
      }
    });
  });
}
