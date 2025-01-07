import { useEffect, useState } from "react"





function Items({productName,productImage,productPrice}){


    return(
        <>
            <div>
                <h3>Product Name:{productName}</h3>
                <img src={productImage} style={{width:"100px",height:"100px"}} alt="image is here"></img>
                <h4>Price:{productPrice}$</h4>
                <button>Chat With Seller</button>
                <button>Make An Offer</button>
            </div>
        </>
    )
}

export default Items