import { useEffect, useState } from "react"




function OffersForBuyer({productName,buyer,offerPrice,status,updateStatus}){

    return(
        <>
            <div>
                <h2>Product Name:{productName}</h2>
                <h3>Interested Buyer:{buyer}</h3>
                <h3>Your Offer:{offerPrice}</h3>
                <p>Offer Status:{status}</p>
           
                
            </div>
        </>
    )
}

export default OffersForBuyer