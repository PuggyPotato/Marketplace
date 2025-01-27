import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Home from "../Home";





function ListItem(){

    const [productName,setProductName] = useState("")
    const [productDescription,setProductDescription] = useState("")
    const [productPrice,setProductPrice] = useState(0);
    const [productImage,setProductImage] = useState();
    const [seller,setSeller] = useState("");
    const LIST_ITEM_API = import.meta.env.VITE_ListItem;
    

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


        setSeller(seller);
        if(token){
    
        }
        else{
            alert("You need to Log In Before Listing Items!");
            navigate("/login");
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
                    body:JSON.stringify({
                        productName:productName,
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
            <Home/>
            <div className="absolute  top-0">
                <form onSubmit={handleListItem} className="border-2 top-35 left-112 h-120 w-200 absolute gap-y-2 bg-cyan-500">
                    <h1 className="text-3xl text-center p-2">List Item</h1>
                    <label className="text-2xl ml-20">Product Name:
                        <input value={productName} onChange={(e) => setProductName(e.target.value)} className="ml-5 m-5 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                    </label><br></br>
                    <label className="text-2xl ml-20">Description:
                        <input value={productDescription} onChange={(e) => setProductDescription(e.target.value)} className="ml-12.5 p-2  m-5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                    </label><br></br>
                    <label className="text-2xl ml-20">Price{"($)"}:
                        <input  value={productPrice} onChange={(e) =>setProductPrice(e.target.value)} type="number" className="ml-23.5 p-2  m-5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                    </label><br></br>
                    <label className="text-2xl ml-20">Add An Image:
                        <input type="file" accept="image/png,image/jpg" onChange={(e) =>setProductImage(e.target.files[0])} className="ml-5 w-73 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600"/>
                    </label>
                    <button type="submit" className="bg-green-500 text-white ml-32 mt-8 px-4 py-2 rounded-lg hover:bg-blue-600 transition hover:cursor-pointer absolute right-3 bottom-4">List Item</button>
                    
                </form>
            </div>
        </>
    )
}

export default ListItem