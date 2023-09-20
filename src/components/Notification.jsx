const Notification = ({ message, typeClass }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={`notification ${typeClass}`}>
            {message}
        </div>
    )
}

export default Notification