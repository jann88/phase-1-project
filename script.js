function fetchWeather() {
  return fetch(
    "http://api.weatherapi.com/v1/current.json?key=e245bd4daa254d44a24160310212007&q=Houston&aqi=yes"
  )
    .then((resp) => {
      resp.json();
    })
    .then((data) => {
      console.log(data);
    });
}

fetchWeather();
