import Items from "./Items"
import { useEffect, useState } from "react"






function Marketplace(){
    const [product,setProduct] = useState([])
    const [userThatListedProduct,setUserThatListedProduct] = useState("")
    const productAPI = import.meta.env.VITE_products;

    useEffect(() =>{
        
        fetch(productAPI,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(response =>{
            if(!response.ok){
                throw new Error("Network response was not ok")
            }
            return response.json();
        })
        .then((data) =>{
            console.log("Success: ",data)
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
                          <Items key={key}
                                    productName = {item.productName}
                                    productPrice = {item.productPrice}
                                    productImage = {item.productImage}
                                    seller = {item.seller}
                                    productID={item._id}
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

export default Marketplace