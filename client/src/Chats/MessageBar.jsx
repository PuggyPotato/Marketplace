import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"



function MessageBar({OtherPerson,isBuyer}){

    const navigate = useNavigate()
    const [navigationLink,setNavigationLink] = useState("")
    const username = document.cookie
        .split('; ')
        .find(row => row.startsWith('username='))
        ?.split('=')[1];
    useEffect(() =>{
        if(isBuyer == true){
            setNavigationLink(`/message?seller=${OtherPerson}`)
        }
        else if(isBuyer ==false){
            setNavigationLink(`/message?buyer=${OtherPerson}`);
        }
    },[])

    return(
        <>
            <div>
                <button onClick={() => navigate(navigationLink)}>Your message with {OtherPerson} as {isBuyer ? "Buyer" : "Seller" }</button>
            </div>
        </>
    )
}

export default MessageBar