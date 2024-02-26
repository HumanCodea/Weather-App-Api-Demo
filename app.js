var search = document.querySelector('.search');
var city = document.querySelector('.city')
var country = document.querySelector('.country')
var value = document.querySelector('.value')
var shortDesc = document.querySelector('.short-desc')
var visibility = document.querySelector('.visibility span')
var wind = document.querySelector('.wind span')
var cloud = document.querySelector('.cloud span')
var times = document.querySelector('.time')
var content = document.querySelector('.content')
var body = document.querySelector('body')

async function changeWeatherUI(capitalSearch){
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${capitalSearch}&units=metric&appid=d78fd1588e1b7c0c2813576ba183a667`

    let data = await fetch(apiURL).then(res => res.json())

    if(data.cod == 200){
        city.innerText = data.name;
        country.innerText = data.sys.country;
        visibility.innerText = data.visibility + ' (m)';
        wind.innerText = data.wind.speed + ' (m/s)';
        cloud.innerText = data.main.humidity + '(%)';
        let temp = Math.round(data.main.temp);
        value.innerText = temp;
        shortDesc.innerText = data.weather[0] ? data.weather[0].main : '';
        let date = new Date((data.dt)*1000);
        times.innerText = date.toString();

        if(temp > 35){
            body.setAttribute('class', 'summer')
        } else if(temp > 25 && temp <= 35){
            body.setAttribute('class', 'autumn')
        } else if(temp > 15 && temp <= 25){
            body.setAttribute('class', 'spring')
        } else {
            body.setAttribute('class', 'winter')
        }
    }
}

search.addEventListener('keypress', function(e){
    if(e.code == 'Enter'){
        let capitalSearch = search.value.trim();
        changeWeatherUI(capitalSearch);
    }
})

changeWeatherUI('Ha Noi')