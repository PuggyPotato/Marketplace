import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";
import Home from "../Home";




function EditListing(){

    const [productName,setProductName] = useState("")
    const [productDescription,setProductDescription] = useState("")
    const [productPrice,setProductPrice] = useState("")
    const [productImage,setProductImage] = useState("")
    
    const reader =  new FileReader;
    const navigate = useNavigate();

    const urlParams = new URLSearchParams(window.location.search);

    let productID = urlParams.get("productID")
    useEffect(() =>{
        fetch(`http://localhost:3000/myProducts/edit?productID=${productID}`,{
            method:"GET",
            credentials:"include"
        })
        .then(response =>{
            if(!response.ok){
                throw new Error("Network response was not ok")
            }
            return response.json()
        })
        .then(data =>{
            setProductName(data.productName);
            setProductDescription(data.productDescription);
            setProductPrice(data.productPrice);
            setProductImage(data.productImage)
        })
        .catch(error => console.log("Error:",error))
    },[])

    function handleSubmit(e){
        e.preventDefault();
            fetch(`http://localhost:3000/editListing?productID=${productID}`,{
                method: "PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({productName,productDescription,productPrice,productImage})
            })
            .then(response =>{
                if(!response.ok){
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data =>{
                console.log("Success:",data);
                navigate("/checkListings");
            })
            .catch(error =>{
                console.log("Error",error);
            })
        
    }

    function handleImageChange(e){
        const file = e.target.files[0];
         reader.onload = () =>{
                const file = reader.result;
                console.log(file);
                setProductImage(file);
         }
         if(file){
            reader.readAsDataURL(file);
        }
    }

    function deleteListing(e){
        e.preventDefault();
        let confirmation;
        confirmation = (window.prompt("Are You Sure You Want To Delete This Listing? (Y/N)")).toLowerCase();
        if(confirmation == "y"){
            fetch(`http://localhost:3000/deleteListing?productID=${productID}`,{
                method:"DELETE",
                credentials:"include",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({productID})
            })
            .then(response =>{
                if(!response.ok){
                    throw new Error("Network response was not ok!")
                }
                return response.json()
            })
            .then(data =>{
                alert(data)
                navigate("/checkListings")
            })
            .catch(error =>{
                console.log("Error Encountered:",error)
            });
        }
        else if(confirmation == "n"){

        }
        else{

        }
    }

    return(
        <>
            <Home/>
            <div className="absolute  top-0">
                <form onSubmit={handleSubmit} className="border-2 top-35 left-130 h-150 w-150 absolute gap-y-2 bg-cyan-500">
                    <h1 className="text-2xl text-center p-2">Edit Listing</h1>
                    <img className="text-xl ml-50 w-50 h-50" src={productImage}></img>
                    <h1 className="text-xl ml-20 ">Product Name:
                        <textarea className="ml-16.5 p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" value={productName} onChange={(e) => setProductName(e.target.value)}/>
                    </h1>
                    <h3 className="text-xl ml-20">Product Description:
                        <textarea className="ml-5 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" value={productDescription} onChange={(e) =>setProductDescription(e.target.value)}/>
                    </h3>
                    <p className="text-xl ml-20 mb-2 pt-[-10px]">Product Price:
                        <textarea className="ml-20 w-54 text-sm m-0 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" value={productPrice} onChange={(e) =>setProductPrice(e.target.value)}/>
                    </p>
                    
                    <label className="text-2xl ml-20">Change your Image:</label>
                    <input type="file" accept=".png,.jpg" onChange={handleImageChange} className=" pl-5 w-73 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600"></input><br/>
                    <button type="button" className="w-20 h-12 border-2 absolute bottom-3 left-5 bg-red-800 pb-4 rounded text-sm" onClick={deleteListing}>Delete Listing</button>
                    <button type="submit" className="w-20 h-12 border-2 absolute bottom-3 right-5 bg-green-700 pb-2 rounded text-sm">Save Changes</button>
                   
                </form>
            </div>
        </>
    )
}

export default EditListing