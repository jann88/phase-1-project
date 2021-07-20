function fetchWeather(searchItem) {
  return fetch(
    `http://api.weatherapi.com/v1/current.json?key=e245bd4daa254d44a24160310212007&q=${searchItem}&aqi=yes`
  )
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      weatherLayout(data);
    });
}

const button = document.getElementById("submit-button");
button.addEventListener("click", buttonHandler);

function buttonHandler() {
  const inputValue = document.getElementById("weather-search").value;
  fetchWeather(inputValue);
}

function weatherLayout(data) {
  const rawData = data;
}
