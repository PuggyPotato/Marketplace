import Items from "./Items"
import { useEffect, useState } from "react"
import Home from "../Home"






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

    const searchWithFilter = (e) =>{
        e.preventDefault();
        fetch(`http://localhost:3000/filterProducts?filterName=${filterName}`,{
            method:"POST",
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
            <Home/>
            <div className="absolute  top-20 left-40">
                <label>Filter:</label><input onChange={(e) =>setFilterName(e.target.value)} value={filterName}/><button onClick={searchWithFilter}>Search</button>
              {
                product.length > 0 ? (
                    <ul className="grid grid-cols-6 gap-50">
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