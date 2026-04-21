

// menu items

let ourMenu = JSON.parse(localStorage.getItem("menu")) || [];






localStorage.setItem("menu", JSON.stringify(ourMenu))

console.log(ourMenu)
