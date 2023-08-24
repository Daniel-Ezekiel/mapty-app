'use strict';

// Query Selectors
const form = document.querySelector('form');
const workoutSelect = document.querySelector('select');
const inputDistance = document.querySelector('input.workout-distance');
const inputDuration = document.querySelector('input.workout-duration');
const inputGoal = document.querySelector('input.workout-goal');
const labelGoal = document.querySelector('label[for="elevation-cadence"]');
const workoutsUl = document.querySelector('.workouts');

console.log(L);
// const allWorkouts = JSON.parse(localStorage.getItem('allWorkouts')) || [];
const workoutEntry = {};
var map;

// Function on map click
const onMapClick = e => {
  console.log(e);
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
  const userCoords = [pos.coords.latitude, pos.coords.longitude];

  // OpenStreetMap
  map = L.map('map').setView(userCoords, 13);

  // Tile layer
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap',
  }).addTo(map);

  // Markers
  // var marker = L.marker(userCoords).addTo(map);
  workoutTracker.showMarkerAndPopup();

  // Popup
  // marker.bindPopup('<b>Hello world!</b><br>I am a popup.').openPopup();

  // Popup creation and form rendering on click
  // var popup = L.popup();
  map.on('click', onMapClick);

  // console.log(workoutTracker1.userCoords);
};
const error = err => {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
navigator.geolocation.getCurrentPosition(success, error, options);

class WorkoutTracker {
  #allWorkouts = JSON.parse(localStorage.getItem('allWorkouts')) || [];

  addWorkout(workout) {
    this.#allWorkouts.push(workout);
  }

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
      map.setView(coords, 18);
    });
  }

  showMarkerAndPopup() {
    this.#allWorkouts.forEach(({ coords, type, date }) => {
      let marker = L.marker(coords).addTo(map);
      let popup = L.popup(coords, {
        className: `bg-dark-2 text-[1.4rem]`,
        content: `${
          type == 'Running' ? `🏃‍♀️ Running on ${date}` : `🚴‍♂️ Cycling on ${date}`
        }`,
      });
      marker.bindPopup(popup).openPopup();
    });
  }

  showWorkouts() {
    workoutsUl.textContent = '';
    console.log(this.#allWorkouts);
    this.#allWorkouts.forEach(workout => {
      this.createWorkout(workout);
    });

    localStorage.setItem('allWorkouts', JSON.stringify(this.#allWorkouts));
    return this;
  }
}
const workoutTracker = new WorkoutTracker();

class Workout {
  date = new Date().toLocaleDateString();

  constructor(coords, distance, duration) {
    this.coords = coords;
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

  constructor(coords, distance, duration, steps) {
    super(coords, distance, duration);
    this.steps = steps;
  }

  get stepsPerMin() {
    return Math.floor(this.steps / this.duration);
  }
}

class Cycling extends Workout {
  type = 'Cycling';

  constructor(coords, distance, duration, elevation) {
    super(coords, distance, duration);
    this.elevation = elevation;
  }
}

// Create and show workouts on page load
// const createWorkout = ({
//   type,
//   date,
//   distance,
//   duration,
//   steps,
//   stepsPerMin,
// }) => {
//   const workoutLi = `<li  class="workout workout-${type.toLowerCase()} m-auto grid grid-cols-4 gap-2 bg-dark-2 p-4 border-l-[0.5rem] ${
//     type == 'Running' ? 'border-green' : 'border-orange'
//   } rounded-md xl:m-[0] xl:max-w-[41rem] xl:self-center">
//     <h2 class="workout-title col-span-full font-medium text-xl">
//       ${type} on ${date}
//     </h2>
//     <span class="workout-detail col-span-1 text-base uppercase"
//       >${type == 'Running' ? '🏃' : '🚴‍♂️'} ${distance} km
//     </span>
//     <span class="workout-detail col-span-1 text-base uppercase"
//       >⏱ ${duration} min
//     </span>
//     <span class="workout-detail col-span-1 text-base uppercase"
//       >⚡ ${Math.floor(distance / (duration / 60))} km/h
//     </span>
//     <span class="workout-detail col-span-1 text-base uppercase"
//       >${type == 'Running' ? '👣' : '🗻'} 10 ${type == 'Running' ? 'spm' : 'km'}
//     </span>
//   </li>`;

//   workoutsUl.insertAdjacentHTML('afterbegin', workoutLi);
// };
// const showWorkouts = allWorkouts => {
//   workoutsUl.textContent = '';
//   allWorkouts.forEach(workout => {
//     createWorkout(workout);
//   });
// };
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

// On form filled
const populateWorkoutEntry = e => {
  e.preventDefault();

  workoutEntry.distance = Number(inputDistance.value);
  workoutEntry.duration = Number(inputDuration.value);
  workoutEntry.goal = Number(inputGoal.value);

  const workout =
    workoutSelect.value === 'Running'
      ? new Running(...Object.values(workoutEntry))
      : new Cycling(...Object.values(workoutEntry));
  workoutTracker.addWorkout(workout);

  form.classList.add('hidden');
  form.querySelectorAll('input').forEach(input => (input.value = ''));

  // localStorage.setItem('allWorkouts', JSON.stringify(allWorkouts));
  workoutTracker.showWorkouts().showMarkerAndPopup();
};
form.addEventListener('keypress', e => {
  e.key === 'Enter' &&
    inputDistance.value &&
    inputDuration.value &&
    inputGoal.value &&
    populateWorkoutEntry(e);
});
