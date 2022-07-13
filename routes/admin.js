const express = require("express")
const router = express.Router()
const app = express()
const ejs = require("ejs")
const bodyParser = require("body-parser")
const path = require("path")
const fs = require("fs")


let getLogin = require("../controller/admin").getLogin

let getSignup = require("../controller/admin").getSignup

let getProfile = require("../controller/admin").getProfile

let getUserDetails = require("../controller/admin").getUserDetails

let getUsers = require("../controller/admin").getUsers




router.get("/adminlogin",getLogin)
router.get("/adminsignup",getSignup)
router.get("/adminprofile",getProfile)
router.get("/userdetails",getUserDetails)
router.get("/users",getUsers)





exports.router = router