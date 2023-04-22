var currentImage = 0;
var images = document.querySelectorAll("#slider-container img");
var prevButton = document.querySelector("#prev-button");
var nextButton = document.querySelector("#next-button");

function showImage(index) {
  images[currentImage].classList.remove("active");
  images[index].classList.add("active");
  currentImage = index;
}

prevButton.addEventListener("click", function() {
  var index = currentImage - 1;
  if (index < 0) {
    index = images.length - 1;
  }
  showImage(index);
});

nextButton.addEventListener("click", function() {
  var index = currentImage + 1;
  if (index >= images.length) {
    index = 0;
  }
  showImage(index);
});