const Notification = ({ message, type }) => {
    const notificationStyle = {
        color: 'green',
        fontSize: 24,
        border: '3px solid green',
        borderRadius: 4,
        backgroundColor: 'lightblue',
        textAlign: 'center',
        margin: 8
    }

    const errorStyle = {
        color: 'red',
        fontSize: 24,
        border: '3px solid red',
        borderRadius: 4,
        backgroundColor: 'lightblue',
        textAlign: 'center',
        margin: 8
    }


    if (message === null){
        return null;
    }

    return (
        <div style={type === 'notification'  ? notificationStyle : errorStyle}>
            {message}
        </div>
    )
}

export default Notification;