'use strict';

// Query Selectors
const form = document.querySelector('form');
const workoutSelect = document.querySelector('select');
const inputDistance = document.querySelector('input.workout-distance');
const inputDuration = document.querySelector('input.workout-duration');
const inputGoal = document.querySelector('input.workout-goal');

console.log(L);
let userCurrCoords;
const allWorkouts = [];
var map;

class Workout {
  speed;

  constructor(distance, duration) {
    this.distance = distance;
    this.duration = duration;
  }

  get speed() {
    return this.distance / this.duration;
  }

  addWorkout(workout) {
    allWorkouts.push(workout);
  }
}

class Cycling extends Workout {
  type = 'Cylcing';

  constructor(distance, duration, steps) {
    super(distance, duration);
    this.steps = steps;
  }

  get stepsPerMin() {
    return this.steps / this.duration;
  }
}

class Running extends Workout {
  type = 'Running';

  constructor(distance, duration, elevation) {
    super(distance, duration);
    this.elevation = elevation;
  }
}
// const running1 = new Running();
// const cycling1 = new Running();

// Function on map click
const onMapClick = e => {
  console.log(e);
  const workoutEntry = {};
  const lat = e.latlng.lat;
  const lng = e.latlng.lng;
  workoutEntry.coords = [lat, lng];

  form.classList.remove('hidden');

  // popup
  //   .setLatLng(e.latlng)
  //   .setContent('You clicked the map at ' + e.latlng.toString())
  //   .openOn(map);
};

// Geolocation API setup
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
workoutSelect.addEventListener('change', e => {
  if (e.target.value.toLowerCase() == 'running') {
    inputGoal.setAttribute('name', 'cadence');
    inputGoal.setAttribute('placeholder', 'steps');
  } else {
    inputGoal.setAttribute('name', 'elevation');
    inputGoal.setAttribute('placeholder', 'km');
  }
});
