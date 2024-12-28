import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const newAnecdote = e => {
        e.preventDefault()
        const content = e.target.new.value
        dispatch(createAnecdote(content))
      }
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={newAnecdote}>
                <div>
                <input name='new'/>
                </div>
                <button>create</button>
            </form>
        </div>
    )

}


export default AnecdoteForm