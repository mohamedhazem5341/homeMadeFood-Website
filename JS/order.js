function renderConfirmOrder() {
  let confirmOrderSection = document.querySelector(".confirmOrderSection");
  console.log(confirmOrderSection);
  confirmOrder.forEach((confirmItem) => {
    ourMenu.forEach((item) => {
      if (item.id === confirmItem.items[0]) {
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
    <div class="acBtn">
    </div>
    </article>
    `;
        confirmOrderSection.innerHTML += divTemp;
      }
    });
  });
}
renderConfirmOrder();
