import { useState,useEffect } from "react"
import OffersForBuyer from "./OffersForBuyer"






function OffersList(){

    const [offers,setOffers] = useState("")

    useEffect(() =>{
            fetch("http://localhost:3000/offer/buyer",{
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
            {offers.length > 0 ?(
                    <ul>
                        {offers.map((item,key) =>{
                            return(
                                <OffersForBuyer key={key}
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

export default OffersList