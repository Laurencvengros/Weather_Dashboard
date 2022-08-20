var APIkey = "3ab800fa705dfe5653a465d8d9a9d6ae";
var citiesLi = [];
city = "";

var citySearchHistory = JSON.parse(localStorage.getItem("citiesLi"));

if (citySearchHistory !== null){
    citySearchHistory.forEach(function(city) {city.toUpperCase();});
    citiesLi =citySearchHistory;


$(document).ready(function(){
showCity(citiesLi);
if(citySearchHistory !== null){
    lastSearchedCity = citiesLi[0];
    getWeather(lastSearchedCity);
}
}

)};

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

function showCity(listCities){
    var count = 0;
    listCities.length > 5 ? count = 5 : count = listCities.length
    for(var i = 0; i < count; i++){
        $("#list-of-cities").append(`<a href="#" class="list-group-item" style="text-decoration: none; color: black;">
        <li>${listCities[i]}</li>
        </a>`);
    }
}