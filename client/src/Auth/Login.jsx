import { useEffect, useState, useRef } from "react";
import {useNavigate} from "react-router-dom";









function Login(){

    const navigate = useNavigate()
    const [isLoggedIn,setIsLoggedIn] = useState()
    useEffect(() =>{

   
    const token = document.cookie
        .split("; ")
        .find(row => row.startsWith("token="))
        ?.split("=")[1];
    
    if(token){
        navigate("/")
    }

    },[])

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const LoginApi = import.meta.env.VITE_LoginApi

    function changeUsername(event){
        setUsername(event.target.value);
    }

    function changePassword(event){
        setPassword(event.target.value);
    }

    function handleLogin(event){
        event.preventDefault();
        //Check If User Entered Empty
        if(username === "" || password === ""){
            alert("Username Or Password cannnot be empty")
        }
        else{
            fetch(LoginApi,{
                method: "POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({username:username,password:password})
            })
            .then(response => {
                if(!response.ok){
                    throw new Error("Network response was not ok")
                }
                return response.json();
            })
            .then(data =>{
                if(data.token){
                    alert("Succesful Login")
                    
                    document.cookie = `token=${data.token}; path=/; max-age=3600`
                    document.cookie = `username=${data.username}; path=/; max-age=3600`;
                    navigate("/")
                  
                    
                }
                else{
                    throw new Error("Token Not Received")
                }
            })
            .catch(error => {
                console.log("Error :",error)
                alert("Username Or Password Is Incorrect")
            })
        }}

        function showPassword(){
            const checkBox = document.getElementById("checkBox");
            const password = document.getElementById("password");

            if(checkBox.checked){
                password.type = "text"
            }
            else{
                password.type ="password"
            }
        }

    return(
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100 text-black">
                <form onSubmit={handleLogin} className="bg-white shadow-lg rounded-xl p-8 w-96 border">
                    <h1 className="text-2xl font-bold text-center mb-6 text-black">Login</h1>
                    <label className="block text-gray-700 font-medium mb-1">Username: 
                        <input value={username} onChange={changeUsername} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                    </label>
                    <label className="block text-gray-700 font-medium mb-1">Password: 
                        <input value={password} onChange={changePassword} id="password" type="password" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                    </label>
                    <input type="checkbox" onClick={showPassword} id="checkBox"></input><label>Show Password</label>
                    <br></br>
                    <button type="button" onClick={() => navigate("/register")} className="text-blue-500 hover:underline">Go To Register</button>
                    <button type="submit" className="bg-blue-500 text-white ml-32 mt-8 px-4 py-2 rounded-lg hover:bg-blue-600 transition hover:cursor-pointer">Login</button>
                </form>
            </div>
        </>
    )
}

export default Login