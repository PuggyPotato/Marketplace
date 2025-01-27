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
                <label className="text-gray-700 font-bold text-xl mb-1">Filter:</label>
                    <input onChange={(e) =>setFilterName(e.target.value)} value={filterName} className="w-50 my-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                <button onClick={searchWithFilter} className="bg-blue-500 text-white ml-5 px-2 py-1 w-30 rounded-lg hover:bg-blue-600 transition hover:cursor-pointer">Search</button>
              {
                product.length > 0 ? (
                    <ul className="grid grid-cols-6 gap-65">
                        {product.map((item,key) =>{
                          return( 
                          <Items  className="" key={key}
                                    productName = {item.productName}
                                    productPrice = {item.productPrice}
                                    productImage = {item.productImage}
                                    productDescription = {item.productDescription}
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