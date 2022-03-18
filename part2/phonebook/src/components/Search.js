import React from 'react';

const Search = ({ callback }) => {
  return (
    <div>
        <input 
          placeholder='search contacts'
          onChange={callback}
        />
      </div>
  )
}

export default Search;