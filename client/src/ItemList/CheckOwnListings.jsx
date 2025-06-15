import { useEffect, useState } from "react"
import OwnListingsEditable from "./OwnListings"
import Home from "../Home"





function CheckOwnListing(){
    const [product,setProduct] = useState([])
    const myProductsAPI = import.meta.env.VITE_myProducts;

    useEffect(() =>{
        
        fetch(myProductsAPI,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
        })
        .then(response =>{
            if(!response.ok){
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) =>{
            console.log("Success: ",data);
            setProduct(data);
        })
        .catch(error =>{
            console.log("Error:",error);
        })

      
    },[])



    return(
        <>
            <Home/>
            <div className="absolute top-20 left-40">
              {
                product.length > 0 ? (
                    <ul className="grid grid-cols-5 grid-rows-10 gap-x-8 gap-y-2">
                        {product.map((item,key) =>{
                          return( 
                          <OwnListingsEditable key={key}
                                    productName = {item.productName}
                                    productPrice = {item.productPrice}
                                    productImage = {item.productImage}
                                    productDescription = {item.productDescription}
                                    productID={item._id}
                                    seller={item.seller}
                                     /> )
                        })}
                    </ul>
                )
                :(
                    <h1>No Item Available</h1>
                )
              }
            </div>
        </>
    )
}

export default CheckOwnListing