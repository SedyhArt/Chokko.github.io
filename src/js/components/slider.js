
const slider = $('#slider').bxSlider({
  pager : false,
  controls : false,
});

$('.slider__controls--position--left').click(e => {
  e.preventDefault();
  slider.goToPrevSlide();

});
$('.slider__controls--position--right').click(e => {
  e.preventDefault();
  slider.goToNextSlide();

});