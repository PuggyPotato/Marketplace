import { useEffect, useState } from "react"




function Offers({productName,buyer,offerPrice,status}){
    const [offerStatus,setOfferStatus] = useState(status);

 
    useEffect(() => {
       
    }, [offerStatus]);

    function acceptOffer(){
        const currentStatus = "Offer Accepted"
        setOfferStatus(currentStatus)
        fetch("http://localhost:3000/updateOfferState", {
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
        console.log(offerStatus)
    }

    function rejectOffer(){

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
                        <button onClick={acceptOffer}>Accept Offer</button>
                        <button onClick={rejectOffer}>Reject Offer</button>
                    </>
                )}
                
            </div>
        </>
    )
}

export default Offers