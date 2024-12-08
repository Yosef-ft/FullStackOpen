const ErrorNotification = ({message}) =>{

    if (message === null) {
        return null
      }

    const errorNotificationStyle ={
        color: 'red',
        backgroundColor: 'lightgray',
        borderColor: 'red', 
        borderStyle: 'solid',
        borderRadius: 5
    } 
    
    return(
        <div style={errorNotificationStyle}>
            {message}
        </div>
    )    
}

export default ErrorNotification;