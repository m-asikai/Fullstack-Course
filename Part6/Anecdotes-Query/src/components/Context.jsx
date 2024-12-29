/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from '../requests'

const voteReducer = (state, action) => {
    const id = action.payload
    switch (action.type) {
        case 'INIT':
            return action.payload.sort((a, b) => b.votes - a.votes)
        default:
            console.log(state, action)
            return state.map(anecdote =>
                anecdote.id === id
                    ? { ...anecdote, votes: anecdote.votes + 1 }
                    : anecdote
            ).sort((a, b) => b.votes - a.votes)
    }
}

const Context = createContext()

export const useVoteValue = () => {
    return useContext(Context)[0]
}

export const useVoteDispatch = () => {
    return useContext(Context)[1]
}

export const ContextProvider = (props) => {
    const { data, isLoading } = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAnecdotes
    })

    const [votes, votesDispatch] = useReducer(voteReducer, [])

    useEffect(() => {
        if (data) {
            votesDispatch({ type: 'INIT', payload: data })
        }
    }, [data])

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <Context.Provider value={[votes, votesDispatch]}>
            {props.children}
        </Context.Provider>
    )
}

export default Context