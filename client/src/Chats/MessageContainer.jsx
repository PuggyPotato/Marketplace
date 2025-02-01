import { useEffect, useRef, useState } from "react"
import {io} from "socket.io-client"
import {data, useFetcher, useNavigate} from "react-router-dom"
import Message from "./Message"
import Home from "../Home"
import CheckMessages from "./CheckMessages"




function MessageContainer(){

    const [message,setMessage] = useState("")
    const [prevMessage,setPrevMessage] = useState("")
    const [otherOnline,setOtherOnline] = useState("")

  // Create a ref for the message container
  const messagesEndRef = useRef(null);

  // Function to scroll to bottom
  const scrollToBottom = () => {
    const messageContainer = document.querySelector('.message-container'); // Add this class to your container
    if (messageContainer) {
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }
};

  // Auto scroll when messages change or component mounts
  useEffect(() => {
      scrollToBottom();
  }, [prevMessage]); // Will trigger when messages update
    
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
        document.body.classList.add("overflow-hidden")
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
            document.body.classList.remove("overflow-hidden")
            socket.current.disconnect("");
        }
    },[prevMessage])

    //Fetch previous message from db
    useEffect(() =>{
        
        //Sending Seller As Query if User is Buyer
        if(seller != sender){
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
        else if(buyer != sender){
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
                console.log("sortedhere",sortedMessage)
                setPrevMessage(sortedMessage)
                })
            .catch(error => console.log("Error Encountered:",error))
            
        }
        
    },[buyer,seller])


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
                <CheckMessages/>
                <div className="absolute top-15 left-90">
                    <form onSubmit={sendMessage} className="">
                        
                            <textarea value={message} className="absolute bottom-[-80px] border-2 h-15  w-275 p-3 pt-1 rounded-full overflow-hidden scrollbar-hidden" onChange={(e) =>setMessage(e.target.value)}/>
                            <button type="submit" className="absolute bottom-[-50px] right-10 rounded-full w-5 h-5 border-2" >t</button>
                        
                            
                    </form>
                    <div className=" overflow-hidden overflow-y-scroll overflow-y-auto max-h-135 max-w-[1175px] w-[1175px] mt-2 message-container">
                        {otherOnline ? (<h1>User Is Online</h1>) :(<h1>User Is Offline</h1>) }
                    
                        {!prevMessage.length > 0 ? (
                            <></>
                        ):
                        (<ul className="">
                            {prevMessage.map((item,key) =>(
                                
                                <div key={key} className={`flex ${
                                    item.sender === sender ? "justify-end mr-2" : "justify-start"
                                }`}>

                                <div className={`p-3 rounded-lg max-w-[300px]  my-2 ${
                                    item.sender === sender ? "bg-blue-400 text-white  " : "bg-yellow-600 text-black"
                    
                                }`}>
                                <Message Sender={item.sender} MessageFromSender={item.content} key={key}
                                
                            /></div></div>
                            ))}
                            </ul>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    
                </div>
                
            </>
        )
}

export default MessageContainer