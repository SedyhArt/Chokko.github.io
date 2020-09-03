let myMap;

const init = () => {
  myMap = new ymaps.Map("map", {
    center: [59.942712, 30.306937],
    zoom: 11,
    controls: []
  });

  const coords = [
    [59.935199, 30.315822],
    [59.875410, 30.324036],
    [59.946975, 30.241136]
  ];

  const myCollection = new ymaps.GeoObjectCollection({}, {
    draggble: false,
    iconLayout: 'default#image',
    iconImageHref: "./img/marker.png",
    iconImageSize: [30, 42],
    iconImageOffset: [-3, -42]
  });

  coords.forEach(coord => {
    myCollection.add(new ymaps.Placemark(coord));
  });

  myMap.geoObjects.add(myCollection);

  myMap.behaviors.disable('scrollZoom');
}

ymaps.ready(init);