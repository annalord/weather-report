'use strict';

const state = {
  temp: 75,
};

const increaseTemp = () => {
  state.temp += 1;
  const bigTempContainer = document.querySelector('#big_temp');
  bigTempContainer.textContent = `${state.temp}`;

  changeTempColor(bigTempContainer);
};

const decreaseTemp = () => {
  state.temp -= 1;
  const bigTempContainer = document.querySelector('#big_temp');
  bigTempContainer.textContent = `${state.temp}`;

  changeTempColor(bigTempContainer);
};

const changeTempColor = (bigTempContainer) => {
  const landscape = document.querySelector('#landscape');

  if (state.temp > 80) {
    bigTempContainer.className = 'hot';
    landscape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (state.temp > 70) {
    bigTempContainer.className = 'warm';
    landscape.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (state.temp > 60) {
    bigTempContainer.className = 'moderate';
    landscape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (state.temp > 50) {
    bigTempContainer.className = 'cold';
    landscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else {
    bigTempContainer.className = 'very-cold';
    landscape.textContent = '🏔❄️☃️⛷🏔❄️☃️⛷🏔❄️☃️⛷';
  }
};

const changeCity = (input) => {
  const newCity = document.querySelector('#city').value;
  const cityContainer = document.querySelector('#city-container');
  cityContainer.textContent = newCity;
};

const getLatLon = () => {
  const newCity = document.querySelector('#city').value;
  axios
    .get('http://Localhost:5000/location', {
      params: {
        q: newCity,
      },
    })
    .then((response) => {
      const latitude = response.data[0].lat;
      const longitude = response.data[0].lon;
      getTemperature(latitude, longitude);
    })
    .catch((error) => {
      console.log('Error with getLatLon');
    });
};

const getTemperature = (latitude, longitude) => {
  axios
    .get('http://Localhost:5000/weather', {
      params: {
        lat: latitude,
        lon: longitude,
      },
    })
    .then((response) => {
      const temperature = response.data.main.temp;
      const fahrenheitTemp = Math.round((9 / 5) * (temperature - 273) + 32);
      state.temp = fahrenheitTemp;
      const bigTemp = document.querySelector('#big_temp');
      bigTemp.textContent = `${state.temp}`;
    })
    .catch((error) => {
      console.log('Error with getTemperature');
    });
};

const pickSky = () => {
  const skyChoice = document.querySelector('#sky').value;
  const skyDisplay = document.querySelector('#skyDisplay');
  if (skyChoice === 'Sunny') {
    skyDisplay.textContent = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
  } else if (skyChoice === 'Cloudy') {
    skyDisplay.textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (skyChoice === 'Rainy') {
    skyDisplay.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  } else if (skyChoice === 'Snowy') {
    skyDisplay.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  }
};

const registerEventHandlers = (event) => {
  const upButton = document.querySelector('#up_arrow');
  upButton.addEventListener('click', increaseTemp);

  const input = document.querySelector('input');
  input.addEventListener('input', changeCity);

  const downButton = document.querySelector('#down_arrow');
  downButton.addEventListener('click', decreaseTemp);

  const realTime = document.querySelector('#realtime');
  realTime.addEventListener('click', getLatLon);

  const selectSky = document.querySelector('#sky');
  selectSky.addEventListener('change', pickSky);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);

