document.addEventListener('DOMContentLoaded', () => {
    const API_KEY = '444f47a5027459efa5ecc41d12aedbae';

    const cityInputDiv = document.getElementById('search-city');
    const citynameDiv = document.getElementById('cityname');

    const todayDiv = document.getElementById('date-today');
    const todaydateDiv = document.getElementById('date-today-date');
    const timeDiv = document.getElementById('date-time');

    const currtempDiv = document.getElementById('temp-curr');
    const realfeelDiv = document.getElementById('real-feel-value');
    const windDiv = document.getElementById('wind-value');
    const pressureDiv = document.getElementById('pressure-value');
    const humidityDiv = document.getElementById('humidity-value');

    const weatherDiv = document.getElementById('weather-image');

    const sunriseDiv = document.getElementById('sunrise-time');
    const sunsetDiv = document.getElementById('sunset-time');

    const day1labelDiv = document.getElementById('day1-label');
    const day1iconDiv = document.getElementById('day1-icon');
    const day1tempDiv = document.getElementById('day1-temp');

    const day2labelDiv = document.getElementById('day2-label');
    const day2iconDiv = document.getElementById('day2-icon');
    const day2tempDiv = document.getElementById('day2-temp');

    const day3labelDiv = document.getElementById('day3-label');
    const day3iconDiv = document.getElementById('day3-icon');
    const day3tempDiv = document.getElementById('day3-temp');

    const day4labelDiv = document.getElementById('day4-label');
    const day4iconDiv = document.getElementById('day4-icon');
    const day4tempDiv = document.getElementById('day4-temp');

    const day5labelDiv = document.getElementById('day5-label');
    const day5iconDiv = document.getElementById('day5-icon');
    const day5tempDiv = document.getElementById('day5-temp');

    const day6labelDiv = document.getElementById('day6-label');
    const day6iconDiv = document.getElementById('day6-icon');
    const day6tempDiv = document.getElementById('day6-temp');

    const forecastDiv = document.getElementById('humidity-graph');

    const speedDiv = document.getElementById('speed');
    const degreeDiv = document.getElementById('degree');

    const visibilityDiv = document.getElementById('visibility-value');
    const viewconditionDiv = document.getElementById('view-condition');

    const humidityiconDiv = document.getElementById('humidity-icon');
    const humidityvalueDiv = document.getElementById('humidity-value-box');
    const dewpointDiv = document.getElementById('humidity-view-condition');

    cityInputDiv.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const city = cityInputDiv.value;
            fetchWeatherData(city);
        }
    });

    function fetchWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        fetch(url)
           .then(response => response.json())
           .then(data => {
                displayCurrentWeather(data);
                fetchForecastData(data.coord.lat, data.coord.lon);
                updateBackground(data.weather[0].main);
            })
           .catch(error => console.error('Error fetching weather data:', error));
    }

    function fetchForecastData(lat, lon) {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&exclude=current,minutely,hourly,alerts&appid=${API_KEY}`;
        fetch(url)
           .then(response => response.json())
           .then(data => {
                displayForecast(data);
            })
           .catch(error => console.error('Error fetching forecast data:', error));
    }

    function displayCurrentWeather(data) {
        const { main, weather, visibility, wind, dt, sys } = data;
        const date = new Date(dt * 1000);
        const formattedDate = date.toLocaleString('en-US', { month: 'short', day: 'numeric' });
        const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
        const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

        citynameDiv.innerHTML = `
            ${data.name}
        `;
        todayDiv.innerHTML = `
            ${dayOfWeek}
        `;
        todaydateDiv.innerHTML = `
            ${formattedDate}
        `;
        timeDiv.innerHTML = `
            ${time}
        `;
        currtempDiv.innerHTML = `
            ${main.temp}°C
        `;
        realfeelDiv.innerHTML = `
            ${main.feels_like}°C
        `;
        windDiv.innerHTML = `
            ${wind.speed} m/s
        `;
        pressureDiv.innerHTML = `
            ${main.pressure} hPa
        `;
        humidityDiv.innerHTML = `
            ${main.humidity} %
        `;

        condition=weather[0].main;
        conditionIcon(condition,weatherDiv);
        
        sunrise=sys.sunrise;
        const sunrisedate = new Date(sunrise * 1000);
        const sunrisetime = sunrisedate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        sunriseDiv.innerHTML = `
            ${sunrisetime}
        `;

        sunset=sys.sunset;
        const sunsetdate = new Date(sunset * 1000);
        const sunsettime = sunsetdate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        sunsetDiv.innerHTML = `
            ${sunsettime}
        `;

        speedDiv.innerHTML = `
            ${(wind.speed*3.6).toFixed(2)}
        `;
        degreeDiv.innerHTML = `
            ${wind.deg}°
        `;

        visibilityDiv.innerHTML = `
            ${((visibility)/1000).toFixed(2)}
        `;
        viewconditionDiv.innerHTML = `
            ${weather[0].description.toUpperCase()}
        `;

        displayHumidityIcon(main.humidity, humidityiconDiv);
        humidityvalueDiv.innerHTML = `
            ${main.humidity}%
        `;
        dewpointDiv.innerHTML = `
            ${((main.temp)-((100-main.humidity)/5)).toFixed(2)}°C Dew Point
        `;

    }

    function conditionIcon(condition ,labelDiv) {
        switch(condition.toLowerCase()) {
            case 'clear':
                labelDiv.innerHTML = `
                    <span class="material-symbols-outlined">sunny</span>
                `;
                break;
            case 'clouds':
                labelDiv.innerHTML = `
                    <span class="material-symbols-outlined">cloud</span>
                `;
                break;
            case 'rain':
                labelDiv.innerHTML = `
                    <span class="material-symbols-outlined">rainy</span>
                `;
                break;
            case 'snow':
                labelDiv.innerHTML = `
                    <span class="material-symbols-outlined">cloudy_snowing</span>
                `;
                break;
            case 'thunderstorm':
                labelDiv.innerHTML = `
                    <span class="material-symbols-outlined">thunderstorm</span>
                `;
                break;
            case 'mist':
                labelDiv.innerHTML = `
                    <span class="material-symbols-outlined">foggy</span>
                `;
                break;
            default:
                labelDiv.innerHTML = `
                    <span class="material-symbols-outlined">sunny</span>
                `;    
        }
    }

    function displayHumidityIcon(condition, labelDiv) {
        if (condition >= 75) {
            labelDiv.innerHTML = `
                <span class="material-symbols-outlined">humidity_high</span>
            `;
        } else if (condition <= 25) {
            labelDiv.innerHTML = `
                <span class="material-symbols-outlined">humidity_low</span>
            `;
        } else {
            labelDiv.innerHTML = `
                <span class="material-symbols-outlined">humidity_mid</span>
            `;
        }
    }    

    function displayForecast(forecast) {
        const forecastObjArr = [];
        for (let i = 0; i < forecast.list.length; i++) {
            const forecastDay = new Date(forecast.list[i].dt * 1000).toLocaleString('en-US', { weekday: 'short' }).toUpperCase();
            const forecastTemp = forecast.list[i].main.temp;
            const forecastIcon = forecast.list[i].weather[0].main;
            const forecastHumidity = forecast.list[i].main.humidity;
      
            const forecastObj = {
                day: forecastDay,
                temp: forecastTemp,
                icon: forecastIcon,
                humidity: forecastHumidity
            };
            forecastObjArr.push(forecastObj);
        }
        const forecastdata = [];
        const forecastdatatemp = {};
        for (const forecast of forecastObjArr) {
            const day = forecast.day;
            const temp = forecast.temp;
            const icon = forecast.icon;
            const humidity = forecast.humidity;

            if (!forecastdatatemp[day]) {
                forecastdatatemp[day] = {
                    day: day,
                    min: temp,
                    max: temp,
                    icon: icon,
                    minhumidity: humidity,
                    maxhumidity: humidity
                };
            }
            else {
                forecastdatatemp[day].min = Math.min(forecastdatatemp[day].min, temp);
                forecastdatatemp[day].max = Math.max(forecastdatatemp[day].max, temp);
                forecastdatatemp[day].minhumidity = Math.min(forecastdatatemp[day].minhumidity, humidity);
                forecastdatatemp[day].maxhumidity = Math.max(forecastdatatemp[day].maxhumidity, humidity);
            }
            if (!forecastdata.includes(forecastdatatemp[day])){
                forecastdata.push(forecastdatatemp[day]);
            } else {
                const existingIndex = forecastdata.indexOf(forecastdatatemp[day]);
                if (existingIndex !== -1) {
                    forecastdata.splice(existingIndex, 1);
                }
                forecastdata.push(forecastdatatemp[day]);
            }            
        }

        const forecastchart = [];
        for (const forecast of forecastdata) {
            const day = forecast.day;
            const min = forecast.min;
            const max = forecast.max;
            const icon = forecast.icon;
            const minhumidity = forecast.minhumidity;
            const maxhumidity = forecast.maxhumidity;

            const avg = Math.floor((min+max)/2);
            const avghumidity = Math.floor((minhumidity+maxhumidity)/2);

            if (!forecastchart.find(el => el.day === day)) {
                forecastchart.push({
                    day: day,
                    temp: avg,
                    humidity: avghumidity,
                    icon: icon
                });
            }
        }

        const dayLabelDivs = [
            day1labelDiv,
            day2labelDiv,
            day3labelDiv,
            day4labelDiv,
            day5labelDiv,
            day6labelDiv
        ];
        const dayTempDivs = [
            day1tempDiv,
            day2tempDiv,
            day3tempDiv,
            day4tempDiv,
            day5tempDiv,
            day6tempDiv
        ];
        const dayIconDivs = [
            day1iconDiv,
            day2iconDiv,
            day3iconDiv,
            day4iconDiv,
            day5iconDiv,
            day6iconDiv
        ];

        const dates = [];
        const temps = [];
        const humidities = [];

        forecastchart.forEach((forecast, i) => {
            const dayLabelDiv = dayLabelDivs[i];
            const dayTempDiv = dayTempDivs[i];
            const dayIconDiv = dayIconDivs[i];

            const day = forecast.day;
            const temp = forecast.temp;
            const humidity = forecast.humidity;
            const icon = forecast.icon;

            dates.push(day);
            temps.push(temp);
            humidities.push(humidity);

            dayLabelDiv.innerHTML = `
                ${day}
            `;
            dayTempDiv.innerHTML = `
                ${temp}°C
            `;
            conditionIcon(icon,dayIconDiv);
        });

        graphDisplay(dates,temps,humidities);
        
        /*forecastDayDiv.innerHTML = forecastdata.map((day) => {
            return `
                <p>${dates} ${temps} ${humidities}</p>
                <p>${day.day}: Min:${day.min}°C Max:${day.max}°C Min-Humidity:${day.minhumidity}% Max-Humidity:${day.maxhumidity}% ${day.icon}</p>
            `;
        }).join('');*/
    }

    let tempHumidityChart;
    function graphDisplay(dates,temps,humidities) {
        const ctx = forecastDiv.getContext('2d');
        if (tempHumidityChart){
            tempHumidityChart.destroy();
        }
        tempHumidityChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dates,
                datasets: [
                    {
                        label: 'Temperature (°C)',
                        type: 'line',
                        data: temps,
                        borderColor: '#bbd7ec',
                        backgroundColor: 'rgba(0, 123, 255, 0.1)',
                        pointBackgroundColor: '#0d4c7b',
                        fill: false,
                        tension: 0.4,
                        yAxisID: 'y2',
                    },
                    {
                        label: 'Humidity (%)',
                        type: 'bar',
                        data: humidities,
                        backgroundColor: 'rgba(255, 255, 255, 0.4)',
                        borderColor: 'rgba(255, 255, 255, 1)',
                        borderWidth: 5,
                        yAxisID: 'y1',
                        barPercentage: 0.2,
                        borderRadius: 10,
                    }
                ]
            },
            options: {
                scales: {
                    y1: {
                        type: 'linear',
                        position: 'left',
                        ticks: {
                            beginAtZero: true,
                            color: '#777', // White text color for y-axis labels
                        },
                        grid: {
                            drawOnChartArea: false, // Only draw grid lines on the right y-axis
                        }
                    },
                    y2: {
                        type: 'linear',
                        position: 'right',
                        ticks: {
                            beginAtZero: true,
                            color: '#777', // White text color for y-axis labels
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)', // Light white grid lines
                        }
                    },
                    x: {
                        ticks: {
                            color: '#818085', // White text color for x-axis labels
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)', // Light white grid lines
                        },
                        categoryPercentage: 0.5,
                        barPercentage: 0.5,
                    },
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#ffffff', // White color for the legend text
                        }
                    }
                }
            }
        });
    }

    function updateBackground(condition) {
        let gradient;
        switch (condition.toLowerCase()) {
            case 'clear':
                gradient = 'linear-gradient(to right, #87CEFA, #00BFFF)'; // Clear skies (light blue to deeper blue)
                break;
            case 'clouds':
                gradient = 'linear-gradient(to right, #BDC3C7, #2C3E50)'; // Cloudy (light gray to dark gray)
                break;
            case 'rain':
                gradient = 'linear-gradient(to right, #2C3E50, #34495E)'; // Rainy (dark gray to deeper blue-gray)
                break;
            case 'snow':
                gradient = 'linear-gradient(to right, #E0F7FA, #B3E5FC)'; // Snowy (light blue to slightly deeper blue)
                break;
            case 'thunderstorm':
                gradient = 'linear-gradient(to right, #0F0C29, #302B63, #24243E)'; // Thunderstorm (dark gray-blue to purple)
                break;
            default:
                gradient = 'linear-gradient(to right, #D1E9F6, #000000)'; // Default (light blue to black)
        }
        document.body.style.background = gradient;
    }    

    // Fetch default location weather (Delhi)
    fetchWeatherData('Delhi');
});