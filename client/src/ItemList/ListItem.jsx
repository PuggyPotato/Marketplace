import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";





function ListItem(){

    const [productName,setProductName] = useState("")
    const [productDescription,setProductDescription] = useState("")
    const [productPrice,setProductPrice] = useState(0);
    const [productImage,setProductImage] = useState();
    const [seller,setSeller] = useState("")
    const LIST_ITEM_API = import.meta.env.VITE_ListItem
    

    const reader = new FileReader;
    const navigate = useNavigate();

    useEffect(() =>{
        const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];

        const seller = document.cookie
        .split("; ")
        .find(row => row.startsWith("username="))
        ?.split("=")[1]


        setSeller(seller)
        if(token){
    
        }
        else{
            alert("You need to Log In Before Listing Items!")
            navigate("/login")
        }
    },[])

    
    function handleListItem(event){
        event.preventDefault();
        if(productName == "" || productDescription == "" || productPrice == "" || productImage == ""){
            alert("Please Enter Valid Details")
        }
        else{
            reader.onload = () =>{
                const file = reader.result;
                console.log(file)

                fetch(LIST_ITEM_API,{
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body:JSON.stringify({productName:productName,
                        productDescription:productDescription,
                        productPrice:productPrice,
                        productImage:file,
                        seller:seller})
                })
                .then(response =>{
                    if(!response.ok){
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then(data =>{
                    console.log("Success",data);
                    window.alert("Product Is Saved!")
                    navigate("/")
                    
                    
                })
                .catch(error =>{
                    console.log("error",error.message)
                })
            }
            if(productImage){
                console.log(productImage)
                reader.readAsDataURL(productImage);
            }
            else{
                console.log("Image is not defined or invalid");
                alert("please provide a real image")
            }
        }
    }

    return(
        <>
            <div>
                <form onSubmit={handleListItem}>
                    <h1>List Item</h1>
                    <label>Product Name:
                        <input value={productName} onChange={(e) => setProductName(e.target.value)}/>
                    </label>
                    <label>Description:
                        <input value={productDescription} onChange={(e) => setProductDescription(e.target.value)}/>
                    </label>
                    <label>Price:
                        <input  value={productPrice} onChange={(e) =>setProductPrice(e.target.value)} type="number"/>
                    </label>
                    <label>Add An Image:
                        <input type="file" accept="image/png,image/jpg" onChange={(e) =>setProductImage(e.target.files[0])}/>
                    </label>
                    <button type="submit">List Item</button>
                    
                </form>
            </div>
        </>
    )
}

export default ListItem