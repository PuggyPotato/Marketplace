import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";







function Register(){

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

    const RegisterApi = import.meta.env.VITE_RegisterApi
    const navigate = useNavigate();

    useEffect(() =>{

    },[

        
    ])

    function handleRegister(event){
        event.preventDefault();
        //Check If User Entered Empty
        if(username === "" || password === ""){
            alert("Username Or Password cannnot be empty")
        }
        else if(username.length < 8 || password.length < 8){
            alert("Please Enter Username and Password with at least 8 character")
        }
        else if(!/[A-Z]/.test(password)){
            alert("Password must have at least a upper case")
        }
        else{
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
                navigate("/login");
            })
            .catch(error => console.log(error));
        }}








    return(
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <form onSubmit={handleRegister} className="bg-white shadow-lg rounded-xl p-8 w-96 border">
                    <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
                    <label>Username: <input value={username} onChange={(event) => setUsername(event.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"/></label>
                    <label>Password: <input value={password} onChange={(event) => setPassword(event.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"/></label>
                    <button type="button" onClick={() =>navigate("/login")} className="text-blue-500 hover:underline cursor-auto">Go To Login</button>
                    <button type="submit" className="bg-blue-500 text-white ml-32 mt-8 px-4 py-2 rounded-lg hover:bg-blue-600 transition hover:cursor-pointer">Register</button>
                </form>
            </div>
        </>
    )
}



export default Register