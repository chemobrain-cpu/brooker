const express = require("express")
const router = express.Router()
const app = express()
const ejs = require("ejs")
const bodyParser = require("body-parser")
const path = require("path")
const fs = require("fs")
const session = require("express-session");
const mongoose = require("mongoose")






module.exports.getDeposit = async (req,res)=>{ 
   
   res.status(200).render('userAuth/deposit')
 
}
module.exports.getTradecenter = async (req,res)=>{ 
   
   res.status(200).render('userAuth/tradecenter')
 
}

module.exports.getUpgrade = async (req,res)=>{ 
   
   res.status(200).render('userAuth/upgrade')
 
}
module.exports.getWithdrawal = async (req,res)=>{ 
 
   res.status(200).render('userAuth/withdrawal')
 
}
module.exports.getProfile = async (req,res)=>{ 
   res.status(200).render('userAuth/profile')
 
}
module.exports.getLoading = async (req,res)=>{ 
   res.status(200).render('userAuth/loading')
 
}

module.exports.getLogin = async (req,res)=>{ 
    res.status(200).render('userAuth/login')
  
 }
 module.exports.getSignup = async (req,res)=>{ 
    res.status(200).render('userAuth/signup')
  
 }
