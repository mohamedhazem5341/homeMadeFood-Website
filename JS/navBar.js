/////////// menuBtn for small devices --> ///////////
let smallMenuBtn = document.querySelector(".smallMenuBtn");
let links = document.querySelector(".links");
let linksDiv = document.querySelector(".links-Div");

smallMenuBtn.addEventListener("click", () => {
  linksDiv.classList.toggle("active");
  smallMenuBtn.classList.toggle("active");
});
/////////// menuBtn for small devices <-- ///////////

/////////// Dark Mode --> ///////////
let darkBtn = document.querySelector(".darkBtn");

darkBtn.addEventListener("click", () => {
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "light");
    document.body.className = localStorage.getItem("theme");
  } else if (document.body.classList.contains("light")) {
    localStorage.setItem("theme", "dark");
    document.body.className = localStorage.getItem("theme");
  }
});
document.body.className = localStorage.getItem("theme") || "light";
/////////// Dark Mode <-- ///////////
