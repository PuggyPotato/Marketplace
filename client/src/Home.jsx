import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"








function Home(){

    const [loggedIn,setLoggedIn] = useState(false)
    const [username,setUsername] = useState("Guest")
    const navigate = useNavigate()
    
    useEffect(() =>{
        const token = document.cookie
            .split("; ")
            .find(row => row.startsWith("token="))
            ?.split("=")[1];
        const UserUsername = document.cookie
            .split('; ')
            .find(row => row.startsWith("username="))
            ?.split("=")[1]

        if(token ==="" || token ==="undefined"){
            setLoggedIn(false)
        }
        else if(token){
            setLoggedIn(true)
            console.log(token)
            console.log(username)
            setUsername(UserUsername)
        }
        else{
            setLoggedIn(false)
            console.log(token)
        }
    },[])

    function logOut(event){
        event.preventDefault();
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        document.cookie = "username=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        setLoggedIn(false)
        alert("Succesfully Logout!")
        navigate("/login")
    }

    return(
        <>
            <div>
                {!loggedIn? (<button onClick={() => navigate("/login")}>Go To Login</button>):
                (<button onClick={logOut}>Log Out</button>)}
                <button onClick={() => navigate("/marketplace")}>Go To Marketplace</button>
                <button onClick={() => navigate("/listitem")}>List Item</button>
                <button onClick={() => navigate("/checkoffer")}>Check Offer</button>
                <button onClick={() => navigate("/offerlist")}>Check Outgoing Offer</button>
                <button onClick={() => navigate("/checkMessages")}>Check Messages</button>
                <h1>Welcome {username}</h1>
            </div>
        </>
    )
}


export default Home