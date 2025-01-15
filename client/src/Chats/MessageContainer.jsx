import { useEffect, useRef, useState } from "react"
import {io} from "socket.io-client"
import {useNavigate} from "react-router-dom"
import Message from "./Message"




function MessageContainer(){

    const [message,setMessage] = useState("")
    const [prevMessage,setPrevMessage] = useState("")
    
    const navigate = useNavigate();

    const socket = useRef(null);
    const buyer = document.cookie
        .split('; ')
        .find(row => row.startsWith('username='))
        ?.split('=')[1];
    
    const urlParams = new URLSearchParams(window.location.search);
    const seller = urlParams.get("seller");
    

    useEffect(() =>{
        if(buyer){
            socket.current = io("http://localhost:3000");
            socket.current.on("newMessage", (newMessage) =>{
                setPrevMessage((prev) => [...prev,newMessage])
            })
        }
        else{
            alert("You Need To Be Logged In!")
            navigate("/login")
        }

        return() =>{
            socket.current.disconnect();
        }
    },[])

    //Fetch previous message from db
    useEffect(() =>{
        fetch(`http://localhost:3000/prevMessage?seller=${seller}`, {
            method:"GET",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(response =>{
            if(!response.ok){
                throw new Error("Network Response was not ok")
            }
            return response.json();
        })
        .then(message => {
            const sortedMessage = message.sort(
                (a,b) => new Date(a.timestamp) - new Date(b.timestamp)
            ); 
            console.log(sortedMessage)
            setPrevMessage(sortedMessage)
            })
        .catch(error => console.log("Error Encountered:",error))
    },[])


    function sendMessage(event){
        event.preventDefault();
        if(message == ""){

        }
        else{
            console.log("test")
            socket.current.emit("messageDetails",({buyer,seller,message}))
            setPrevMessage([...prevMessage,{buyer:buyer,content:message}])
            console.log(prevMessage)
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
                    <div>
                        {!prevMessage.length > 0 ? (
                            <></>
                        ):
                        (<ul>
                            {prevMessage.map((item,key) =>(
                                <Message MessageFromBuyer={item.content} key={key} Buyer={item.buyer}/>
                            ))}
                            </ul>
                        )}
                    </div>
                </div>
            </>
        )
}

export default MessageContainer