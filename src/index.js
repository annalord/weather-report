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

const registerEventHandlers = (event) => {
  const upButton = document.querySelector('#up_arrow');
  upButton.addEventListener('click', increaseTemp);

  const downButton = document.querySelector('#down_arrow');
  downButton.addEventListener('click', decreaseTemp);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
