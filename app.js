const weatherIcons = {
"Rain": "wi wi-day-rain",
"Clouds": "wi wi-day-cloud",
"Clear": "wi wi-day-sunny",
"Snow": "wi wi-day-snow",
"mist": "wi wi-day-fog",
"Drizzle": "wi wi-day-sleet",

}

function capitalize (str){
    return str[0].toUpperCase() + str.slice(1);
}

async function main (withIP = true){
    let city;
    if(withIP){
        const ip = await fetch('https://api.ipify.org?format=json')
        .then(resultat => resultat.json())
        .then(json => json.ip);
        const city = await fetch ("http://api.ipstack.com/109.29.62.208?access_key=a131cd1d415dbf0a6d945e8151fc922b&format=1")
            .then(resultat => resultat.json())
            .then(json => json.city);
                
   
    }else{
        city = document.querySelector("#city").textContent;
    }
        const meteo = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=849a9c871e0d1d0fd824b853f421f60e&lang=en&units=metric`)
                .then(resultat => resultat.json())
                .then(json => json);
        console.log(meteo);    
        displayWeatherInfos(meteo)
     
}

function displayWeatherInfos(data){
    const name = data.name;
    const temperature = data.main.temp;
    const conditions = data.weather[0].main;
    const description = data.weather[0].description;

    document.querySelector("#city").textContent = name;
    document.querySelector("#temperature").textContent = temperature; 
        Math.round(temperature);
    document.querySelector("#conditions").textContent = capitalize(description);
    document.querySelector("i.wi").className = weatherIcons[conditions];
    document.body.className = conditions.toLowerCase();

}

const city = document. querySelector("#city");
city.addEventListener("click", () => {
    city.contentEditable = true;
});

city.addEventListener("keydown", (e) => {
    if(e.keyCode === 13){
        e.preventDefault();
        city.contentEditable = false;

    }
})

main();
