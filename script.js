const express=require("express");
const mongoose=require("mongoose");
require("dotenv").config();
const app=express();
app.use(express.json());

// connect mongoose
mongoose
    .connect("mongodb+srv://harshitabhingares74:port@databases-ca1.im46o.mongodb.net/")
    .then(()=>console.log("MONGOdb connected!"))
    .catch((err)=>console.log("Could'nt connect Database dur to error:",err));


// Schema
const Restaurant=mongoose.model(
    "Restaurant",
    new mongoose.Schema({
        name:{type:String,require:true},
        city:{type:String,require:true},
        item:{type:Number,require:true},       
       
        
    })

)

const Item=mongoose.model(
    "Item",
    new mongoose.Schema({
        
        item:{type:Number,require:true},       
       
        
    })

)


app.get("/",(req,res)=>{
    res.send("Welcome to the restaurant!");

});

app.post("/restaurants",async(req,res)=>{
    const restaurant=new Restaurant(req.body);
    await restaurant.save();
    res.json(restaurant);
    
});

app.post("/items",async(req,res)=>{
    const item=new Item(req.body);
    await item.save();
    res.json(item);
    
});

app.get("/restaurants",async(req,res)=>{
    const items=await Item.find();
    res.json(items);
})

app.listen(5000,()=>console.log("server is running on port 5000"));
