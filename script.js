
document.addEventListener("DOMContentLoaded", defaultLocationGrabber());

function defaultLocationGrabber () {
  return fetch('http://localhost:3000/locations')
  .then((resp) => resp.json())
  .then((localData) => {
    const defaultLocation = localData.defaultLocation;
    if (defaultLocation !== "") {
      fetchWeather(defaultLocation)
      document.querySelector(".hidden").classList.add("show");;
    }
  })
}








//this is my function for grabbing weather info from this public API 
//it takes in the value from the event listener function and then fetches the weather for that location
//upon fetch, jsonifying, it will call the weatherLayout function wich is responsible for adding the 
//weather information to the dom and then to the webpage
function fetchWeather(searchItem) {
  return fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=e245bd4daa254d44a24160310212007&q=${searchItem}&days=1&aqi=no&alerts=no`
  )
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      weatherLayout(data);
      timeConverter(data);
      countryCatcher(data);
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
  document.querySelector(".hidden").classList.add("show");
}

//this function converts the time into standard time and adds the correct suffix then adds it to page
function timeConverter(weatherData) {
  const time = weatherData.location.localtime.substring(11);
  const hoursArray = time.split(":");
  const hours = hoursArray[0];
  const timeAsNum = parseInt(hours,10);
  if (timeAsNum > 12) {
    document.getElementById("date-time").innerText =`${timeAsNum -12}:${hoursArray[1]} PM`;

  } 
  else if(timeAsNum == 12) {
    document.getElementById("date-time").innerText =`${timeAsNum}:${hoursArray[1]} PM`
  }
  
  else {
    document.getElementById("date-time").innerText =`${timeAsNum}:${hoursArray[1]} AM`
 };
}
function countryCatcher(countryData) {
  const localCountry = countryData.location.country;
  if (localCountry == "United States of America") {
    document.getElementById("location-name").innerText = `${countryData.location.name}, ${countryData.location.region}`;
  }
  else {
    document.getElementById("location-name").innerText = `${countryData.location.name}, ${countryData.location.country}`;

  }
}

//this function will be cleaned up soon (hopefully)
function weatherLayout(data) {
  console.log(data.location.name);
  console.log(data);
  document.getElementById("temp-f").innerText = `${Math.round(data.current.temp_f)}°F`;
  document.getElementById("description").innerText = data.current.condition.text;
  const img = document.querySelector("#weather").src = `http:${data.current.condition.icon}`;
  document.getElementById("parent").classList.add("background-card");
  const minTemp = Math.round(data.forecast.forecastday[0].day.mintemp_f);
  const maxTemp = Math.round(data.forecast.forecastday[0].day.maxtemp_f);
  document.getElementById("high-low").innerText = `${minTemp}°/${maxTemp}°`;


  //this is adding/showing a button for the user to press after weather info has been displayed
  //after info is on screen it will show this button that will soon provide the user the ability to save
  //a default location, upon reloading webpage their default location's current weather will be displayed
  const defaultButton = document.querySelector("button");
    defaultButton.classList.remove("hidden");
//event listener for when use clicks the "set as default location button"
//this event listener will send the value they searched for to my JSON server so that it can be grabbed 
//by the first fetch function in order to display up to data weather info for that location even before
//searching upon next refresh
  defaultButton.addEventListener("click",() => {
    const defLocation = document.getElementById("location-name").innerText;
    console.log(defLocation);
    fetch('http://localhost:3000/locations', {
      method : "PATCH",
      headers: {"Content-type":"application/json"},
      body: JSON.stringify({defaultLocation:defLocation})
    })
  })

// const time = data.location.localtime.substring(11);
// const hoursArray = time.split(":");
// const hours = hoursArray[0];
// const numHours = parseInt(hours,10);
}