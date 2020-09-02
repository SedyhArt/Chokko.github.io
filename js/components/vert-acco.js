const mesureWidth = function(item) {
  const screenWidth = $(window).width();
  const container = item.closest(".products-menu");
  const titlesBlocks = container.find(".products-menu__title");
  const titlesWidth = titlesBlocks.width() * titlesBlocks.length;

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (isMobile) {
    return screenWidth - titlesWidth;
  } else {
    return 500;
  }
}

$(".products-menu__title").on("click", e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const item = $this.closest(".products-menu__item");
  const container = $this.closest(".products-menu");
  const itemOpened = item.hasClass("active");
  
  item.addClass("active");

  if (itemOpened) {
    closeEveryItemCotainer(container);
  } else {
    closeEveryItemCotainer(container);
    item.find(".products-menu__content").width(mesureWidth(item));
  }
  // openItem(item);
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