'use strict';

console.log(L);
let userCurrCoords;
var map;

class Workout {}

class Cycling extends Workout {}

class Running extends Workout {}

const success = pos => {
  userCurrCoords = [pos.coords.latitude, pos.coords.longitude];

  // OpenStreetMap
  map = L.map('map').setView(userCurrCoords, 13);

  // Tile layer
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap',
  }).addTo(map);

  // Markers
  // var marker = L.marker(userCurrCoords).addTo(map);

  // Popup
  // marker.bindPopup('<b>Hello world!</b><br>I am a popup.').openPopup();

  // Popup creation and form rendering on click
  // var popup = L.popup();
  function onMapClick(e) {
    console.log(e);
    form.classList.remove('hidden');

    // popup
    //   .setLatLng(e.latlng)
    //   .setContent('You clicked the map at ' + e.latlng.toString())
    //   .openOn(map);
  }
  map.on('click', onMapClick);

  console.log(userCurrCoords);
};
const error = err => {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};
const options = {
  // enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
navigator.geolocation.getCurrentPosition(success, error, options);

// Update form labels and values depending on workout type
const form = document.querySelector('form');
const workoutSelect = document.querySelector('select');
const workoutGoalInput = document.querySelector('input.workout-goal');
workoutSelect.addEventListener('change', e => {
  if (e.target.value.toLowerCase() == 'running') {
    workoutGoalInput.setAttribute('name', 'cadence');
    workoutGoalInput.setAttribute('placeholder', 'step/min');
  } else {
    workoutGoalInput.setAttribute('name', 'elevation');
    workoutGoalInput.setAttribute('placeholder', 'km');
  }
});
