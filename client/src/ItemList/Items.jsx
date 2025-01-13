import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";





function Items({productName,productImage,productPrice,seller,productID}){
    const navigate = useNavigate();
    const makeOfferAPI = import.meta.env.VITE_makeOfferAPI
    

    function makeOffer(){
        const buyer = document.cookie
            .split("; ")
            .find(row => row.startsWith("username="))
            ?.split("=")[1];
        const token = document.cookie
            .split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1];

            console.log(token || 'Token cookie not found.');
        let status = "pending";
        let offerPrice;
        if(!buyer){
            alert("You need to be logged in to make an offer")
            navigate("/login")
        }
        else if(buyer == seller){
            alert("Why Are You Buying Your Own Product?")
        }
        else{
            offerPrice = window.prompt("How Much Are You Offering?($)");
            if(offerPrice != "" || offerPrice <= 0){
                fetch(makeOfferAPI, {
                    method: "POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({buyer,seller,productName,offerPrice,status})
                })
                .then(response =>{
                    if(!response.ok){
                        throw new Error("Network response was not ok")
                    }
                    return response.json();
                })
                .then(data =>
                    alert(data)
                )
                .catch(error => console.log(error))
            }
        }
    }

    return(
        <>
            <div>
                <h3>Product Name:{productName}</h3>
                <img src={productImage} style={{width:"100px",height:"100px"}} alt="image is here"></img>
                <h4>Price:{productPrice}$</h4>
                <h5>Sold by {seller}</h5>
                <button onClick={() => navigate(`/message?seller=${seller}`)}>Chat With Seller</button>
                <button onClick={makeOffer}>Make An Offer</button>
            </div>
        </>
    )
}

export default Items