import { DateTime } from 'luxon';

const API_KEY = 'c078d6082787ed4ce866aa5e5f247269';
const BASE_URL = 'https://api.openweathermap.org/data/2.5'


// https://api.openweathermap.org/data/2.5/onecall?lat=28.8534&lon=2.3488&exclude=current,mintutely,hourly,alerts&appid=c078d6082787ed4ce866aa5e5f247269c&units=metric

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + '/' + infoType);
    url.search = new URLSearchParams({...searchParams, appid: API_KEY});
    return fetch(url).then((res) => res.json());
}
const formatCurrentWeather = (data) => {
    const {
        coord: {lat, lon},
        main: {temp, feels_like, temp_min, temp_max, humidity},
        name,
        dt,
        sys: {country, sunrise, sunset},
        weather,
        wind: {speed}
    } = data;

    const {main: details, icon} = weather[0]

    return {
        lat, 
        lon,
        temp, 
        feels_like, 
        humidity, 
        temp_max, 
        temp_min, 
        name, 
        dt, 
        country, 
        sunrise, 
        sunset, 
        weather, 
        speed, 
        details, 
        icon,
     }
};

const formatForecastWeather = (data) => {
     let {timezone, daily, hourly} = data;
     daily = daily.slice(1, 6).map(d => {
        return {
            title: formatToLocaleTime(d.dt, timezone, 'ccc'),
            temp: d.temp.day.toFixed(),
            icon: d.weather[0].icon
        }
     })
     hourly = hourly.slice(1, 6).map(d => {
        return {
            title: formatToLocaleTime(d.dt, timezone, 'hh:mm a'),
            temp: d.temp.toFixed(),
            icon: d.weather[0].icon
        }
     })
     return {timezone, daily, hourly}
}

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrentWeather);
    
    const {lat, lon} = formattedCurrentWeather;

const formattedForecastWeather = await getWeatherData('onecall', {
        lat,
        lon, 
        exclude: 'current,minutely,alert', 
        units: searchParams.units
    }).then(formatForecastWeather)

    return {...formattedCurrentWeather, ...formattedForecastWeather}
}
const formatToLocaleTime = (secs, zone, format = "cccc, dd, LLL yyyy' | Local time: 'hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format)

const iconUrlFromCode = (code) => `https://openweathermap.org/img/wn/${code}@2x.png`


export default getFormattedWeatherData

export { formatToLocaleTime, iconUrlFromCode}