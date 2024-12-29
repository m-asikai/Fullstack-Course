export const voteReducer = (state, action) => {
    const id = action
    console.log(state, action)
    return state = state.map(anecdote =>
        anecdote.id === id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      ).sort((a, b) => b.votes - a.votes)
}