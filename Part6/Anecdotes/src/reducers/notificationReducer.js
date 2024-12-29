import { createSlice } from "@reduxjs/toolkit";


const initialState = null

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNot(state, action){
            return state = action.payload
        },
        clearNotification(state, action){
            return state = action.payload
        }
    }
})

export const { setNot, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer

export const setNotification = (message, time) => {
    return dispatch => {
        dispatch(setNot(message))
        setTimeout(() => {
            dispatch(clearNotification(null))
        }, time * 1000)
    }
}