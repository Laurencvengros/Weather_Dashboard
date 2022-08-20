var APIkey = "3ab800fa705dfe5653a465d8d9a9d6ae";
var citiesLi = [];





$(document).ready(function(){
var citySearchHistory = JSON.parse(localStorage.getItem("citiesLi"));

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
var cityName = $('<h2>');
cityName.text(city);
currentConditions.append(cityName);


}

)};

function showCity(){
    var count = 0;
    if(citiesLi.length > 5 ? count = 5 : count = citiesLi.length){
    for(var i = 0; i < count; i++){
        $("#list-of-cities").append(`<a href="#" style="text-decoration: none; color: black;">
        <li>${citiesLi[i]}</li>
        </a>`);
    }
    }
}