import { useState } from "react"
import { useNavigate } from "react-router-dom";







function Register(){

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

    const RegisterApi = import.meta.env.VITE_RegisterApi

    function handleRegister(event){
        event.preventDefault();
        fetch(RegisterApi,{
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({username,password})
        })
        .then(response =>{
            if(!response.ok){
                throw new Error("Network response was not ok")
            }
            return response.text()
        })
        .then(data =>{
            alert("Succesfully Registered!");
            // navigate("/login");
        })
        .catch(error => console.log(error));
    }








    return(
        <>
            <div>
                <form onSubmit={handleRegister}>
                    <h1>Register</h1>
                    <label>Username: <input value={username} onChange={(event) => setUsername(event.target.value)}/></label>
                    <label>Password: <input value={password} onChange={(event) => setPassword(event.target.value)}/></label>
                    <button type="button">Go To Login</button>
                    <button type="submit">Register</button>
                </form>
            </div>
        </>
    )
}



export default Register