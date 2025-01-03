require("dotenv").config()
const express = require("express");
const app = express();
const cors = require("cors")
const mongoose = require("mongoose")

const PORT = 3000 || process.env.PORT;
const MONGOURL = process.env.MONGOURL;

app.use(cors())
app.use(express.json())

mongoose.connect(MONGOURL)

const UserCredentialSchema = new  mongoose.Schema({
    username:String,
    password:String
})

const UserCredential = mongoose.model("UserCredential", UserCredentialSchema)

//Register Handling
app.post("/register",async (req,res) =>{
    const {username,password} = req.body;
    console.log(req.body);
    const userCredential = new UserCredential({username,password});

    try{
        await userCredential.save()
        res.status(200).send("Data Saved Succesfully");
    }
    catch(error){
        console.log(error)
    }
})

app.post("/login", async (req,res) =>{
    const {username,password} = req.body
    console.log(req.body)
    try{
        const user = await UserCredential.findOne({username})
        if(user && user.password === password){
            res.status(200).send("Login Succesful")
        }
        else{
            res.status(401).send("Login Failed")
        }
    }
    catch(error){
        res.status(500).send("Something Went Wrong")
    }
})

//Just To Test if the code is running well
app.listen(PORT, () =>{
    console.log("Port is running on " + PORT);

})