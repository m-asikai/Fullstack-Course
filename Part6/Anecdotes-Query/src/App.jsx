import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, vote } from './requests'
import { useNotificationDispatch } from './components/NotificationContext'

const App = () => {

  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const updateMut = useMutation({
    mutationFn: vote,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['anecdotes']})
    }
  })

  const handleVote = (anecdote) => {
    updateMut.mutate({
      ...anecdote,
      votes: anecdote.votes + 1
    })
    dispatch({
      type: 'VOTE',
      payload: anecdote.content
    })
    setTimeout(() => {
      dispatch({
        type: 'RESET'
      })
    }, 5000)
  }

  const res = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })

  if (res.isLoading){
    return <div>Loading...</div>
  }

  if (res.isError){
    return <div>An error has occured.</div>
  }

  const anecdotes = res.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
