import { useEffect, useState } from "react"
import MessageBar from "./MessageBar"




function CheckMessages(){

    const [messages,setMessages] = useState([])
    const [isBuyer,setIsBuyer] = useState(false)
    const messageAPI = import.meta.env.VITE_checkMessage;

    const username = document.cookie
        .split('; ')
        .find(row => row.startsWith('username='))
        ?.split('=')[1];
    
    
    useEffect(() =>{


        fetch(messageAPI,{
            method:"GET",
            credentials: "include"
        })
        .then(response =>{
            if(!response.ok){
                throw new Error("Network response was not ok")
            }
            return response.json();
        })
        .then(data => {
            setMessages(data)
            console.log(data)})
        .catch(error =>console.log(error))


    },[])

    return(
        <>
            <div>
                {
                    messages.length > 0 ? (
                        messages.map((item,key) =>(
                           <MessageBar  OtherPerson={username == item.buyer ? item.seller : item.buyer}
                                        isBuyer={username == item.buyer}
                                        key={key}/>
                        ))
                    ): 
                    (
                        <h1>You Dont Have Any Messages</h1>
                    )
                    
                }
                
            </div>
        </>
    )
}

export default CheckMessages