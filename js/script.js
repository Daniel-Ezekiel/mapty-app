'use strict';

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

// OpenStreetMap
var map = L.map('map').setView([51.505, -0.09], 13);
// Tile layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap',
}).addTo(map);
// Markers
var marker = L.marker([51.5, -0.09]).addTo(map);
// Popup
marker.bindPopup('<b>Hello world!</b><br>I am a popup.').openPopup();
// Popup creation and form rendering on click
var popup = L.popup();
function onMapClick(e) {
  form.classList.remove('hidden');

  popup
    .setLatLng(e.latlng)
    .setContent('You clicked the map at ' + e.latlng.toString())
    .openOn(map);
}
map.on('click', onMapClick);
