import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";





function Items({productName,productImage,productPrice,seller}){
    const navigate = useNavigate();
    const makeOfferAPI = import.meta.env.VITE_makeOfferAPI
    

    function makeOffer(){
        const buyer = localStorage.getItem("username");
        let status = "pending";
        let offerPrice;
        if(!buyer){
            alert("You need to be logged in to make an offer")
            navigate("/login")
        }
        else{
            offerPrice = window.prompt("How Much Are You Offering?($)");
            if(offerPrice != "" || offerPrice <= 0){
                fetch(makeOfferAPI, {
                    method: "POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({buyer,seller,offerPrice,status})
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
                <button>Chat With Seller</button>
                <button onClick={makeOffer}>Make An Offer</button>
            </div>
        </>
    )
}

export default Items