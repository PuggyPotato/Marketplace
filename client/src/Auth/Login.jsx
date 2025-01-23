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
        else if(username.length < 8 || password.length < 8){
            alert("Please Enter Username and Password with at least 8 character")
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


    return(
        <>
            <div>
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <label>Username: <input value={username} onChange={changeUsername}/></label>
                    <label>Password: <input value={password} onChange={changePassword}/></label>
                    <button type="button" onClick={() => navigate("/register")}>Go To Register</button>
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    )
}

export default Login