




function Message({Sender,MessageFromSender}){


    return(
        <>
            <div className="">
                <p>{Sender}:{MessageFromSender}</p>
            </div>
        </>
    )
}

export default Message