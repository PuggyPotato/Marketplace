import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";





function OwnListings({productName,productImage,productPrice,productDescription,productID,seller}){

    const navigate = useNavigate();

    return(
        <>
            <div className="border-2 w-60 h-90 p-2">
                <h3 className="text-xl">{productName}</h3>
                <img src={productImage} style={{width:"100px",height:"100px"}} alt="image is here"></img>
                <h4 className="text-xl">Price:{productPrice}$</h4>
                <h3 className="text-xl">{productDescription}</h3>
                <button onClick={() =>navigate(`/editlisting?productID=${productID}`)} className="border-2 bg-red-600 relative top-25 left-2  rounded h-10 w-50">Edit/Delete Listing</button>
            </div>
        </>
    )
}

export default OwnListings