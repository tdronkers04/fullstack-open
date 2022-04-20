import { useDispatch } from "react-redux"
import { updateFilter } from "../reducers/filterReducer"

const FilterForm = (prop) => {
  const dispatch = useDispatch()
  
  const filterSelected = (event) => {
    const content = event.target.value
    dispatch(updateFilter(content))
  }
  
  return(
    <div>
      filter: 
      <input type="text" onChange={filterSelected}></input>
    </div>
  )
}

export default FilterForm