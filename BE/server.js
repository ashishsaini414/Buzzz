const express = require("express");
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const routes= require("./Components/routes")
const port = 8000

dotenv.config({ path: "./config.env"})

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.use(routes)

const DB = process.env.DB;


mongoose.connect(DB,{
    useNewUrlParser: true
})

mongoose.connection.on("error",(err)=>{
    console.log("error", err)
})

mongoose.connection.on("connected",()=>{
    console.log("Mongoose is connected")
})

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

app.post("/googlelogin",(req,res)=>{
    console.log(req.body)
    res.send("ok")
})

app.listen(port,()=>{
    console.log("Server is listening to this port - ", port)
})