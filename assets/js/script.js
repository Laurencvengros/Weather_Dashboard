var APIkey = "3ab800fa705dfe5653a465d8d9a9d6ae";
var citiesLi = [];
var currentCity;


var tableBody = document.getElementById('list-of-cities');
var citySearchHistory = JSON.parse(localStorage.getItem("citiesLi")) || [];





$(document).ready(function(){

if(citiesLi !== null){
    citiesLi = citySearchHistory || [];
  
}
});

function storedCities(){
    localStorage.setItem("citiesLi", JSON.stringify(citiesLi));
    console.log(localStorage);

}


$("#searchBtn").on("click", function(event){
event.preventDefault();
city = $("#searchCities").val();
citiesLi = [];
citiesLi.push(city);




getWeather();
storedCities();
showCity();
    
})


function getWeather(){

var APIurl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIkey;
fetch(APIurl)
.then(function(response){
    return response.json();
    
})
.then(function(data){
console.log(city);

var currentConditions = $("#todayforecast");
var header = $("<div class='container'>");
var weatherDiv = $("<div class='container'>");



var cityEl = $('<h2>');
cityEl.text(city);
currentConditions.empty();
;


currentDate = moment.unix(data.dt).format("l");
dateEl = $("<h3>").text(currentDate.toString());
console.log(dateEl);


var conditionsIcon = data.weather[0].icon;
conditionsIconEl = "http://openweathermap.org/img/w/"+ conditionsIcon + ".png";
console.log(conditionsIconEl);
var weatherIcon = $("<img>").attr('src', conditionsIconEl);
var headerText = $("<h3>").text(city + " " + currentDate.toString() + conditionsIcon);
headerText.append(weatherIcon);
header.append(headerText);
$("#todayforecast").append(header);


var temp = data.main.temp;
var tempF = ((temp - 273.15) * 1.80 + 32).toFixed(1);
var tempEl = $("<p>").text("Temperature: " + tempF + " F ");
weatherDiv.append(tempEl)
$("#todayforecast").append(weatherDiv);
console.log(tempEl);



var humidity = data.main.humidity;
var humidityEl = $("<p>").text("Humidity: " + humidity + " % ");
weatherDiv.append(humidityEl);
$("#todayforecast").append(weatherDiv);
console.log(humidity);

var windSpeed = data.wind.speed;
var windSpeedEl = $("<p>").text("Wind Speed: " + windSpeed + " MPH ");
weatherDiv.append(windSpeedEl);
$("#todayforecast").append(weatherDiv);
console.log(windSpeedEl);



}

)};

function showCity(){
    var storedCities = JSON.parse(localStorage.getItem("citiesLi")) || [];
    var ulEl = document.createElement("ul");
    ulEl.classList.add("list-unstyled");
    ulEl.classList.add("w-100");

    for(var i = 0; i < storedCities.length; i++){
        
        var liEl = document.createElement("li");
        liEl.innerHTML = "<button type='button' class='list-group-item list-group-item-action' attr='"+citiesLi[i]+"'>" + citiesLi[i] + "</button>";
        ulEl.appendChild(liEl);
    }
        tableBody.appendChild(ulEl); 
    
};