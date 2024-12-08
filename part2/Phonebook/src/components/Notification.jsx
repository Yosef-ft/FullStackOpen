const Notification = ({message}) => {

    if (message === null) {
        return null
      }

    const notificationStyle ={
        color: 'green',
        backgroundColor: 'lightgray',
        borderColor: 'green', 
        borderStyle: 'solid',
        borderRadius: 5
    }



    return(
        <div style={notificationStyle}>
            {message}
        </div>
    )
}



export default Notification;