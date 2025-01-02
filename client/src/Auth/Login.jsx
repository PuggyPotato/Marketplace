import { useEffect, useState, } from "react";
import {useNavigate} from "react-router-dom";








function Login(){

    //const navigate = useNavigate()


    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    function changeUsername(event){
        setUsername(event.target.value);
    }

    function changePassword(event){
        setPassword(event.target.value);
    }

    function handleLogin(event){
        event.preventDefault();
        fetch("http://localhost:3000/login" ,{
            method: "POST",
            header:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({username,password})
        })
        .then(response => {
            if(!response.ok){
                throw new Error("Network response was not ok")
            }
            return response.text();
        })
        .then(data =>{
            alert("Succesful Login")
            //navigate("/Home")
        })
        .catch(error => console.log("Error :",error))
    }


    return(
        <>
            <div>
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <label>Username: <input value={username} onChange={changeUsername}/></label>
                    <label>Password: <input value={password} onChange={changePassword}/></label>
                    <button type="button">Go To Register</button>
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    )
}

export default Login