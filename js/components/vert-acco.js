const mesureWidth = function(item) {
  let reqItemWidth = 0;
  const screenWidth = $(window).width();
  const container = item.closest(".products-menu");
  const titlesBlocks = container.find(".products-menu__title");
  const titlesWidth = titlesBlocks.width() * titlesBlocks.length;

  const textContainer =  item.find(".products-menu__container");
  const paddingLeft = parseInt(textContainer.css("padding-left"));
  const paddingRight = parseInt(textContainer.css("padding-right"));

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (isMobile) {
    reqItemWidth = screenWidth - titlesWidth;
  } else {
    reqItemWidth = 500;
  }

  return {
    container: reqItemWidth,
    textContainer: reqItemWidth - paddingRight - paddingLeft
  }
}

$(".products-menu__title").on("click", e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const item = $this.closest(".products-menu__item");
  const container = $this.closest(".products-menu");
  const itemOpened = item.hasClass("active");
  const textBlock = item.find(".products-menu__container");
  
  item.addClass("active");
  item.find(".products-menu__content").width(mesureWidth(item).container);
  textBlock.width(mesureWidth(item).textContainer);
  console.log(mesureWidth(item).container);

  if (itemOpened) {
    closeEveryItemCotainer(container);
  } else {
    closeEveryItemCotainer(container);
    item.find(".products-menu__content").width(mesureWidth(item).container);
  }
  
})

$(".products-menu__close").on("click", e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const item = $this.closest(".products-menu__item");
  item.find(".products-menu__content").width(0);
  
  
})

const closeEveryItemCotainer = (container) => {
  const items = container.find(".products-menu__item");
  const content = container.find(".products-menu__content");

  items.removeClass("active");

  content.width(0);
}