require("dotenv").config()
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const http = require("http");
const {Server} = require("socket.io");

const PORT = process.env.PORT;
const MONGOURL = process.env.MONGOURL;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const corsOptions = {
    origin: 'http://localhost:5173', // Allow requests from the frontend domain
    credentials: true, // Allow cookies to be sent with the request
  };

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

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

//Check For User Credential When Log In
app.post("/login", async (req,res) =>{
    const {username,password} = req.body
    console.log(req.body)
    try{
        const user = await UserCredential.findOne({username})
        const passwordMatch = await bcrypt.compare(password, user.password);

        if(user && passwordMatch){
            const token = jwt.sign(
                {user_id:user._id},
                process.env.JWT_SECRET_KEY,
                {expiresIn:"1h"}

            )
            res.json({token:token,username:username})
            
        }
        else{
            res.status(401).send("Login Failed")
        }
    }
    catch(error){
        res.status(500).send("Something Went Wrong")
    }
})

//Item Listing Section
const ItemDetailsSchema = new mongoose.Schema({
    productName:String,
    productDescription:String,
    productPrice:Number,
    productImage:String,
    seller:String
})

const ItemDetails = mongoose.model("ItemDetails",ItemDetailsSchema)


app.post("/listitem", async (req,res) =>{
    const {productName,productDescription,productPrice,productImage,seller} = req.body;

    try{
        const itemDetails = new ItemDetails({productName,productDescription,productPrice,productImage,seller});
        await itemDetails.save();
        res.status(200).json("Product Saved Succesfully");
    }
    catch(error){
        console.log("Error:",error)
        res.status(401).json("Failed To Save Product")
    }
})

//Fetch Data from product to display in marketplace
app.get("/products", async (req,res) =>{
    try{
        const products = await ItemDetails.find();
        res.json(products)
    }
    catch(error){
        res.status(500).json({error: "Error fetching products from db"})
    }
})

//Storing Offer In Database
const OfferDetailsSchema = new  mongoose.Schema({
    buyer:String,
    seller:String,
    productName:String,
    offerPrice:String,
    status:String
})

const OfferDetails = mongoose.model("OfferDetails",OfferDetailsSchema);

app.post("/offer", async(req,res) =>{
    const {buyer,seller,productName,offerPrice,status} = req.body;

    try{
        const offerDetails = new OfferDetails({buyer,seller,productName,offerPrice,status});
        await offerDetails.save();
        console.log("data is succesfully saved!The data:",offerDetails)
        res.status(200).json("Offer Made Succesfully")
    }
    catch(error){
        console.log("Error occured:",error)
    }
})

//Fetch Data from Offers(seller)
app.get("/offer/seller", async (req,res) =>{
    let username;
    username = req.cookies.username;
    console.log(username);
    try{
        const offers = await OfferDetails.find({seller:username});
        res.json(offers);
    }
    catch(error){
        console.log("Error",error);
        res.status(401).json(error)
    }
})

//Fetch Data from Offers(buyer)
app.get("/offer/buyer", async (req,res) =>{
    let username;
    username = req.cookies.username;
    console.log(username);
    try{
        const offers = await OfferDetails.find({buyer:username});
        res.json(offers);
    }
    catch(error){
        console.log("Error",error);
        res.status(401).json(error)
    }
})


//Change the State of Offers
app.post("/updateOfferState", async (req,res) =>{
    const {productID,currentStatus} = req.body;

    try{
        const updatedOffer = await OfferDetails.findOneAndUpdate(
            { _id: productID }, // Condition to find the offer
            { $set: { status: currentStatus } }, // Update the status field
            { new: true } // Ensure the updated document is returned
            
        );
        console.log("Data is updated")
        res.json(updatedOffer)
    }
    catch(error){
        console.log("Error Saving Data:",error)
    }
})

//Initialise socket.io
const server = http.createServer(app);
const io = new Server(server, {cors:true})

io.on("connection", (socket) =>{
    socket.emit("initialConnection", "hello")
})

//Just To Test if the code is running well
server.listen(PORT, () =>{
    console.log("Port is running on " + PORT);

})

