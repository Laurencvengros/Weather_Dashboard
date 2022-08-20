var APIkey = "3ab800fa705dfe5653a465d8d9a9d6ae";
var citiesLi = [];


$(document).ready(function(){
var citySearchHistory = JSON.parse(localStorage.getItem("citiesLi"));

if (citiesLi !== null){
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
citiesLi.push(city);




getWeather();
storedCities();
    
})


function getWeather(){
currentCity = $("#searchCities").val();

var APIurl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIkey;
fetch(APIurl)
.then(function(response){
    return response.json();
    
})
.then(function(data){
console.log(currentCity);

var currentConditions = $("#todayforecast");
var cityName = $('<h2>');
cityName.text(currentCity);
currentConditions.append(cityName);
}

)};