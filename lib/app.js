import mapboxgl from 'mapbox-gl';

// TODO: Write your JS code in here


const submit = document.getElementById("btn-submit");
const inputCoordinates = document.getElementById("input-coordinates");
const key = "pk.eyJ1IjoiY21zYWNhc3RybyIsImEiOiJja21jaDViOXMwMndrMnJwNXh6YzI0a3JpIn0.W-BDWmjR8oPevFfypBiyug";
const displayCoordinates = document.getElementById("coordinates");

const displayMap = (coordinates) => {
  mapboxgl.accessToken = key;
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [coordinates[0], coordinates[1]],
    zoom: 12
  });
};

const displayGPS = (event) => {
  displayCoordinates.innerHTML = "";
  event.preventDefault();
  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${inputCoordinates.value}.json?access_token=${key}`)
    .then(response => response.json())
    .then((data) => {
      const coordinates = data.features[2].center;
      const coordinateTag = `<h3>${coordinates[0]},  ${coordinates[1]}</h3>`;
      displayCoordinates.insertAdjacentHTML('beforeend', coordinateTag);
      displayMap(coordinates);
    });
};

submit.addEventListener('click', displayGPS);
