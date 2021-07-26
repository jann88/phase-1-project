
document.addEventListener("DOMContentLoaded", defaultLocationGrabber());

function defaultLocationGrabber () {
  return fetch('http://localhost:3000/locations')
  .then((resp) => resp.json())
  .then((localData) => {
    const defaultLocation = localData.defaultLocation;
    if (defaultLocation !== "") {
      fetchWeather(defaultLocation);
    }
  })
}








//this is my function for grabbing weather info from this public API 
//it takes in the value from the event listener function and then fetches the weather for that location
//upon fetch, jsonifying, it will call the weatherLayout function wich is responsible for adding the 
//weather information to the dom and then to the webpage
function fetchWeather(searchItem) {
  return fetch(
    `http://api.weatherapi.com/v1/current.json?key=e245bd4daa254d44a24160310212007&q=${searchItem}&aqi=yes`
  )
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      weatherLayout(data);
    })
    .catch(() => {
      alert("Please enter a valid Location.")
    });
}
// this code handles the events of pressing enter and clicking submit
// it will take the value of the search field upon click and interpolate that value into the fetch
// in order to fetch data for the location you searched for
document.getElementById("weather-search").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    buttonHandler();
  }
});
const button = document.getElementById("submit-button");
button.addEventListener("click", buttonHandler);

//this is the callback function for pressing the submit button or pressing enter on your keyboard
//it has been abstracted out for reusability in both event listeners
function buttonHandler() {
  const inputValue = document.getElementById("weather-search").value;
  fetchWeather(inputValue);
}
//this function will be cleaned up soon (hopefully)
function weatherLayout(data) {
  console.log(data.location.name);
  console.log(data);
  document.getElementById("temp-header").innerText = "Additional Information";
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
  //this is adding/showing a button for the user to press after weather info has been displayed
  //after info is on screen it will show this button that will soon provide the user the ability to save
  //a default location, upon reloading webpage their default location's current weather will be displayed
  const defaultButton = document.querySelector("button");
    defaultButton.classList.remove("hidden");
//event listener for when use clicks the "set as default location button"
//this event listener will send the value they searched for to my JSON server so that it can be grabbed 
//by the first fetch function in order to display up to data weather info for that location even before
//searching upon next refresh
  defaultButton.addEventListener("click",(event) => {
    const defLocation = document.getElementById("weather-search").value;
    fetch('http://localhost:3000/locations', {
      method : "PATCH",
      headers: {"Content-type":"application/json"},
      body: JSON.stringify({defaultLocation:defLocation})
    })
  })

}