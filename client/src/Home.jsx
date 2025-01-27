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
            <div className="w-30 flex" >
                <div className="border-2 ml-35  h-screen absolute"></div>
                <div className="border-2 mt-15 w-screen absolute"></div>
                <div className="gap-y-4 flex flex-col " >
                    <button className="text-2xl">Potato Market</button>
                    {!loggedIn? (<button onClick={() => navigate("/login")} className="border-2 bg-red-700 w-32 h-12 rounded-md text-sm absolute right-3 top-2">Go To Login</button>):
                    (<button onClick={logOut} className="border-2 bg-red-700 w-32 h-12 rounded-md text-sm absolute right-3 top-2">Log Out</button>)}
                    <button onClick={() => navigate("/marketplace")} className="border-2 bg-red-700 w-32 h-12 rounded-md text-sm">Go To Marketplace</button>
                    <button onClick={() => navigate("/listitem")} className=" border-2 bg-red-700 w-24 h-12 rounded-md">List Item</button>
                    <button onClick={() => navigate("/checkoffer")} className=" border-2 bg-red-700 w-24 h-12 rounded-md">Check Offer</button>
                    <button onClick={() => navigate("/offerlist")} className=" border-2 bg-red-700 w-32 h-12 rounded-md">Check Outgoing Offer</button>
                    <button onClick={() => navigate("/checkMessages")} className=" border-2 bg-red-700 w-24 h-12 rounded-md">Check Messages</button>
                    <button onClick={() => navigate("/checkListings")} className=" border-2 w-32 h-12 rounded-md">Check Own Listings</button>
                    <h1 className="font-mono text-3xl absolute ml-40 mt-3">Welcome {username}</h1>
                </div>
            </div>
        </>
    )
}


export default Home