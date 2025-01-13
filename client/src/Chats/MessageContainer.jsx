import { useEffect, useRef } from "react"
import {io} from "socket.io-client"




function MessageContainer(){

    const socket = useRef(null);

    useEffect(() =>{
        socket.current = io("http://localhost:3000");
        socket.current.on("initialConnection",(message) =>console.log(message))
    },[])


    return(
        <>
            <div>
                <label>Enter Message Here:<input/></label><button>Send Message</button>
            </div>
        </>
    )
}

export default MessageContainer