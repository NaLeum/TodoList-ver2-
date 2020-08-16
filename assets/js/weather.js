const weather = document.querySelector(".weather");

const API_KEY ="3517ac7afdc764c5527ab0cbb3206cb8";
const COORDS= 'coords';

function getWeather(lat, lon){
    fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json()
    }).then(function(json){
        const temperature = json.main.temp;
        const place= json.name;
        weather.innerText = `${temperature}'c @ ${place}`;
    });

    
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude: latitude,
        longitude: longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handleGeoError(){
    console.log("Cant ass")
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError)
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}


function init(){
    loadCoords();
}

init();