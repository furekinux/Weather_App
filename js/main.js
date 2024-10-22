function todayWeather() {
    let xhr = new XMLHttpRequest();
    let url = `http://api.weatherapi.com/v1/current.json?key=01126ba1df5a4d99aa2123911242110&q=Bucaramanga`;
    xhr.open("GET",url,true);

    xhr.onreadystatechange = function(){

        if(this.readyState === 4 && this.status === 200){
            let response = JSON.parse(this.responseText);

            document.getElementById("iconWeather").setAttribute("href", response.current.condition.icon)

            document.getElementById("temperature_main").innerText = `${response.current.temp_c}°`
            document.getElementById("feels").innerText=`Feels like ${response.current.feelslike_c}°`

            document.getElementById("location_place").innerText = `${response.location.name}, ${response.location.country}`
            
            document.getElementById("weather_icon").removeAttribute("src");
            document.getElementById("weather_icon").setAttribute("src", response.current.condition.icon);
            document.getElementById("weather_text").innerText=`${response.current.condition.text}`
            

            document.getElementById("wind").innerText=`${response.current.wind_kph} km/h`
            document.getElementById("uv").innerText=`${response.current.uv}`
            document.getElementById("rain").innerText=`${response.current.cloud}%`
            document.getElementById("pressure").innerText=`${response.current.pressure_mb}hpa`

            time = response.location.localtime
            datetime(time)

            weatherChange(time,response.current)
        }else if(this.readyState == 4){
            console.log("Error :(",this.statusText)
            alert("Couldn't connect to server...")
        }
    }
    xhr.send();
}

function datetime(time) {
    const match = time.match(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/);
    
    if (!match) {
        console.error("Invalid date format. Please use YYYY-MM-DD HH:MM.");
        return;
    }

    const [year, month, day, hour, minute] = match.slice(1);

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const monthName = monthNames[parseInt(month, 10) - 1];

    let date = document.getElementById("date");
    date.innerText = `${monthName} ${day}, ${hour}:${minute}`

}

todayWeather()

function tomorrowWeather(){}

function tenForecast(){}

function weatherChange(date,current){

    let today = date.slice(0,10)
    let todayTime = new Date(today).getTime();

    let day =1*24*60*60;

    let yesterday = todayTime-day
    console.log(yesterday)
    yesterday = new Date(yesterday).toISOString().slice(0,10);
    console.log(yesterday)

    let xhr = new XMLHttpRequest();
    urlYesterday=`https://api.weatherapi.com/v1/history.json?key=01126ba1df5a4d99aa2123911242110&q=Bucaramanga&dt=${yesterday}&aqi=no`
    xhr.open("GET",urlYesterday,true);

    xhr.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            let response = JSON.parse(this.responseText);

            document.getElementById("windChange").innerText=`${((response.forecast.forecastday[0].day.maxwind_kph)-(current.wind_kph)).toFixed()} km/h`
            document.getElementById("uvChange").innerText=`${((response.forecast.forecastday[0].day.uv)-(current.wind_kph)).toFixed()}`
            document.getElementById("rainChange").innerText=`${((response.forecast.forecastday[0].day.daily_chance_of_rain)-(current.cloud)).toFixed()}%`
            document.getElementById("pressureChange").innerText=`${(1027-current.pressure_mb).toFixed()}hpa`

        }else if(this.readyState == 4){
            console.log("Error :(",this.statusText)
            alert("Couldn't connect to server...")
        }
    }
    xhr.send();
}
