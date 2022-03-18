import React from 'react';

const Single = ({ country }) => {
  const pStyle = {
    fontSize: '200px',
    marginTop: 0
  }
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
    </div>
  )
}

export default Single