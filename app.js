"use strict"

window.addEventListener('load', () => {
    let lon, lat, date;

    let temperaturaValor = document.getElementById('temperatura-valor');
    let temperaturaDescripcion = document.getElementById('temperatura-descripcion');

    let ubicacion = document.getElementById('ubicacion');
    let iconoAnimado = document.getElementById('icono-animado');

    let vientoVelocidad = document.getElementById('viento-velocidad');



    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(posicion => {
            lon = posicion.coords.longitude;
            lat = posicion.coords.latitude;

            //Por ubicacion actual.
            const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=es&units=metric&appid=e14803fbce5200c38e4569947d384b79`


            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data.list[3]);
                    let temp = Math.round(data.list[3].main.temp);
                    temperaturaValor.textContent = `${temp}ºC`;

                    let desc = data.list[3].weather[0].description;
                    temperaturaDescripcion.textContent = desc.toUpperCase();

                    ubicacion.textContent = data.city.name;

                    vientoVelocidad.textContent = `${data.list[3].wind.speed} m/s`

                    switch (data.list[3].weather[0].main) {
                        case 'Thunderstorm':
                            iconoAnimado.src = 'animated/thunder.svg'
                            break;
                        case 'Drizzle':
                            iconoAnimado.src = 'animated/rainy-2.svg'
                            break;
                        case 'Rain':
                            iconoAnimado.src = 'animated/rainy-7.svg'
                            break;
                        case 'Snow':
                            iconoAnimado.src = 'animated/snowy-6.svg'
                            break;
                        case 'Clear':
                            iconoAnimado.src = 'animated/day.svg'
                            break;
                        case 'Atmosphere':
                            iconoAnimado.src = 'animated/weather.svg'
                            break;
                        case 'Clouds':
                            iconoAnimado.src = 'animated/cloudy-day-1.svg'
                            break;
                        default:
                            iconoAnimado.src = 'animated/cloudy-day-1.svg'
                            break;
                    }


                })
                .catch(error => console.error(error.message));


        })
    }
})