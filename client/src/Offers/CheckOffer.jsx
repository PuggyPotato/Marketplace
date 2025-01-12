import { useEffect, useState } from "react"
import OffersForSeller from "./OffersForSeller"




function CheckOffer(){
    const [offers,setOffers] = useState([])
    const OfferSellerAPI = import.meta.env.VITE_OfferSellerAPI;

    useEffect(() =>{
        fetch(OfferSellerAPI,{
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
    

    const updateStatus = (productID, newStatus) => {
        console.log(productID)
        setOffers((prevOffers) =>
            prevOffers.map((offer) =>
                offer._id === productID
                    ? { ...offer, status: newStatus } // Update the status of the offer
                    : offer
            )
        );
    };

    return(
        <>
            <div>
                {offers.length > 0 ?(
                    <ul>
                        {offers.map((item,key) =>{
                            return(
                                <OffersForSeller key={key}
                                        productName={item.productName}
                                        buyer={item.buyer}
                                        offerPrice={item.offerPrice}
                                        status={item.status}
                                        productID={item._id}
                                        updateStatus={updateStatus}
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