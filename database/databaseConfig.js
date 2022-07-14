const mongoose = require("mongoose")

mongoose.connect(process.env.DB_LOCAL).then(() => {
    console.log("connected to database")
})


const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,

    },
    countryOfResidence: {
        type: String,

    },
    availableBalance: {
        type: String,

    },
    accountStatus: {
        type: String,

    },
    accountType: {
        type: String,

    },
    tradingPlan: {
        type: String,
    },
    isAdmin:{
        type:Boolean
    },
    password:{
        type:String
    }


})

const walletSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    address:{
        type:String
    }
})




let User = new mongoose.model("user", userSchema)
let Wallet = new mongoose.model("wallet", walletSchema)

module.exports.User = User
module.exports.Wallet = Wallet