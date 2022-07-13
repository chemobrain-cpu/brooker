const express = require("express")
const router = express.Router()
const app = express()
const ejs = require("ejs")
const bodyParser = require("body-parser")
const path = require("path")
const fs = require("fs")
const session = require("express-session");
const mongoose = require("mongoose")



module.exports.getLogin = async (req, res) => {

    res.status(200).render('adminAuth/login')

}
module.exports.getSignup = async (req, res) => {

    res.status(200).render('adminAuth/signup')
}

module.exports.getProfile = async (req, res) => {

    res.status(200).render('adminAuth/profile')

}
module.exports.getUserDetails = async (req, res) => {

    res.status(200).render('adminAuth/userDetails')

}

module.exports.getUsers = async (req, res) => {

    res.status(200).render('adminAuth/users')

}