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
const { timeStamp } = require("console");
const { type } = require("os");

const PORT = process.env.PORT;
const MONGOURL = process.env.MONGOURL;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const corsOptions = {
    origin: ['http://localhost:5173',"http://localhost:5174","http://localhost:5175"], // Allow requests from the frontend domain
    credentials: true, // Allow cookies to be sent with the request
  };

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(MONGOURL)

const UserCredentialSchema = new  mongoose.Schema({
    username:String,
    password:String,
    socketID:String
})

const UserCredential = mongoose.model("UserCredential", UserCredentialSchema)


//Register Handling
app.post("/register",async (req,res) =>{
    let {username,password} = req.body;

            try{
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(password,salt)

                const userCredential = new UserCredential({username:username,password:hash});

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
    let username;
    username = req.cookies.username;
    console.log(username)
    console.log(username)
    try{
        const products = await ItemDetails.find({
            seller: {$ne :username}
        });
        res.json(products)
    }
    catch(error){
        res.status(500).json({error: "Error fetching products from db"})
    }
})

//Fetch Data for seller to edit
app.get("/myProducts", async (req,res) =>{
    let username = req.cookies.username;
    try{
        const product = await ItemDetails.find({
            seller: username
        })
        res.json(product);
    }
    catch(error){
        console.log("Error Encountered:",error)
    }
})

//Fetch Data to be Edited
app.get("/myProducts/edit", async (req,res) =>{
    const productID = req.query.productID
    console.log(productID)
    try{
        const product = await ItemDetails.findOne({
            _id : productID
        })
        res.json(product);
        console.log(product)
    }
    catch(error){
        console.log("Error Encountered:",error)
    }
})

//Update The edited Data
app.put("/editListing", async (req,res) =>{
    const productID = req.query.productID
    const {productName,productDescription,productPrice,productImage} = req.body
    const updateDetails ={ productName:productName,
        productDescription:productDescription,
        productPrice:productPrice,
        productImage,productImage
    }

    
    try{
        const product = await ItemDetails.findByIdAndUpdate(productID,updateDetails)
        res.json("Succesfully Updated!")
    }
    catch(error){
        console.log("Error encountered:",error)
    }
})

//Delete listings
app.delete("/deleteListing",async (req,res) =>{
    const {productID} = req.body
    try{
        await ItemDetails.findByIdAndDelete(productID)
        res.json("Data Succesfully Deleted")
    }
    catch(error){
        console.log("Error encountered:",error)
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

const conversationSchema = new mongoose.Schema({
    participant : [String],
    buyer :String,
    seller:String,
    message :[
        {
            buyer:String,
            seller:String,
            content:String,
            sender:String,
            
            timeStamp:{
                type:Date,
                default:Date.now
            }
        }
    ],

});

const Conversation = mongoose.model("Conversation",conversationSchema)

io.on("connection", (socket) =>{
    socket.on("userOnline",async (username) =>{
        await UserCredential.findOneAndUpdate(
            {username:username},
            {$set : {socketID:socket.id}},
            {new:true})
        socket.data.username = username;
    })


    socket.on("messageDetails", async ({buyer,seller,message,sender}) =>{
        console.log("TEST!")


        const senderSocketData = await UserCredential.findOne({
            username:sender
        })
        const senderSocketID = senderSocketData.socketID;

        if(sender == buyer){
            const buyerSocketData = await UserCredential.findOne({
                username:buyer
            });
            const buyerSocketID = buyerSocketData.socketID;
            const sellerSocketData = await UserCredential.findOne({
                username:seller
            })
            const sellerSocketID = sellerSocketData.socketID;
            console.log(buyerSocketID,"Buyersocket")
            console.log(sellerSocketID,"sellersocket")
            socket.to(buyerSocketID).emit("newMessage",{buyer:buyer,seller:seller,content:message,sender:sender})
            socket.to(sellerSocketID).emit("newMessage",{buyer:buyer,seller:seller,content:message,sender:sender})
        
        }
        else if(sender == seller){
            const sellerSocketData = await UserCredential.findOne({
                username:seller
            })
            const sellerSocketID = sellerSocketData.socketID
            const buyerSocketData = await UserCredential.findOne({
                username:buyer
            })
            const buyerSocketID = buyerSocketData.socketID;
            socket.to(buyerSocketID).emit("newMessage",{buyer:buyer,seller:seller,content:message,sender:sender})
            socket.to(sellerSocketID).emit("newMessage",{buyer:buyer,seller:seller,content:message,sender:sender})
        }
        else{
            console.log("ERROR ERROR ERROR")
        }




        let conversation = await Conversation.findOne({
            $or: [
                {"participant.buyer":buyer},
                {"participant.seller":seller}],
        })

        if(!conversation){

            conversation = new Conversation({
                buyer:buyer,
                seller:seller,
                participant: [buyer,seller],
                message:[]
            });
        }



        conversation.message.push({
            buyer:buyer,
            seller:seller,
            content:message,
            sender:sender,
            
        })

        await conversation.save();
        

        
    })

    socket.on("disconnect", async (reason) =>{
            console.log(socket.id + "has disconnected")
            console.log(socket.data.username)
            await UserCredential.findOneAndUpdate(
                { username: socket.data.username }, // Condition to find the offer
                { $set: { socketID: ""} }, // Update the status field
                
            )
    
        })

})

//Retrieve Previous Message from the DB
app.get("/prevMessage", async (req,res) =>{
    
    if(req.query.seller && req.query.seller !== "null"){
        var buyer = req.cookies.username 
        var seller = req.query.seller;
    }
    else{
        var seller = req.cookies.username;
        var buyer = req.query.buyer
    }

    try{
        const conversation = await Conversation.findOne({
            participant: {$all:[buyer,seller]}
        })
        if(conversation){
        res.json(conversation.message)
        
        }
        else{
            res.json("You Have No Message Yet!")
        }
    }
    catch(error){
        console.log("Error encountered:",error)
    }
})

app.get("/checkMessages",async (req,res) =>{
    const user = req.cookies.username;

    try{
        let conversation = await Conversation.find({
            participant: {$all:[user]}
        })
        res.json(conversation.map(convo => convo))
    }
    catch(error){
        console.log("Encountered Error:",error)
    }
})

//Fetch Other Socket To Know If It's Online
app.get("/checkOtherOnline", async (req,res) =>{
    try{
        const otherPerson = req.query.otherPerson
        const userData = await UserCredential.findOne({
            username:otherPerson
        })
        res.status(200).json(userData.socketID)
    }
    catch(error){
        res.status(401).json("Something failed")
    }
})

//Just To Test if the code is running well
server.listen(PORT, () =>{
    console.log("Port is running on " + PORT);

})

