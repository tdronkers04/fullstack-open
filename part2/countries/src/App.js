import axios from 'axios';
import { useEffect, useState } from 'react';
import Search from './components/Search';
import Display from './components/Display';

const App = () => {
  const [ allCountries, setAllCountries ] = useState([]);
  const [ matchingCountries, setMatchingCountries ] = useState([]);
  const [ searchTerm, setSearchTerm ] = useState('');

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        if (response.status === 200) {
          setAllCountries(response.data)
        } else {
          alert('Something went wrong with the API call...')
        } 
      });
  }

  useEffect(hook, []);

  const updateMatches = () => {
    const matches = allCountries.filter(country => {
      let names = [country.name.common, country.name.official].map(name => name.toLowerCase());
      let matches = names.filter(name => name.includes(searchTerm.toLowerCase()))
      return matches.length > 0;
    });
    setMatchingCountries(matches);
  }

  const handleSearchChange = async (event) => {
    setSearchTerm(event.target.value);  
  }

  useEffect(updateMatches, [allCountries, searchTerm]); // HOW DOES THIS WORK?

  return (
    <div>
      <Search callback={handleSearchChange} />
      <Display countries={matchingCountries}/>
    </div>
  )
}

export default App;