let hamburger = document.querySelector(".hamburger");
let overlay = document.querySelector(".overlay");

function toggleMenu(){
  hamburger.classList.toggle('hamburger--active');
  overlay.classList.toggle('overlay--active');
}

hamburger.addEventListener('click' , toggleMenu);