import React from 'react';
import Countries from './Countries';
import Single from './Single';

const Display = ({ countries }) => {
  if (countries.length > 10) {
    return <p>Too many matches, please be more specific</p>
  } else if (countries.length > 1 && countries.length <= 10) {
    return <Countries countries={countries}/>
  } else if (countries.length === 1) {
    return <Single country={countries[0]}/>
  } else {
    return <p>No matches found</p>
  }
}

export default Display