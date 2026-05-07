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
//////////////////////

let dishAmount = document.querySelector(".dishAmount");
dishAmount.innerHTML = `${ourMenu.length} ITEMS ACTIVE`;

let itemNameInput = document.getElementById("itemNameInput");
let itemCategoryInput = document.getElementById("itemCategoryInput");
let itemPriceInput = document.getElementById("itemPriceInput");
let itemDescribeInput = document.getElementById("itemDescribeInput");
let addItemBtn = document.getElementById("addItemBtn");

////////////////////// add items to ourMenu array //////////////////////
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
    console.log("Fill your inputs");

    addItemBtn.setAttribute("style", "background-color: rgb(167, 0, 0);");
    setTimeout(() => {
      addItemBtn.removeAttribute("style");
    }, 1500);

    return;
  } else {
    tempPush = {
      id: crypto.randomUUID(),
      name: valueName,
      description: valueDescribe,
      price: valuePrice,
      category: valueCategory,
    };
    ourMenu.push(tempPush);

    // let lol = document.querySelector(`#${tempPush.id}`);

    addItemBtn.setAttribute("style", "background-color: rgb(25, 167, 0);");
    setTimeout(() => {
      addItemBtn.removeAttribute("style");
    }, 1500);

    itemNameInput.value = "";
    itemDescribeInput.value = "";
    itemPriceInput.value = "";
    itemCategoryInput.value = "";
  }

  localStorage.setItem("menu", JSON.stringify(ourMenu));
}

addItemBtn.addEventListener("click", (eo) => {
  eo.preventDefault();

  addItem(
    itemNameInput.value,
    itemDescribeInput.value,
    Number(itemPriceInput.value),
    itemCategoryInput,
  );

  renderItems();

  if (tempPush.id) {
    document
      .getElementById(`${tempPush.id}`)
      .setAttribute(
        "style",
        "background-image: linear-gradient( to right , rgba(25, 167, 0, 0.6), rgba(25, 167, 0, 0.4), rgba(25, 167, 0, 0.2), rgba(25, 167, 0, 0.02));",
      );

    setTimeout(() => {
      document.getElementById(`${tempPush.id}`).removeAttribute("style");
      tempPush = {};
    }, 1500);
  }
});

////////////////////// Render items //////////////////////
let allItems = document.querySelector(".allItems");
let spanItem = document.querySelectorAll(".allItems section span");

function renderItems() {
  allItems.innerHTML = "";

  ourMenu.forEach((item, i) => {
    dishAmount.innerHTML = `${ourMenu.length} ITEMS ACTIVE`;
    let temp = `
<div id="${item.id}" data-type="${item.category}" class="item">
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
            <div class="deleteDiv">
            <button onclick="deleteItem()" data-itemid="${item.id}" class="delBtn"><img src="/images/trash bin.png" alt=""></button>
            </div>
          </div>
`;
    let sections = document.querySelectorAll(".allItems section");
    let spans = document.querySelectorAll(".allItems section span");

    for (let i = 0; i < sections.length; i++) {
      if (item.category === sections[i].dataset.type) {
        sections[i].innerHTML += temp;
        deleteBtn = document.querySelectorAll(".deleteDiv button"); /////
        return;
      }
    }

    let sectionItem = document.createElement("section");
    sectionItem.setAttribute("data-type", `${item.category}`);

    let spanItem = document.createElement("span");
    spanItem.textContent = item.category;
    sectionItem.appendChild(spanItem);
    sectionItem.innerHTML += temp;
    allItems.appendChild(sectionItem);

    deleteBtn = document.querySelectorAll(".deleteDiv button"); ////
  });
  deleteItem();
}
renderItems();

function deleteItem() {
  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", (eo) => {
      ourMenu.forEach((item) => {
        if (eo.target.dataset.itemid === item.id) {
          const index = ourMenu.indexOf(item);
          if (index > -1) {
            let div = document
              .getElementById(`${item.id}`)
              .setAttribute(
                "style",
                "background-image: linear-gradient( to right , rgba(167, 0, 0,0.6), rgba(167, 0, 0,0.4), rgba(167, 0, 0,0.2), rgba(167, 0, 0,0.02));",
              );
            setTimeout(() => {
              ourMenu.splice(index, 1);
              renderItems();

              dishAmount.innerHTML = `${ourMenu.length} ITEMS ACTIVE`;
              localStorage.setItem("menu", JSON.stringify(ourMenu));
            }, 2000);
          }
        }
      });
    });
  });
}
