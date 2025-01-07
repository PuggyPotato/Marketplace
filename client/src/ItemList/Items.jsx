import { useEffect, useState } from "react"





function Items({productName,productImage,productPrice,seller}){

    

    return(
        <>
            <div>
                <h3>Product Name:{productName}</h3>
                <img src={productImage} style={{width:"100px",height:"100px"}} alt="image is here"></img>
                <h4>Price:{productPrice}$</h4>
                <h5>Sold by {seller}</h5>
                <button>Chat With Seller</button>
                <button>Make An Offer</button>
            </div>
        </>
    )
}

export default Items