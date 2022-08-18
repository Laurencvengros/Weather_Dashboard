var APIkey = "3ab800fa705dfe5653a465d8d9a9d6ae";



$("#searchBtn").on("click", function(event){
event.preventDefault();
city = $("#searchCities").val();
getWeather();
    
})


function getWeather(){
var city = $("#searchCities").val();
currentCity = $("#searchCities").val();

var APIurl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIkey;
fetch(APIurl)
.then(function(response){
    return response.json();
})
.then(function(response){
console.log(city);
}

)};