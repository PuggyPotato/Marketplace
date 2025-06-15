import { useNavigate } from "react-router-dom";





function Items({productName,productImage,productPrice,seller}){
    const navigate = useNavigate();
    const makeOfferAPI = import.meta.env.VITE_makeOfferAPI
    
    const buyer = document.cookie
            .split("; ")
            .find(row => row.startsWith("username="))
            ?.split("=")[1];

    function makeOffer(){
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
            if(offerPrice != "" && offerPrice > 0 && offerPrice != null){
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

    function chatWithSeller(){
        if(!buyer){
            alert("You need To Be Logged In!")
            navigate("/login")
        }
        else{
            navigate(`/message?seller=${seller}`)
        }
    }

    return(
        <>
            <div className="border-2 w-55 h-81 p-2 pt-0">
                <h3 className="text-xl text-center">{productName}</h3>
                <img src={productImage} className="w-55 h-46 " alt="image is here"></img>
                <h4 className="text-xl pb-0">Price:{productPrice}$</h4>
                <h5 className="text-xl">Seller:{seller}</h5>
                <button onClick={chatWithSeller} className="w-20 h-10 border-2 absolute top-1 relative rounded text-sm" >Message</button>
                <button onClick={makeOffer} className="w-25 h-10 border-2 absolute top-1 left-5 relative rounded text-sm">Make An Offer</button>
            </div>
        </>
    )
}

export default Items