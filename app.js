window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let degreeSection =  document.querySelector('.degree-section');
    let degreeSpan = document.querySelector('.degree-section span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/bcfac272498dcdc3e064b90549b2fbe4/${lat},${long}`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const {temperature, summary, icon} = data.currently;
                //Set DOM elements
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;

                //FORMULA Celsius
                let celsius = (temperature - 32) * (5/9);

                //Set Icon
                setIcons(icon, document.querySelector('.icon'));

                //Set temperature to Celsius/Farenheit
                degreeSection.addEventListener('click', ()=>{
                    if(degreeSpan.textContent === 'F'){
                        degreeSpan.textContent = 'C';
                        temperatureDegree.textContent = Math.floor(celsius);
                    }else{
                        degreeSpan.textContent = 'F';
                        temperatureDegree.textContent = temperature;
                    }
                });
            });
        });

    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});