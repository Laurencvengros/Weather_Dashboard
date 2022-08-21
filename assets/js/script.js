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


function showWeather(){
console.log(city);

var currentConditions = $("#todayforecast");
var header = $("<div class='container'>");
var weatherDiv = $("<div class='container'>");

var cityEl = $('<h2>');
cityEl.text(city);
currentConditions.empty();


dateEl = $("<h3>").text(currentDate.toString());
console.log(dateEl);

var weatherIcon = $("<img>").attr('src', conditionsIconEl);
var headerText = $("<h3>").text(city + " " + currentDate.toString());
headerText.append(weatherIcon);
header.append(headerText);
$("#todayforecast").append(header);

var tempEl = $("<p>").text("Temperature: " + tempF + " F ");
weatherDiv.append(tempEl)
$("#todayforecast").append(weatherDiv);
console.log(tempEl);

var humidityEl = $("<p>").text("Humidity: " + humidityVal + " % ");
weatherDiv.append(humidityEl);
$("#todayforecast").append(weatherDiv);


var windSpeedEl = $("<p>").text("Wind Speed: " + windSpeed + " MPH ");
weatherDiv.append(windSpeedEl);
$("#todayforecast").append(weatherDiv);
console.log(windSpeedEl);

var uvEl = $("<div>").text(uvIndex)
weatherDiv.append(uvEl);
$("#todayforecast").append( weatherDiv );
console.log(uvEl);



};

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

function getWeather(){

var APIurl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIkey;
fetch(APIurl)
.then(function(response){
    return response.json();
})

.then(function(data){
    currentDate = moment.unix(data.dt).format("l");
    var conditionsIcon = data.weather[0].icon;
    conditionsIconEl = "http://openweathermap.org/img/w/"+ conditionsIcon + ".png";
    var tempVal = data.main.temp;
    tempF = ((tempVal - 273.15) * 1.80 + 32).toFixed(1);
    humidityVal = data.main.humidity;
    windSpeed = data.wind.speed;
    var latitude = data.coord.lat;
    var longitude = data.coord.lon;

    var APIurlUV = "https://api.openweathermap.org/data/2.5/uvi?&appid=" + APIkey + "&lat=" + latitude + "&lon=" + longitude;
    fetch(APIurlUV)

.then(function(response){
    return response.json();
   
})
.then(function(data){
uvIndex = data.value;


if(uvIndex <= 2){
   $("#todayforecast").addClass("low");
}else if((uvIndex > 2) && (uvIndex <= 5)){
    $("#todayforecast").addClass("moderate");
}else if((uvIndex > 5) && (uvIndex <= 7)){
    $("#todayforecast").addClass("high");
}else if (uvIndex >=8){
    $("#todayforecast").addClass("extreme");
}

showWeather();
}
)}
)};

