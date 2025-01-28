import { useEffect, useState } from "react"
import MessageBar from "./MessageBar"
import Home from "../Home"



function CheckMessages(){

    const [messages,setMessages] = useState([])
    const [isBuyer,setIsBuyer] = useState(false)
    const messageAPI = import.meta.env.VITE_checkMessage;
    const [otherOnline,setOtherOnline] = useState("")

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
        console.log(otherPerson)
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

    return(
        <>
            <Home/>
            <div className="absolute top-15 left-35">
                <div className="border-2 ml-50  h-[870px] absolute "></div>

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