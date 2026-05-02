/////////// menuBtn for small devices --> ///////////
let smallMenuBtn = document.querySelector(".smallMenuBtn");
let links = document.querySelector(".links");
let linksDiv = document.querySelector(".links-Div");

smallMenuBtn.addEventListener("click", () => {
  linksDiv.classList.toggle("active");
  smallMenuBtn.classList.toggle("active");
});
/////////// menuBtn for small devices <-- ///////////
