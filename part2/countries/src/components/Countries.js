import React from 'react';

const Button = ({ showCallBack }) => {
  return (
    <button onClick={showCallBack}>show</button>
  )
}

const Countries = ({ countries, showCallBack }) => {
  return (
    <ul>
      {
        countries.map(country => 
          <li key={country.ccn3} id={country.name.official}>{country.name.official} 
            <Button showCallBack={showCallBack}/></li>
        )
      }
    </ul>
  )
}

export default Countries