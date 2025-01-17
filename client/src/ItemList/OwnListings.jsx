import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";





function OwnListings({productName,productImage,productPrice,productDescription,productID,seller}){

    const navigate = useNavigate();

    return(
        <>
            <div>
                <h3>Product Name:{productName}</h3>
                <h3>Product Description:{productDescription}</h3>
                <img src={productImage} style={{width:"100px",height:"100px"}} alt="image is here"></img>
                <h4>Price:{productPrice}$</h4>
                <p>Seller:{seller}</p>
                <button onClick={() =>navigate(`/editlisting?productID=${productID}`)}>Edit</button>
            </div>
        </>
    )
}

export default OwnListings