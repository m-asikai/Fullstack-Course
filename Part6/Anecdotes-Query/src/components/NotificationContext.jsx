/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react"

const notificationReduce = (state, action) => {
    switch (action.type){
        case 'VOTE':
            state = `Voted for: ${action.payload}`
            return state
        case 'ADD':
            state = `Anecdote added: ${action.payload}`
            return state
        case 'ERROR':
            state = 'Anecdote must be at least 5 characters long.'
            return state
        case 'RESET':
            return null
        default:
            return state
    }
}


const NotificationContext = createContext()

export const useNotificationValue = () => {
    return useContext(NotificationContext)[0]
}

export const useNotificationDispatch = () => {
    return useContext(NotificationContext)[1]
}


export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReduce, null)

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext