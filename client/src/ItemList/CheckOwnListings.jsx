import { useEffect, useState } from "react"
import OwnListingsEditable from "./OwnListings"





function CheckOwnListing(){
    const [product,setProduct] = useState([])
    const [userThatListedProduct,setUserThatListedProduct] = useState("")
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
            <div>
              {
                product.length > 0 ? (
                    <ul>
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