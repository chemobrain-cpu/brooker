require("dotenv").config()
const express = require("express")
const app = express()
const ejs = require("ejs")
const bodyParser = require("body-parser")
const path = require("path")
const fs = require("fs")
const User = require("./database/databaseConfig").User
const session = require("express-session");
const mongoose = require("mongoose")
app.use(express.static("public"));


//setting express to use  the session
app.use(session({
    secret:"mylittlesecret",
    resave:false,
    saveUninitialized:false,
    name:"precious",
    genid:function(){
        return "prechy"
    },
    cookie:{
        maxAge:7800000000000
        
    }, 
}))

app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended:true}))



const pageRoutes = require("./routes/pages")
const clientRoutes = require("./routes/client")
const adminRoutes = require("./routes/admin")

//using the routes

app.use(pageRoutes.router)
app.use(clientRoutes.router)
app.use(adminRoutes.router)

//error handler //express error middleware
app.use((err,req,res,next)=>{
     console.log(err)
    err.statusCode = err.statusCode || 300
    err.message = err.message || "an error occured on the server"
    res.status(err.statusCode).render("error",{message:"an error occured try later"})
})
app.use("*",(req,res,next)=>{
    res.render("home")


})


app.listen(process.env.PORT||3005,(err)=>{
   
    console.log("sucessfully")
})
