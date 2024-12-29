import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if (state.filter){
            return state.anecdotes.filter(
                anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
            )
        }
        return state.anecdotes
    })
    const dispatch = useDispatch()
  
    const vote = (id, content, votes) => {
      dispatch(voteForAnecdote({
        id,
        content,
        votes
      }))
      dispatch(setNotification(`Voted for: ${content}`, 3))
    }

    return (
        anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                {anecdote.content}
                </div>
                <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id, anecdote.content, anecdote.votes)}>vote</button>
                </div>
            </div>
            )
    )

}

export default AnecdoteList