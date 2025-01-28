import { useEffect, useState } from "react"
import OffersForSeller from "./OffersForSeller"
import Home from "../Home";




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
            <Home/>
            <div className="absolute top-20 left-40">
                <h1 className="text-center text-4xl font-mono ">Offers</h1>
                {offers.length > 0 ? (
                    <ul className="text-xl grid grid-cols-4 grid-row-10 gap-x-5 gap-y-5">
                        {offers.map((item, key) => (
                            <li
                                key={key}
                                className=""
                            >
                                <OffersForSeller className
                                    productName={item.productName}
                                    buyer={item.buyer}
                                    offerPrice={item.offerPrice}
                                    status={item.status}
                                    productID={item._id}
                                    updateStatus={updateStatus}
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <h1 className="text-center text-purple-800 text-3xl font-bold py-12 animate-pulse">
                        🌟 No Offers Available Yet
                    </h1>
                )}
            </div>
        </>
    )
}

export default CheckOffer