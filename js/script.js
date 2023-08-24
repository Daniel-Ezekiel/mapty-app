'use strict';

// Query Selectors
const form = document.querySelector('form');
const workoutSelect = document.querySelector('select');
const inputDistance = document.querySelector('input.workout-distance');
const inputDuration = document.querySelector('input.workout-duration');
const inputGoal = document.querySelector('input.workout-goal');
const labelGoal = document.querySelector('label[for="elevation-cadence"]');
const workoutsUl = document.querySelector('.workouts');

let map, mapEvent;
class WorkoutTracker {
  #allWorkouts = JSON.parse(localStorage.getItem('allWorkouts')) || [];
  userCoords;
  map;
  workoutEntry = {};

  // Get user location
  getPosition() {
    navigator.geolocation.getCurrentPosition(
      pos => {
        this.userCoords = [pos.coords.latitude, pos.coords.longitude];
        this.displayMap();
      },
      err => {
        alert(`ERROR: Could not load map - (${err.code}): ${err.message}`);
      }
    );
  }

  // Show map based on user position
  displayMap() {
    this.map = L.map('map').setView(this.userCoords, 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
    }).addTo(this.map);

    this.showMarkerAndPopup();
    this.map.on('click', this.displayForm);
  }

  // Show form for filling
  displayForm(mapEv) {
    mapEvent = mapEv;
    const { lat, lng } = mapEvent.latlng;

    form.classList.remove('hidden');
    inputDistance.focus();
  }

  // On form filled
  populateWorkoutEntry(e) {
    e.preventDefault();

    this.workoutEntry.distance = Number(inputDistance.value);
    this.workoutEntry.duration = Number(inputDuration.value);
    this.workoutEntry.goal = Number(inputGoal.value);

    const workout =
      workoutSelect.value === 'Running'
        ? new Running(...Object.values(this.workoutEntry))
        : new Cycling(...Object.values(this.workoutEntry));
    this.addWorkout(workout);

    form.classList.add('hidden');
    form.querySelectorAll('input').forEach(input => (input.value = ''));

    // localStorage.setItem('allWorkouts', JSON.stringify(allWorkouts));
    workoutTracker.showWorkouts().showMarkerAndPopup();
  }

  // Add workouts to allWorkouts
  addWorkout(workout) {
    this.#allWorkouts.push(workout);
  }

  // Render workouts
  createWorkout({ coords, type, date, distance, duration, steps, elevation }) {
    const workoutLi = `<li class="workout workout-${type.toLowerCase()} m-auto grid grid-cols-4 gap-2 bg-dark-2 p-4 border-l-[0.5rem] ${
      type == 'Running' ? 'border-green' : 'border-orange'
    } rounded-md xl:m-[0] xl:max-w-[41rem] xl:self-center cursor-pointer">
      <h2 class="workout-title col-span-full font-medium text-xl">
        ${type} on ${date}
      </h2>
      <span class="workout-detail col-span-1 text-base uppercase"
        >${type == 'Running' ? '🏃‍♀️' : '🚴‍♂️'} ${distance} km
      </span>
      <span class="workout-detail col-span-1 text-base uppercase"
        >⏱ ${duration} min
      </span>
      <span class="workout-detail col-span-1 text-base uppercase"
        >⚡ ${Math.floor(distance / (duration / 60))} km/h
      </span>
      <span class="workout-detail col-span-1 text-base uppercase"
        >${
          type == 'Running'
            ? `👣 ${Math.floor(steps / duration)} spm`
            : `🗻 ${elevation} km`
        }
      </span>
    </li>`;

    workoutsUl.insertAdjacentHTML('afterbegin', workoutLi);
    workoutsUl.querySelector('li').addEventListener('click', () => {
      this.map.setView(coords, 18);
    });
  }

  // Render workouts on page load
  showWorkouts() {
    workoutsUl.textContent = '';
    this.#allWorkouts.forEach(workout => {
      this.createWorkout(workout);
    });

    localStorage.setItem('allWorkouts', JSON.stringify(this.#allWorkouts));
    return this;
  }

  // Display markers and popups for workouts
  showMarkerAndPopup() {
    this.#allWorkouts.forEach(({ coords, type, date }) => {
      let marker = L.marker(coords).addTo(this.map);
      let popup = L.popup(coords, {
        content: `${
          type == 'Running' ? `🏃‍♀️ ${type} on ${date}` : `🚴‍♂️ ${type} on ${date}`
        }`,
        minWidth: 175,
        maxWidth: 200,
        maxHeight: 80,
        autoClose: false,
        closeOnClick: false,
        className: `workout-popup ${type.toLowerCase()} bg-dark-2 text-[1.4rem]`,
      });
      marker.bindPopup(popup).openPopup();
    });
  }
}

class Workout {
  date = new Date().toLocaleDateString();
  coords = [mapEvent.latlng.lat, mapEvent.latlng.lng];

  constructor(distance, duration) {
    this.distance = distance;
    this.duration = duration;
  }

  get speed() {
    return Math.floor(this.distance / (this.duration / 60));
  }

  addWorkout(workout) {
    allWorkouts.push(workout);
  }
}

class Running extends Workout {
  type = 'Running';

  constructor(distance, duration, steps) {
    super(distance, duration);
    this.steps = steps;
  }

  get stepsPerMin() {
    return Math.floor(this.steps / this.duration);
  }
}

class Cycling extends Workout {
  type = 'Cycling';

  constructor(distance, duration, elevation) {
    super(distance, duration);
    this.elevation = elevation;
  }
}

const workoutTracker = new WorkoutTracker();
workoutTracker.getPosition();
workoutTracker.showWorkouts();

// Update form labels and values depending on workout type
workoutSelect.addEventListener('change', e => {
  if (e.target.value.toLowerCase() == 'running') {
    labelGoal.textContent = 'Steps';
    inputGoal.setAttribute('name', 'cadence');
    inputGoal.setAttribute('placeholder', 'steps');
  } else {
    labelGoal.textContent = 'Elevation';
    inputGoal.setAttribute('name', 'elevation');
    inputGoal.setAttribute('placeholder', 'km');
  }
});
form.addEventListener('keypress', e => {
  e.key === 'Enter' &&
    inputDistance.value &&
    inputDuration.value &&
    inputGoal.value &&
    workoutTracker.populateWorkoutEntry(e);
});
