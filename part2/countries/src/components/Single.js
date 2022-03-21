import { React, useEffect, useState } from 'react';
import axios from 'axios';
const api_key = process.env.REACT_APP_API_KEY;

const Single = ({ country }) => {
  const weatherStyle = {margin: 0}
  const pStyle = {fontSize: '200px', margin: 0}
  const [ weather, setWeather ] = useState({description: null, temp: null, icon: null});
  
  useEffect(() => {
    async function getWeather() {
      let coordinates;
      let weatherData;
      
      try {
        coordinates = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${country.capital + ',' + country.cca2}&appid=${api_key}`).then(response => response.data)
        weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates[0].lat}&lon=${coordinates[0].lon}&appid=${api_key}&units=imperial`).then(response => response.data);
        setWeather({
          description: weatherData.weather[0].description,
          temp: weatherData.main.temp,
          windSpeed: weatherData.wind.speed,
          icon: weatherData.weather[0].icon,
        });
      
      } catch {
        alert("Something went wrong with the API call...");
      } 
    }
    getWeather()
  }, [country]);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>
        <p>Capital: {country.capital[0]}</p>
        <p>Area: {country.area}</p>
      </div>
      <h2>Languages</h2>
      <ul>
        {
          Object.values(country.languages).map(language => {
            return <li key={language}>{language}</li>
          })
        }
      </ul>
      <p style={pStyle}>{country.flag}</p>
      <div style={weatherStyle}>
        <h2>Weather in {country.capital[0]}</h2>
        <p>Current Temperature: {weather.temp} F</p>
        <p>Wind: {weather.windSpeed} m/second</p>
        <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="current weather"></img>
      </div>
    </div>
  )
}

export default Single