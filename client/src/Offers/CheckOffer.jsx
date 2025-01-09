import { useEffect, useState } from "react"





function CheckOffer(){
    const [offers,setOffers] = useState([])
    let username = localStorage.getItem("username")
    document.cookie =`username=${username}; path=/; max-age=3600`; // Expires in 1 hour
    console.log(document.cookie.username)
    useEffect(() =>{
        fetch("http://localhost:3000/offer",{
            method: "GET",
            credentials: "include"
        })
        .then(response =>{
            if(!response.ok){
                throw new Error("Network response was not ok")
            }
            return response.json()
        })
        .then(data =>{
             setOffers(data)
             console.log(data)
                })
        .catch(error => console.log(`Error:${error}`))
    },[])
    

    return(
        <>
            <div>
                <h1>Your Offers:</h1>
                {}
            </div>
        </>
    )
}

export default CheckOffer