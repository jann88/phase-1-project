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

document.getElementById("weather-search").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    buttonHandler();
  }
});
const button = document.getElementById("submit-button");
button.addEventListener("click", buttonHandler);

function buttonHandler() {
  const inputValue = document.getElementById("weather-search").value;
  fetchWeather(inputValue);
}

function weatherLayout(data) {
  console.log(data.location.name);
  console.log(data);
  document.getElementById("temp-header").innerText = "Temperature in your Area:";
  document.getElementById("temp-f").innerText = `${data.current.temp_f}°F`;
  document.getElementById("temp-c").innerText = `${data.current.temp_c}°C`;
  document.getElementById("description").innerText = data.current.condition.text;
  document.getElementById("location-name").innerText = `${data.location.name}, ${data.location.country}`;
  const img = document.querySelector("#weather").src = `http:${data.current.condition.icon}`;
  document.getElementById("parent").classList.add("background-card");
  document.getElementById("date-time").innerText = data.location.localtime;
  document.getElementById("humidity").innerText = `${data.current.humidity}%`;
  //document.getElementById("high-low").innerText = ;
  document.getElementById("UV-index").innerText = `${data.current.uv} of 10`;
  document.getElementById("wind-mph").innerText = `${data.current.wind_mph} mph`;
  const defaultButton = document.querySelector(".hidden");
  defaultButton.classList.remove("hidden");
  defaultButton.addEventListener("click",(event) => {
    fetch('http://localhost:3000/location', {
      method : "POST",
      headers: {"Content-type":"application/json"},
      body: JSON.stringify({defaultLocation:inputValue})
    })
  })

}