const express = require("express")
const router = express.Router()
const app = express()
const ejs = require("ejs")
const bodyParser = require("body-parser")
const path = require("path")
const fs = require("fs")


let getDeposit = require("../controller/client").getDeposit
let getTradecenter = require("../controller/client").getTradecenter
let getUpgrade = require("../controller/client").getUpgrade
let getWithdrawal = require("../controller/client").getWithdrawal
let getProfile = require("../controller/client").getProfile
let getLoading = require("../controller/client").getLoading
let getLogin = require("../controller/client").getLogin
let getSignup = require("../controller/client").getSignup


router.get("/deposit",getDeposit)
router.get("/tradecenter",getTradecenter)
router.get("/upgrade",getUpgrade)
router.get("/withdrawal",getWithdrawal)
router.get("/profile",getProfile)
router.get("/loading",getLoading)
router.get("/login",getLogin)
router.get("/signup",getSignup)





exports.router = router