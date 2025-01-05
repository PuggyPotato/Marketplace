import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"








function Home(){

    const [loggedIn,setLoggedIn] = useState(false)
    const [username,setUsername] = useState("Guest")
    const navigate = useNavigate()
    
    useEffect(() =>{
        const token = localStorage.getItem("token")
        const UserUsername = localStorage.getItem("username")

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
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        setLoggedIn(false)
        alert("Succesfully Logout!")
        navigate("/login")
    }

    return(
        <>
            <div>
                {!loggedIn? (<button onClick={() => navigate("/login")}>Go To Login</button>):
                (<button onClick={logOut}>Log Out</button>)}
                <button>Go To Marketplace</button>
                <button>List Item</button>
                <h1>Welcome {username}</h1>
            </div>
        </>
    )
}


export default Home