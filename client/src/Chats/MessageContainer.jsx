import { useEffect, useRef, useState } from "react"
import {io} from "socket.io-client"




function MessageContainer(){

    const [message,setMessage] = useState("")

    const socket = useRef(null);
    const buyer = document.cookie
        .split('; ')
        .find(row => row.startsWith('username='))
        ?.split('=')[1];
    
    const urlParams = new URLSearchParams(window.location.search);
    const seller = urlParams.get("seller");
    

    useEffect(() =>{
        socket.current = io("http://localhost:3000");
    },[])


    function sendMessage(event){
        event.preventDefault();
        if(message == ""){

        }
        else{
            socket.current.emit("messageDetails",({buyer,seller,message}))
        }
    }


    return(
        <>
            <div>
                <form onSubmit={sendMessage}>
                    <label>Enter Message Here:
                        <input value={message} onChange={(e) =>setMessage(e.target.value)}/>
                    </label>
                        <button type="submit">Send Message</button>
                </form>
            </div>
        </>
    )
}

export default MessageContainer