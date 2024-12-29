import { createSlice } from "@reduxjs/toolkit"

export const createFilter = input => {
    return {
        type: 'FILTER',
        payload: { 
            input
        }
    }
}

const initialState = ''



const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filterAnecdotes(state, action){
            return action.payload
        }
    }
})

export const { filterAnecdotes } = filterSlice.actions
export default filterSlice.reducer