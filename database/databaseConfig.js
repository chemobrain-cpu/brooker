const mongoose = require("mongoose")


mongoose.connect("mongodb://127.0.0.1:27017/customerDB").then(()=>{
    console.log("connected to database")
})

//create a schema like a blue print of how fields are gonna look like and the typoe of data such field must take

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    trackerId: {
        type: String,
    }
})


let User = new mongoose.model("user", userSchema)




//creating a model based on that schema

module.exports.User = User