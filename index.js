window.addEventListener("DOMContentLoaded",(e)=>{
  console.log("ready!");
  let actualTemp1 = document.querySelector("#actual-temp1");

function updateDate(day, month, date) {
  let updatedDate = `${todaysDate} ${month}, ${day}`;
  return updatedDate;
}
let date = new Date();
let day = date.getDay();
let month = date.getMonth();
let todaysDate = date.getDate();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wedmesday",
  "Thursday",
  "Friday",
  "Saturday",
];
day = days[day];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
month = months[month];
let update_date = document.querySelector("#updateDate");
let updateTime = document.querySelector("#display-time");
update_date.innerHTML = updateDate(day, month, date);
updateTime.innerHTML = `${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`;

function updateCity(event) {
  event.preventDefault();
  let city = "Toronto";
  
  city = document.querySelector("#city-input").value;
  if (city === "") {
    city = "Toronto";
  }


  searchCity(city);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", updateCity);

function searchCity(city) {
  let apiKey = "82f1c4607193844c69603013cf7fd3a3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}
function displayWeatherCondition(response) {
  document.querySelector("#actual-temp1").innerHTML = response.data.temp;
  let updateThisName = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let f_deg_selected = document.querySelector(".degrees-f");
  let c_deg_selected = document.querySelector(".degrees-c");
  let humidity = document.querySelector(".humidity");
  let desc = document.querySelector(".description");
  let emoji=document.querySelector(".emoji");
  let weatherDescription=response.data.weather[0].description;
console.log("response.data",response.data);
  if (updateThisName.length >= 10) {
    console.log("yes longer than 10");
    document.getElementById("current-city-name").style.fontSize = "26px";
  }
  document.querySelector("#current-city-name").innerHTML = updateThisName;
  document.querySelector("#actual-temp1").innerHTML = temp;

  f_deg_selected.addEventListener("click", function () {
    let f_temp = temp * 1.8 + 32;
    document.querySelector("#actual-temp1").innerHTML = Math.round(f_temp);
  });

  c_deg_selected.addEventListener("click", function () {
    let c_temp = temp;
    document.querySelector("#actual-temp1").innerHTML = c_temp;
  });

  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  desc.innerHTML = `Description: ${weatherDescription}`;
  if (weatherDescription.includes("clear")){
    emoji.innerHTML="☀️";
 
  }
  if (weatherDescription.includes("cloud")){
    emoji.innerHTML="⛅️";
   
  }
  if (weatherDescription.includes("rain")){
    emoji.innerHTML="🌧";
   
  }
}
function showTempertaure(response) {
  let temperature = Math.ceil(response.data.main.temp);
  console.log(`Response is: ${response}`);
  console.log(temperature);
  actualTemp1.innerHTML = `${temperature}`;

  console.log(`Yo kaha ko ho:${temperature}`);
}

function changeGreetings(date) {
  let change_greetings = document.querySelector(".greetings");
  if (date.getHours() > 0 && date.getHours() <= 11) {
    change_greetings.innerHTML = "Good Morning! ☀️";
    document.getElementById(
      "container"
    ).style.background = `linear-gradient(rgb(255 135 135 / 97%), rgb(255 235 0 / 62%))`;
  }
  if (date.getHours() >= 12 && date.getHours() <= 16) {
    change_greetings.innerHTML = "Good Afternoon! 🌟";
    document.getElementById(
      "container"
    ).style.background = `linear-gradient(rgb(244 255 75 / 76%), rgb(243 179 36 / 97%))`;
  }
  if (date.getHours() >= 17 && date.getHours() <= 20) {
    change_greetings.innerHTML = "Good Evening! 🌇";

    document.getElementById(
      "container"
    ).style.background = `linear-gradient(rgb(197 208 26 / 72%), rgb(225 153 91))`;
  } else if (date.getHours() >= 21 && date.getHours() <= 24) {
    change_greetings.innerHTML = "Good Night! 🌚";
    document.getElementById(
      "container"
    ).style.background = `linear-gradient(rgb(223 164 0 / 83%), rgb(0 14 188 / 41%))`;
  }
}
changeGreetings(date);

let degrees_selected_c = document.querySelectorAll(".degrees-c");
degrees_selected_c.forEach(function (e) {
  e.addEventListener("click", function () {
    let actual_temp = document.querySelectorAll(".actual-temp1");
    console.log(actual_temp);
    actual_temp.forEach(function (item) {
      item.innerHTML = "40°";
    });
  });
});

// Geolocation and weather api

let lat;
let lon;

navigator.geolocation.getCurrentPosition(function (position) {
  console.log(`Position is:${position}`);
  lon = position.coords.longitude;
  lat = position.coords.latitude;
  console.log(lat);
  console.log(lon);
  // console.log(city_name);
});

})

//forecast


function displayForecast(){
  let forecast=document.querySelector("#forecast");
  let days=["Thu", "Fri","Sat", "Sun"]
let forecastHTML=`<div class="row">`;
  days.forEach(function(day){

forecastHTML=forecastHTML+`

         <div class="col-2">         
           <div class="weather-forecast-day">${day}</div>
           <img src="https://ssl.gstatic.com/onebox/weather/48/rain.png " alt="forecast-emoji" width="36">
          <div class="weather-forecast-temperatures">
           <span class="weather-forecast-temp-max">
           18&deg;</span>
           <span class="weather-forecast-temp-min">
            12&deg;</span>
          </div>
        
            
`;
forecastHTML=forecastHTML+`</div>`;
  })


forecast.innerHTML=forecastHTML;


}

displayForecast();