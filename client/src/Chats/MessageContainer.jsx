import { useEffect, useRef, useState } from "react"
import {io} from "socket.io-client"
import {data, useFetcher, useNavigate} from "react-router-dom"
import Message from "./Message"




function MessageContainer(){

    const [message,setMessage] = useState("")
    const [prevMessage,setPrevMessage] = useState("")
    const [otherOnline,setOtherOnline] = useState("")
    
    const navigate = useNavigate();
    const PORT = import.meta.env.VITE_PORT;

    const socket = useRef(null);
    
    const urlParams = new URLSearchParams(window.location.search);
    const sender = document.cookie
        .split('; ')
            .find(row => row.startsWith('username='))
            ?.split('=')[1];
            
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
        const otherPerson = urlParams.get("seller") || urlParams.get("buyer")
        fetch(`http://localhost:3000/checkOtherOnline?otherPerson=${otherPerson}`,{
            method:"GET",
            credentials:"include"
        })
        .then(response =>{
            if(!response.ok){
                throw new Error("Network response was not ok")
            }
            return response.json();
        })
        .then(data =>{
             if(data == ""){
                setOtherOnline(false);
             }
             else if(data != ""){
                setOtherOnline(true);
             }
             console.log("data is",data)
            })
            
        .catch(error => console.log(error))
    },[])

    useEffect(() =>{
        
        if(sender){
            socket.current = io(PORT);
            console.log(PORT)
            console.log("socket initialised")
            socket.current.emit("userOnline",sender)
            socket.current.on("newMessage", (newMessage) =>{
                console.log("i received message")

                setPrevMessage((prev) => [...prev,newMessage])
                console.log(newMessage)
            })

        }
        else{
            alert("You Need To Be Logged In!")
            navigate("/login")
        }

        return() =>{
            socket.current.disconnect("");
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
            console.log("sorted",sortedMessage)
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
            socket.current.emit("messageDetails",({buyer,seller,message,sender}))
            setPrevMessage([...prevMessage,{buyer:buyer,seller:seller,content:message,sender:sender}])
            console.log(buyer,seller,message,sender)
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
                        {otherOnline ? (<h1>User Is Online</h1>) :(<h1>User Is Offline</h1>) }
                    
                        {!prevMessage.length > 0 ? (
                            <></>
                        ):
                        (<ul>
                            {prevMessage.map((item,key) =>(
                                <Message Sender={item.sender} MessageFromSender={item.content} key={key}/>
                            ))}
                            </ul>
                        )}
                    </div>
                </div>
                
            </>
        )
}

export default MessageContainer