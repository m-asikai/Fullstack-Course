import { useDispatch } from 'react-redux'
import {  makeAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
    const dispatch = useDispatch()


    const newAnecdote = async (e) => {
        e.preventDefault()
        const content = e.target.new.value
        dispatch(makeAnecdote({content}))
        dispatch(setNotification(`Anecdote created: ${content}`, 3))
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