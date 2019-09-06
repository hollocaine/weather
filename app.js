window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    '.temperature-description'
  );
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let temperatureName = document.querySelector('.temperature-name');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const API = `${proxy}https://api.darksky.net/forecast/82faa777ed609266d2f79fa4dc71d604/${lat},${long}`;
      fetch(API)
        .then(response => {
          return response.json();
        })
        .then(data => {
          const { temperature, summary, icon } = data.currently;
          //Set DOM elements from the API
          temperatureDescription.textContent = summary;
          temperatureDegree.textContent = parseInt(fToC(temperature));
          if (data.timezone === 'Europe/Dublin') {
            temperatureDegree.textContent = parseInt(fToC(temperature));
            temperatureName.textContent = 'Celcius';
          } else {
            temperatureDegree.textContent = parseInt(temperature);
            temperatureName.textContent = 'Fahrenheit';
          }
          locationTimezone.textContent = data.timezone;
          //Set icon
          setIcons(icon, document.querySelector('.icon'));
        });
    });
  } else {
    h1.textContent = 'Not working';
  }
  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: 'white' });
    const currentIcon = icon.replace(/-/g, '_').toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
  function fToC(fahrenheit) {
    const fTemp = fahrenheit;
    const fToCel = ((fTemp - 32) * 5) / 9;
    return fToCel;
  }
});
