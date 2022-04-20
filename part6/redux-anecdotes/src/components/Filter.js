const FilterForm = (prop) => {
  const filterSelected = (event) => {
    const content = event.target.value
    console.log(content)
  }
  
  return(
    <div>
      filter: 
      <input type="text" onChange={filterSelected}></input>
    </div>
  )
}

export default FilterForm