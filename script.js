var searchInput = document.getElementById("input")
var formatInput = document.getElementById("format-input")
var searchBtn = document.getElementById("search")
var limit = "3"
var APIKey = "65dd2cb24d08df60b79958ae63c221f8"
var saveSearches = JSON.parse(localStorage.getItem("searches"))||[];

searchBtn.addEventListener("click", getParameters)

function getParameters (event) {
    event.preventDefault()
    var searchTerm = searchInput.value

    if(searchTerm === "") {
        alert("Please enter a valid city")
        return
    }
    apiSearch(searchTerm);
}

function apiSearch(searchTerm) {

    var requestUrlCoordinates = `https://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=${limit}&appid=${APIKey}`
    console.log(requestUrlCoordinates)

    fetch(requestUrlCoordinates)
    .then(function(response){
        if(!response.ok){
            console.log("error")
        }else {
            return response.json()
        }
    })
    .then (function(data){
        console.log(data)
        if(data){
            var lat = data[0].lat
            var lon = data[0].lon

        var requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=hourly&appid=${APIKey}`
    
        fetch(requestUrl)
        .then(function(response){
            if(!response.ok){
                console.log("error")
            }else{
                return response.json()
            }
        })
        .then(function(data){
            if(data){
                printData(data)
                }
            })
        }

    })
}

function printData(data) {
    console.log(data)
    document.getElementById("currentDate").textContent = data.minutely[0].dt
    document.getElementById("current-temp").textContent = data.current.temp
    document.getElementById("current-wind").textContent = data.current.wind_speed
    document.getElementById("current-humidity").textContent = data.current.humidity
    document.getElementById("current-uvIndex").textContent = data.current.uvi
    document.getElementById("futureDateOne").textContent = data.minutely[1].dt
    document.getElementById("future-tempOne").textContent = data.daily[1].temp.day
    document.getElementById("future-windOne").textContent = data.daily[1].wind_speed
    document.getElementById("future-humidityOne").textContent = data.daily[1].humidity
    document.getElementById("futureDateTwo").textContent = data.minutely[2].dt
    document.getElementById("future-tempOne").textContent = data.daily[2].temp.day
    document.getElementById("future-windOne").textContent = data.daily[2].wind_speed
    document.getElementById("future-humidityOne").textContent = data.daily[2].humidity
    document.getElementById("futureDateThree").textContent = data.minutely[3].dt
    document.getElementById("future-tempTwo").textContent = data.daily[3].temp.day
    document.getElementById("future-windTwo").textContent = data.daily[3].wind_speed
    document.getElementById("future-humidityTwo").textContent = data.daily[3].humidity
    document.getElementById("futureDateFour").textContent = data.minutely[4].dt
    document.getElementById("future-tempThree").textContent = data.daily[4].temp.day
    document.getElementById("future-windThree").textContent = data.daily[4].wind_speed
    document.getElementById("future-humidityThree").textContent = data.daily[4].humidity
    document.getElementById("futureDateFour").textContent = data.minutely[5].dt
    document.getElementById("future-tempFour").textContent = data.daily[5].temp.day
    document.getElementById("future-windFour").textContent = data.daily[5].wind_speed
    document.getElementById("future-humidityFour").textContent = data.daily[5].humidity
    document.getElementById("futureDateFive").textContent = data.minutely[6].dt
    document.getElementById("future-tempFive").textContent = data.daily[6].temp.day
    document.getElementById("future-windFive").textContent = data.daily[6].wind_speed
    document.getElementById("future-humidityFive").textContent = data.daily[6].humidity
        
            localStorage.setItem("searches",JSON.stringify(saveSearches));

}
