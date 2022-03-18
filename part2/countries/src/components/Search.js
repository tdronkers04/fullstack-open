import React from 'react';

const Search = ({ callback }) => {
  return (
    <div>
        <input 
          placeholder='search countries'
          onChange={callback}
        />
      </div>
  )
}

export default Search;