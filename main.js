const apiKey = "e080532e302bc7627a50fc22cd53e561";
const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector('.search-bar input');
const button = document.querySelector('.search-bar button');
const weatherIcon = document.querySelector('.weather-icon');
const content = document.querySelector('.weather');

searchBox.addEventListener('keypress', function(event){    
    if(event.key === "Enter"){
        event.preventDefault();
        button.click();
    }
})

button.addEventListener('click', function(){
    checkWeather(searchBox.value);
})

async function checkWeather(city){
    const response = await fetch(url + city + `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector('.error').style = "display: block";
        content.style = "display: none";
    }else{
        var data = await response.json();
    
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
        document.querySelector('.wind').innerHTML = data.wind.speed + " km/h";
    
        if (data.weather[0].main == 'Clouds'){
            weatherIcon.src = 'img/clouds.png';
        }else if (data.weather[0].main == 'Clear'){
            weatherIcon.src = 'img/clear.png';
        }else if (data.weather[0].main == 'Rain'){
            weatherIcon.src = 'img/rain.png';
        }else if (data.weather[0].main == 'Drizzle'){
            weatherIcon.src = 'img/drizzle.png';
        }else if (data.weather[0].main == 'Mist'){
            weatherIcon.src = 'img/mist.png';
        }
    
        document.querySelector('.error').style = "display: none";
        content.style = "display: block";
    }  
}


