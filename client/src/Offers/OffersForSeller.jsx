import { useEffect, useState } from "react"




function OffersForSeller({productName,buyer,offerPrice,status,updateStatus}){
    const [offerStatus,setOfferStatus] = useState(status);
    
    const updateOfferStateAPI = import.meta.env.VITE_UpdateOfferStateAPI;

 

    function acceptOffer(){
        const currentStatus = "Offer Accepted"
        updateStatus(productName,currentStatus);
        console.log(status)
        setOfferStatus(currentStatus)
        fetch(updateOfferStateAPI, {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({productName,currentStatus})
        })
        .then(response =>{
            if(!response.ok){
                throw new Error("Network Response Was Not OK")
            }
            return response.json();
        })
        .then(data =>{
            alert("Data succesfully saved:",data)
            console.log('Data returned:', data); // Add this log
        })
        .catch(error => console.log("Error:",error))
    }

    function rejectOffer(){
        const currentStatus = "Offer Rejected"
        updateStatus(productName,currentStatus);
        console.log(offerStatus)
        setOfferStatus(currentStatus)
        fetch(updateOfferStateAPI, {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({productName,currentStatus})
        })
        .then(response =>{
            if(!response.ok){
                throw new Error("Network Response Was Not OK")
            }
            return response.json();
        })
        .then(data =>{
            alert("Data succesfully saved:",data)
            console.log('Data returned:', data); // Add this log
        })
        .catch(error => console.log("Error:",error))
    }


    return(
        <>
            <div>
                <h2>Product Name:{productName}</h2>
                <h3>Interested Buyer:{buyer}</h3>
                <h3>Their Offer:{offerPrice}</h3>
                <p>Offer Status:{status}</p>
                {status !== "pending" ? (
                    <>

                    </>
                ):(
                    <>
                        <button onClick={rejectOffer} type="button">Reject Offer</button>
                        <button onClick={acceptOffer} type="button">Accept Offer</button>
                        
                    </>
                )}
                
            </div>
        </>
    )
}

export default OffersForSeller