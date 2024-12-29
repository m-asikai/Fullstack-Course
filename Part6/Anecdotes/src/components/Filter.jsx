import { useDispatch } from "react-redux"
import { filterAnecdotes } from "../reducers/filterReducer"

const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (e) => {
        dispatch(filterAnecdotes(e.target.value))
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter