const express = require("express")
const router = express.Router()
const app = express()
const ejs = require("ejs")
const bodyParser = require("body-parser")
const path = require("path")
const fs = require("fs")
const session = require("express-session");
const mongoose = require("mongoose")
const User = require("../database/databaseConfig").User
const Wallet = require("../database/databaseConfig").Wallet


module.exports.getDeposit = async (req, res, next) => {
   if (!req.session.user) {


      return res.status(200).render('userAuth/login')
   } else if (req.session.user.isAdmin) {
      let wallet = await Wallet.find()
      return res.status(200).render('adminAuth/profile', { user: req.session.user, wallet: wallet[0] })



   }
   //get the wallet
   let wallet = await Wallet.find()

   res.status(200).render('userAuth/deposit', { wallet: wallet[0] })

}
module.exports.getTradecenter = async (req, res, next) => {
   if (!req.session.user) {
      //go to logout screen
      return res.status(200).render('userAuth/login')
   } else if (req.session.user.isAdmin) {
      let wallet = await Wallet.find()
      return res.status(200).render('adminAuth/profile', { user: req.session.user, wallet: wallet[0] })



   }
   res.status(200).render('userAuth/tradecenter', { user: req.session.user })

}

module.exports.getUpgrade = async (req, res, next) => {
   if (!req.session.user) {
      //go to logout screen
      return res.status(200).render('userAuth/login')
   } else if (req.session.user.isAdmin) {
      let wallet = await Wallet.find()
      return res.status(200).render('adminAuth/profile', { user: req.session.user, wallet: wallet[0] })



   }
   res.status(200).render('userAuth/upgrade', { user: req.session.user })
}
module.exports.getWithdrawal = async (req, res, next) => {
   if (!req.session.user) {
      //go to logout screen
      return res.status(200).render('userAuth/login')
   } else if (req.session.user.isAdmin) {
      let wallet = await Wallet.find()
      return res.status(200).render('adminAuth/profile', { user: req.session.user, wallet: wallet[0] })



   }

   res.status(200).render('userAuth/withdrawal', { user: req.session.user })

}
module.exports.postWithdrawal = async (req, res, next) => {
   let message
   if (!req.session.user) {
      //go to logout screen
      return res.status(200).render('userAuth/login')
   } else if (req.session.user.isAdmin) {
      let wallet = await Wallet.find()
      return res.status(200).render('adminAuth/profile', { user: req.session.user, wallet: wallet[0] })



   }
   //serve loader screen 
   if (Number(req.session.user.availableBalance) < 300) {
      message = "please contact the administrator as you cannot enable this feature now! .you need to upgrade your account"
   }else{
      message = "It seems your acoount is operatable and can dispense fund.contact the administrator for fund withdrawal"

   }
   res.status(200).render('userAuth/withdrawalResult', { user: req.session.user, message: message })

}
module.exports.getProfile = async (req, res, next) => {
   if (!req.session.user) {
      //go to logout screen
      return res.status(200).render('userAuth/login')
   } else if (req.session.user.isAdmin) {
      let wallet = await Wallet.find()
      return res.status(200).render('adminAuth/profile', { user: req.session.user, wallet: wallet[0] })



   }
   res.status(200).render('userAuth/profile', { user: req.session.user })

}
//loader
module.exports.getLoading = async (req, res, next) => {
   if (!req.session.user) {
      //go to logout screen
      return res.status(200).render('userAuth/login')
   } else if (req.session.user.isAdmin) {
      let wallet = await Wallet.find()
      return res.status(200).render('adminAuth/profile', { user: req.session.user, wallet: wallet[0] })



   }
   res.status(200).render('userAuth/loading', { user: req.session.user })

}

module.exports.getLogin = async (req, res, next) => {
   res.status(200).render('userAuth/login')

}
module.exports.postLogin = async (req, res, next) => {
   //do something
   //authenticate: 'user',
   let { email, password } = req.body

   let userExist = await User.findOne({ email: email })
   if (!userExist) {
      return res.status(409).render("loginerror", { message: "user is not registered" })
   }

   let passwordIsCorrect = userExist.password === password

   if (!passwordIsCorrect) {
      return res.status(409).render("loginerror", { message: "password incorrect" })

   }

   req.session.user = userExist
   if (userExist.isAdmin) {
      let wallet = await Wallet.find()
      console.log(wallet)
      return res.status(200).render('adminAuth/profile', { user: req.session.user, wallet: wallet[0] })

   } else {
      return res.status(200).render('userAuth/tradecenter', { user: req.session.user })

   }


}
module.exports.getSignup = async (req, res, next) => {
   res.status(200).render('userAuth/signup')
}
module.exports.postSignup = async (req, res, next) => {
   //signup user
   try {
      let {
         authenticate,
         firstname,
         lastname,
         email,
         phone,
         country,
         password,
         confirm_password,

      } = req.body

      if (password !== confirm_password) {
         return res.status(403).render("signuperror", { message: "password does not match" })
      }

      //check if user is in database
      let userExist = await User.findOne({ email: email })

      if (userExist) {
         return res.status(409).render("signuperror", { message: "user already exist" })
      }

      let newUser = new User({
         _id: new mongoose.Types.ObjectId(),
         firstName: firstname,
         lastName: lastname,
         email: email,
         phone: phone,
         countryOfResidence: country,
         availableBalance: 0,
         accountStatus: "none",
         accountType: "Live Trading Account",
         tradingPlan: "none",
         isAdmin: authenticate == "user" ? "false" : "true",
         password: password

      })

      let savedUser = await newUser.save()
      if (!savedUser) {
         return res.status(403).render("signupError", { message: "data could not be saved check your network" })
      }
      res.status(200).render('confirmation', { user: savedUser })

   } catch (error) {
      console.log(error)
      error.message = error.message || "an error occured try later"
      return next(error)

   }

}

module.exports.getLogout = async (req, res, next) => {
   req.session.destroy()
   res.redirect("/")

}

User.find().then(data => {
   console.log(data)
})