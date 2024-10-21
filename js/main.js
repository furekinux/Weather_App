function todayWeather() {
    let xhr = new XMLHttpRequest();
    let url = `http://api.weatherapi.com/v1/current.json?key=01126ba1df5a4d99aa2123911242110&q=Bucaramanga`;
    xhr.open("GET",url,true);

    xhr.onreadystatechange = function(){

        if(this.readyState === 4 && this.status === 200){
            let response = JSON.parse(this.responseText);
            document.getElementById("temperature_main").innerText = `${response.current.temp_c}°`
            document.getElementById("location_place").innerText = `${response.location.name}, ${response.location.country}`
            
            document.getElementById("weather_icon").removeAttribute("src");
            document.getElementById("weather_icon").setAttribute("src", response.current.condition.icon);
            
            document.getElementById("weather_text").innerText=`${response.current.condition.text}`
            
            document.getElementById("feels").innerText=`Feels like ${response.current.feelslike_c}°`

            time = response.location.localtime
            datetime(time)

        }else if(this.readyState == 4){
            console.log("Error :(",this.statusText)

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