let swiperhomeslider = document.querySelector('.swiper home-slider');

document.querySelector('#close-swiper').onclick = () =>{
  swiperhomeslider.classList.remove('active');
}

let swiperwrapper = document.querySelector('.swiper-wrapper');

document.querySelector('#swiper-close').onclick = () =>{
  swiperwrapper.classList.toggle('active');
}

window.onscroll = () =>{
    swiperhomeslider.classList.remove('active');
    swiperwrapper.classList.remove('active');
};

document.querySelectorAll('.accordion-container .accordion').forEach(accordion =>{
    accordion.onclick = () =>{
        accordion.classList.toggle('active');
    }
});

var swiper = new Swiper(".home-slider", {
    loop:true,
    grabCursor:true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
});

var swiper = new Swiper(".review-slider", {
    loop:true,
    grabCursor:true,
    spaceBetween: 20,
    breakpoints: {
        450: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
    },
});