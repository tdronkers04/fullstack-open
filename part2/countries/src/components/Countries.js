import React from 'react';

const Countries = ({ countries }) => {
  return (
    <ul>
      {
        countries.map(country => 
          <li key={country.ccn3}>{country.name.official}</li>
        )
      }
    </ul>
  )
}

export default Countries