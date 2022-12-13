const express= require("express");
const {connection} = require("./config/db");
const { productController } = require("./routes/products.route");
require('dotenv').config()
const app= express()
var cors = require('cors')
const PORT= process.env.PORT || 8080;
app.use(express.json());
app.use(cors())     
app.get("/", (req,res)=>{
    res.send("welcome to homepage")
    console.log("Welcome to Homepage");
})
app.use("/products", productController)

app.listen(PORT, async () => {
    try{
        await connection;
        console.log("Connected to db")
    }
    catch(err){
        console.log("something went wrong");
        console.log(err)
    }
    console.log(`listening on PORT ${PORT}`)
})