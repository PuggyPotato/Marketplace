




function Message({Sender,MessageFromSender}){


    return(
        <>
            <div className="flex flex-wrap">
                <p className="flex flex-wrap max-w-[30%]">{Sender}:{MessageFromSender}</p>
            </div>
        </>
    )
}

export default Message