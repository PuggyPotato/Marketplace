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

const UserCredential = new mongoose.model("UserCredential", UserCredentialSchema)


app.post("/register",async (req,res) =>{
    const {username,password} = req.body;
    const userCredential = new UserCredential({username,password});

    try{
        await userCredential.save()
        res.status(200).send("Data Saved Succesfully");
    }
    catch(error){
        console.log(error)
    }
})

app.listen(PORT, () =>{
    console.log("Port is running on " + PORT);

})