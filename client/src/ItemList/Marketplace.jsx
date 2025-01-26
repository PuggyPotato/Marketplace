import Items from "./Items"
import { useEffect, useState } from "react"






function Marketplace(){
    const [product,setProduct] = useState([])
    const [userThatListedProduct,setUserThatListedProduct] = useState("")
    const [filterName,setFilterName] = useState("")
    const productAPI = import.meta.env.VITE_products;

    useEffect(() =>{
        
        fetch(productAPI,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include"
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

    const searchWithFilter = () =>{
        fetch(`http://localhost:3000/products?filterName=${filterName}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include"
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
    }



    return(
        <>
            <div>
                <label>Filter:</label><input onChange={(e) =>setFilterName(e.target.value)} value={filterName}/><button onClick={searchWithFilter}>Search</button>
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