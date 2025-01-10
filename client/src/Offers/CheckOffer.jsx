import { useEffect, useState } from "react"
import Offers from "./Offers"




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
    },[data.status])
    

    return(
        <>
            <div>
                {offers.length > 0 ?(
                    <ul>
                        {offers.map((item,key) =>{
                            return(
                                <Offers key={key}
                                        productName={item.productName}
                                        buyer={item.buyer}
                                        offerPrice={item.offerPrice}
                                        status={item.status}
                                        />
                            )
                        })}
                    </ul>
                ):(
                    <h1>There Are No Offer Available</h1>
                )}
            </div>
        </>
    )
}

export default CheckOffer