let hamburger = document.querySelector(".hamburger");
let overlay = document.querySelector(".overlay");

let links = document.querySelectorAll(".overlay__menu .menu__link");


function toggleMenu(){
  hamburger.classList.toggle('hamburger--active');
  overlay.classList.toggle('overlay--active');
}

hamburger.addEventListener('click' , toggleMenu);
links.forEach(function(element){
  element.addEventListener('click', toggleMenu);
})