import { useState } from "react"





function ListItem(){

    const [productName,setProductName] = useState("")
    const [productDescription,setProductDescription] = useState("")
    const [productPrice,setProductPrice] = useState("");
    const [productImage,setProductImage] = useState();
    const LIST_ITEM_API = import.meta.env.VITE_ListItem
    

    const reader = new FileReader;


    
    function handleListItem(event){
        event.preventDefault();

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
                    productImage:file})
            })
            .then(response =>{
                if(!response.ok){
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data =>{
                console.log("Success",data);
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
                    <label value={productPrice} onChange={(e) =>setProductPrice(e.target.value)}>Price:<input/>
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