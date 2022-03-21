import { React, useEffect, useState } from 'react';
import axios from 'axios';
const api_key = process.env.REACT_APP_API_KEY;

const Single = ({ country }) => {
  const pStyle = {fontSize: '200px', marginTop: 0}
  const [ captialCoordinates, setCoordinates ] = useState({})
  const [ weather, setWeather ] = useState({});

  const coordinatesHook = () => {
    axios
      .get(`http://api.openweathermap.org/geo/1.0/direct?q=${country.capital + ',' + country.cca2}&appid=${api_key}`)
      .then(response => {
        if (response.status === 200) {
          let { lat, lon } = response.data[0];
          setCoordinates({ lat, lon});
        } else {
          alert('Something went wrong with the API call...')
        } 
      });
  }

  const weatherHook = () => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${captialCoordinates.lat}&lon=${captialCoordinates.lon}&appid=${api_key}&units=imperial`)
      .then(response => {
        if (response.status === 200) {
          let data = response.data;
          setWeather({description: data.weather[0].description, temp: data.main.temp});
        } else {
          alert('Something went wrong with the API call...')
        }
      })
  }
  useEffect(coordinatesHook, [country]);
  useEffect(weatherHook, [captialCoordinates]);

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
      <h2>Weather in {country.capital[0]}</h2>
      <p>description: {weather.description} </p>
      <p>temperature: {weather.temp} fahrenheit</p>
    </div>
  )
}

export default Single