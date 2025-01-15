import { useEffect, useRef, useState } from "react"
import {io} from "socket.io-client"
import {useNavigate} from "react-router-dom"
import Message from "./Message"




function MessageContainer(){

    const [message,setMessage] = useState("")
    const [prevMessage,setPrevMessage] = useState("")
    
    const navigate = useNavigate();

    const socket = useRef(null);
    
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.get("seller")){
        var seller = urlParams.get("seller");
    }
    else{
        var seller = document.cookie
        .split('; ')
            .find(row => row.startsWith('username='))
            ?.split('=')[1];

    };
    if(urlParams.get("buyer")){
        var buyer = urlParams.get("buyer")
    }
    else{
        var buyer = document.cookie
            .split('; ')
            .find(row => row.startsWith('username='))
            ?.split('=')[1];
    }

    useEffect(() =>{
    
        if(buyer){
            socket.current = io("http://localhost:3000");
            socket.current.on("newMessage", (newMessage) =>{
                setPrevMessage((prev) => [...prev,newMessage])
                console.log(newMessage)
            })
        }
        else{
            alert("You Need To Be Logged In!")
            navigate("/login")
        }

        return() =>{
            socket.current.disconnect();
        }
    },[prevMessage])

    //Fetch previous message from db
    useEffect(() =>{
        //Sending Seller As Query if User is Buyer
        if(seller){
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
        }

        //Sending buyer As Query If User is Seller
        else if(buyer){
            fetch(`http://localhost:3000/prevMessage?buyer=${buyer}`, {
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
            
        }
    },[])


    function sendMessage(event){
        event.preventDefault();
        if(message == ""){

        }
        else{
            socket.current.emit("messageDetails",({buyer,seller,message}))
            setPrevMessage([...prevMessage,{buyer:buyer,seller:seller,content:message}])
            console.log(buyer,seller,message)
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
                                <Message MessageFromBuyer={item.content} key={key} Buyer={item.buyer} Seller={item.seller}/>
                            ))}
                            </ul>
                        )}
                    </div>
                </div>
            </>
        )
}

export default MessageContainer