/////////// slide show stuff --> ///////////
let slides = document.querySelector(".slides");
let allSlide = document.querySelectorAll(".slide");
let prevBtn = document.querySelector(".prev");
let nextBtn = document.querySelector(".next");

let count = 0;
nextBtn.addEventListener("click", (eo) => {
  if (count < allSlide.length - 1) {
    count++;
    updateSlider();
  } else if (count === allSlide.length - 1) {
    count = 0;
    updateSlider();
  }
});
//
prevBtn.addEventListener("click", (eo) => {
  if (count > 0) {
    count--;
    updateSlider();
  } else if (count === 0) {
    count = allSlide.length - 1;
    updateSlider();
  }
});
//
function updateSlider(eo) {
  slides.style.transform = `translateX(-${count * 100}%)`;
}
/////////// slide show stuff <-- ///////////