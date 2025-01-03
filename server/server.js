require("dotenv").config()
const express = require("express");
const app = express();
const cors = require("cors")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const PORT = process.env.PORT;
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
    let {username,password} = req.body;

            try{
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(password,salt)

                const userCredential = new UserCredential({username,password:hash});

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
        const passwordMatch = await bcrypt.compare(password, user.password);

        if(user && passwordMatch){
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