//Variables that select from the DOM
var form = document.querySelector('form')
var input = document.getElementById('search-input')
var ul = document.querySelector('.list-group')
var cardGroup = document.createElement('div')
var cardHTML = document.getElementById('cards')
var cardgroupHTML = document.getElementById('card-groupHTML')
var previousSearch = document.createElement('button')
var city = [];
cardGroup.classList.add('card-group')

console.log(form, input, ul)
var apiKey = 'fe57efed754a6bd09a995c8f11d88d46'

function renderCity(city) {
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=' + apiKey)
    .then(function(response) {
        return response.json()
    })
    .then(function(city){
        for (var i = 0; i < city.length; i++){
            var lat = city[i].lat
            var lon = city[i].lon
            var cityName = city[i].name
            renderWeather()
    }
    function renderWeather() {
        cardHTML = document.getElementById('cards')
        fetch('http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=imperial')
        .then(function(response) {
            return response.json()
        })
        .then(function(city){
            var temp = city.list[0].main.temp
            
            var todayTemp = city.list[0].main.temp
            var todayHumidity = city.list[0].main.humidity
            var todayWind = city.list[0].wind.speed
            var cardDiv0 = document.createElement('div')
            var cardBody0 = document.createElement('div')
            var ul = document.createElement('ul')
            var li1 = document.createElement('li')
            var li2 = document.createElement('li')
            var li3 = document.createElement('li')
            var h1 = document.createElement('h1')
            h1.innerHTML = cityName + city.list[0].dt_txt
            li1.innerHTML = Math.trunc(todayTemp) + "°F"
            li2.innerHTML = todayHumidity + "%"
            li3.innerHTML = Math.trunc(todayWind) + "mph"
            cardDiv0.appendChild(h1)
            ul.append(li1)
            ul.append(li2)
            ul.append(li3)
            cardBody0.append(ul)
            cardDiv0.appendChild(cardBody0)
            cardHTML.appendChild(cardDiv0)
            cardDiv0.classList.add('card')
            cardDiv0.classList.add('mb-3')
            cardDiv0.classList.add('col-md-4')
            cardBody0.classList.add('card-body')
            console.log(city.list[0].dt_txt)
            var icon1 = city.list[0].weather[0].icon
            var forecastImg = document.createElement('img')
            forecastImg.src = 'http://openweathermap.org/img/wn/' + icon1 + '@2x.png'
            cardBody0.appendChild(forecastImg)
            localStorage.setItem("Previous Search", JSON.stringify(cityName))
            
            for (var i = 1; i < 6; i++) {
                cardgroupHTML = document.getElementById('card-groupHTML')
                city.list[i].main.temp
                city.list[i].main.humidity
                city.list[i].wind.speed
                city.list[i].weather[0].icon
                var icon = city.list[i].weather[0].icon

                
                var temp = city.list[i].main.temp
                var humidity = city.list[i].main.humidity
                var speed = city.list[i].wind.speed
                var cardDiv = document.createElement('div')
                var cardBody = document.createElement('div')
                var ul1 = document.createElement('ul')
                var li4 = document.createElement('li')
                var li5 = document.createElement('li')
                var li6 = document.createElement('li')
                
                
                var icon = city.list[i].weather[0].icon

                var forecastImg = document.createElement('img')
                forecastImg.src = 'http://openweathermap.org/img/wn/' + icon + '@2x.png'
                cardBody.appendChild(forecastImg)

                li4.innerHTML = Math.trunc(temp) + "°F"
                li5.innerHTML = humidity + "%"
                li6.innerHTML = Math.trunc(speed) + " mph"
                ul1.append(li4)
                ul1.append(li5)
                ul1.append(li6)
                
                
                cardDiv.classList.add('card')
                //cardDiv.classList.add('mb-3')
                cardDiv.classList.add('col-md-4')
                cardBody.classList.add('card-body')
                
                
                cardBody.append(ul1)
                cardDiv.appendChild(cardBody)
                cardGroup.append(cardDiv)
                
            }
            document.body.appendChild(cardGroup)
        })
    }
})
}




function handleSubmit(event) {
    event.preventDefault()
    var city = input.value
    renderCity(city)
    cardHTML.innerHTML = ""
    cardGroup.innerHTML = ""
    input.value = ""
}

form.addEventListener('submit', handleSubmit)