import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";





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
            <div>
                <form onSubmit={handleSubmit}>
                    <h1><img src={productImage}></img></h1>
                    <h1>Product Name:
                        <textarea value={productName} onChange={(e) => setProductName(e.target.value)}/>
                    </h1>
                    <h3>Product Description:
                        <textarea value={productDescription} onChange={(e) =>setProductDescription(e.target.value)}/>
                    </h3>
                    <p>Product Price:
                        <textarea value={productPrice} onChange={(e) =>setProductPrice(e.target.value)}/>
                    </p>
                    
                    <label>Change your Image:</label>
                    <input type="file" accept=".png,.jpg" onChange={handleImageChange}></input><br/>
                    <button type="button" onClick={deleteListing}>Delete Listing</button>
                    <button type="submit">Save Changes</button>
                   
                </form>
            </div>
        </>
    )
}

export default EditListing