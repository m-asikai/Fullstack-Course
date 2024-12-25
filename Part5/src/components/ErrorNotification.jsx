const ErrorNotification = ({ message }) => {
    if (!message){
        return null;
    }

    const style = {
        color: 'red',
        fontSize: 24,
        border: '3px solid red',
        borderRadius: 4,
        backgroundColor: 'lightblue',
        textAlign: 'center',
        margin: 'auto',
        marginTop: 8,
        width: 'fit-content',
        padding: 8,
    }
    return (
        <p style={style}> {message} </p>
    )
}

export default ErrorNotification;