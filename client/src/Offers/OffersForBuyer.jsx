import { useEffect, useState } from "react"




function OffersForBuyer({productName,buyer,offerPrice,status}){

    return(
        <>
            <div className="w-80 h-80 border-2 p-5">
                <h2 className="text-2xl p-3">Product Name:{productName}</h2>
                <h3 className="text-2xl p-3">Interested Buyer:{buyer}</h3>
                <h3 className="text-2xl p-3">Your Offer:{offerPrice}$</h3>
                {
                    status == "pending" ? (
                        <p className="bg-yellow-600 p-3 rounded">Offer Status: {status}</p>
                    ) :
                    status == "Offer Accepted" ? (
                        <p className="bg-green-600 p-3 rounded">Offer Status: {status}</p>
                    ) :
                    <p className="bg-red-600 p-3 rounded">Offer Status: {status}</p>
                }
            </div>
        </>
    )
}

export default OffersForBuyer