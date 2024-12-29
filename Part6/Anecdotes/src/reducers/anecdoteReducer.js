import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdoteService"

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]


// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }
// const initialState = anecdotesAtStart.map(asObject)


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action){
      const id = action.payload.id
      return state = state.map(anecdote =>
        anecdote.id === id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      ).sort((a, b) => b.votes - a.votes)
    },
    createAnecdote(state, action){
      state.push(action.payload)
    },
    setAnecdotes(state, action){
      return action.payload.sort((a, b) => b.votes - a.votes)
    },
  }
})


export const { voteAnecdote, createAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer

export const getAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.get()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const makeAnecdote = (anecdote) => {
  return async dispatch => {
    anecdote.votes = 0
    const res = await anecdoteService.post(anecdote)
    dispatch(createAnecdote(res))
  }
}

export const voteForAnecdote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.put({
      ...anecdote,
      votes: anecdote.votes + 1
    })
    console.log(updatedAnecdote)
    dispatch(voteAnecdote(updatedAnecdote))
  }
}