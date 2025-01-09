import { useEffect, useState, } from "react";
import {useNavigate} from "react-router-dom";








function Login(){

    const navigate = useNavigate()
    const [isLoggedIn,setIsLoggedIn] = useState()
    useEffect(() =>{

   
    const data = localStorage.getItem("token")
    if(data){
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
            alert("Username Or Password acnnot be empty")
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
                console.log(data)
                console.log(data.token)
                if(data.token){
                    alert("Succesful Login")
                    
                    localStorage.setItem("token",data.token);
                    localStorage.setItem("username",data.username)
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