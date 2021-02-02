const submit_btn = document.getElementById("submit_btn");
const city = document.getElementById("city");
const result_cityName = document.getElementById("city_name");
const status = document.getElementById("weather_icon");
const temp = document.getElementById("temp");
const day_date = document.getElementById("day_date");
const time = document.getElementById("time");
const weather_status = document.getElementById("weather_status");
const visibility_wind = document.getElementById("visibility_wind");
const sun_set_rise = document.getElementById("sun_set_rise");




// search btn clicked event 
const get_information = async(event) => {
    result_cityName.innerHTML = "Loading..."

    event.preventDefault(); // prevent refreshing

    // if input field is empty
    let cityName = city.value;
    if(cityName === ""){
        weather_status.innerHTML = " ";
        visibility_wind.innerHTML = " ";
        sun_set_rise.innerHTML = " ";
        temp.innerHTML = " ";
        result_cityName.innerHTML = `First type the city name.`
    }else{
        // try and catch for any error
        try {
            const api_url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=a127923b70e080507631f46da6a62469`
            const response = await fetch(api_url); // wait till js fetch the data     
            const json_data = await response.json()
            const arr_data = [json_data]; // array of an object

            //temp
            temp.innerHTML = arr_data[0].main.temp + "<sup>o</sup>C";
            //city
            result_cityName.innerHTML = arr_data[0].name + ", " + arr_data[0].sys.country;
            let status = weather_status.innerHTML = arr_data[0].weather[0].main;
            if(status == "Smoke"){
                weather_status.innerHTML =status + " " +  '<i class="fas fa-smog"></i>'
            }else if(status == "Mist"){
               weather_status.innerHTML =status + " " +  '<i class="fas fa-smog mist"></i>'
            }else if(status == "Clouds"){
               weather_status.innerHTML =status + " " +  '<i class="fas fa-cloud"></i>'
            }else if(status == "Haze"){
               weather_status.innerHTML =status + " " +  '<i class="fas fa-water"></i>'
            }else if(status == "Sunny"){
               weather_status.innerHTML =status + " " +  '<i class="fas fa-sun"></i>'
            }else if(status == "Clear"){
               weather_status.innerHTML =status + " " +  '<i class="fas fa-circle"></i>'
            }else if(status == "Fog"){
                weather_status.innerHTML =status + " " +  '<i class="fas fa-water fog"></i>'
            }else if(status == "Rain"){
                weather_status.innerHTML =status + " " +  '<i class="	fas fa-cloud-showers-heavy"></i>'
            }else if(status == "Snow"){
                weather_status.innerHTML = status + " " + '<i class="far fa-snowflake"></i>'
            }
            //visibility
            visibility_wind.innerHTML = `Visibility: ${Math.ceil((arr_data[0].visibility)/1000)} km <br> Wind Speed: ${Math.ceil(arr_data[0].wind.speed)} km/h`; 
            // sunset and sunrise
            const sunriseTime = new Date(arr_data[0].sys.sunrise * 1000);
            const sunsetTime = new Date(arr_data[0].sys.sunset * 1000);
            sun_set_rise.innerHTML = `Sunrise:  ${sunriseTime.getHours()}:${sunriseTime.getMinutes()} AM <br> Sunset : ${sunsetTime.getHours()}:${sunsetTime.getMinutes()} PM`

        } catch (error) {
            result_cityName.innerHTML = `Incorrect name!`;
            weather_status.innerHTML = " ";
            visibility_wind.innerHTML = " ";
            sun_set_rise.innerHTML = " ";
            temp.innerHTML = " ";
            console.log(error);
        }
    }
};
submit_btn.addEventListener('click', get_information);

// date and time
setInterval(() => {
    const date = new Date();
    let hours = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    let date_ = date.getDate();
    let day = date.getDay();
    let mon = date.getMonth();
    let meridiem;

    let daysList = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ];
      let monthsList = [
        "Jan",
        "Feb", 
        "Mar", 
        "Apr", 
        "May", 
        "Jun", 
        "Jul",
        "Aug",
        "Sep", 
        "Oct", 
        "Nov", 
        "Dec"
    ];
    if(hours >= 12){
        meridiem = "PM"
    }else{
        meridiem = "AM"
    }

    if(hours > 12){
        hours = hours - 12;
        
    }
    if(hours < 10){
        hours = "0" + hours;
    }
    if(min < 10){
        min = "0" + min;
    }
    if(sec < 10){
        sec = "0" + sec;
    }
      const day_date_result = `${daysList[day]}, ${date_} ${monthsList[mon]}`;
      day_date.innerHTML = day_date_result;

      const time_result = `${hours}:${min}:${sec} ${meridiem}`;
      time.innerHTML = time_result;


  }, 1000);

