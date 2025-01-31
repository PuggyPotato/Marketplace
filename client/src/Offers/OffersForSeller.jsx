import { useEffect, useState } from "react"




function OffersForSeller({productName,buyer,offerPrice,status,updateStatus,productID}){
    const [offerStatus,setOfferStatus] = useState(status);
    
    const updateOfferStateAPI = import.meta.env.VITE_UpdateOfferStateAPI;

 

    function acceptOffer(){
        const currentStatus = "Offer Accepted"
        updateStatus(productID,currentStatus);
        console.log(status)
        setOfferStatus(currentStatus)
        fetch(updateOfferStateAPI, {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({productID,currentStatus})
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
        updateStatus(productID,currentStatus);
        console.log(offerStatus)
        setOfferStatus(currentStatus)
        fetch(updateOfferStateAPI, {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({productID,currentStatus})
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
            <div className="w-80 h-80 border-2 p-5">
                <h2 className="text-2xl p-3">Product Name:{productName}</h2>
                <h3 className="text-2xl p-3">Interested Buyer:{buyer}</h3>
                <h3 className="text-2xl p-3">Their Offer:{offerPrice}</h3>
                {status == "Offer Accepted" ? (
                    <p className="bg-green-600 p-3 rounded">Offer Status:{status}</p>): 
                    status =="pending" ? (<p className="bg-yellow-600 p-3 rounded">Offer Status:{status}</p>):
                    <p className="bg-red-600 p-3 rounded">Offer Status:{status}</p>}
                {status !== "pending" ? (
                    <>

                    </>
                ):(
                    <>
                        <button onClick={rejectOffer} type="button" className="border-2 absolute relative top-35 left-4  rounded-lg hover:bg-red-600 transition hover:cursor-pointer bg-red-500 p-1">Reject Offer</button>
                        <button onClick={acceptOffer} type="button" className="border-2 absolute relative top-35 left-16 rounded-lg hover:bg-blue-600 transition hover:cursor-pointer bg-blue-500 p-1">Accept Offer</button>
                        
                    </>
                )}
                
                
            </div>
        </>
    )
}

export default OffersForSeller