//
function renderCartItem() {
  let cartItemSection = document.createElement("section");
  cartItemSection.setAttribute("class", "allCartItems");

  let itemCount = 0;
  let priceCount = 0;

  ourMenu.forEach((item) => {
    cart.forEach((cartItem) => {
      if (item.id === cartItem.id) {
        let divTemp = `
    <article class="itemMenuStyle" data-type="${item.category}" data-itemId="${item.id}">
    <div class="itemImg">
        <img src="/images/pancakes 2.webp" alt="" />
    </div>
    <div class="itemMenuInfo">
    <h1>${item.name}</h1>
    <h2>${item.price}$</h2>
    </div>
    <h3>${item.description}</h3>
    <h3>Item Amount: ${cartItem.Amount}</h3>
    <h3>Total Price: ${item.price * cartItem.Amount}</h3>
    </article>
    `;
        cartItemSection.innerHTML += divTemp;
        document.body.appendChild(cartItemSection);
        // to check if there any item in cart is unAvl and style it and minus its price, item count from total
        itemAvailablety.forEach((itemAvl) => {
          if (itemAvl.id === cartItem.id && itemAvl.avl === "no") {
            let unAvailableTemp = `
        <div class="unAvailableNote">
        <h2>unAvailable</h2>
        </div>
        `;

            let itemCartDiv = document.querySelector(
              `.allCartItems [data-itemId="${cartItem.id}"]`,
            );
            itemCartDiv.classList.add("unavailableItemCartStyle");
            itemCartDiv.innerHTML += unAvailableTemp;
            // to save unAvl item's price and item count
            unAvlItemCount = cartItem.Amount;
            unAvlPrice = item.price * cartItem.Amount;
          }
        });
        // to add all item's price and item count for info
        itemCount += cartItem.Amount;
        priceCount += item.price * cartItem.Amount;
      }
    });
  });
  // to remove unAvl item's price and item count
  itemCount = itemCount - unAvlItemCount;
  priceCount = priceCount - unAvlPrice;

  let totalInfoDiv = document.createElement("section");
  totalInfoDiv.setAttribute("class", "totalInfoDiv");

  // to calc tax and shipment (and discount codes in future)
  taxCalc = (priceCount * tax).toFixed(2);
  shipmentCalc = (priceCount * shipment).toFixed(2);
  // temp to show user all information about item's price, item count, tax and shipment fee
  totalInfoTemp = `
    <div class="totalInfo">
    <h4>Items Amount : ${itemCount}</h4>
    <h4>Price Before Tax : ${priceCount}</h4>
    <h4>Tax ${Math.round(tax * 100)}% : ${taxCalc}</h4>
    <h4>shipment cost 5% : ${shipmentCalc}</h4>
    <hr>
    <h2>Total Price : ${(priceCount + Number(shipmentCalc) + Number(taxCalc)).toFixed(2)}$</h2>
    <button class="primaryBtn">Confirm</button>
    </div>
  `;
  totalInfoDiv.innerHTML = totalInfoTemp;

  document.body.appendChild(totalInfoDiv);
  // to control how many word you want to show and replace over words to "..." so it doesn't ruin the style
  let text = document.querySelectorAll(".itemMenuStyle h3");
  text.forEach((item) => {
    if (item.textContent.length > 26) {
      item.textContent = item.textContent.slice(0, 27) + "...";
    }
  });
}
renderCartItem();
