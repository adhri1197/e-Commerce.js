const express = require('express');
const router = express.Router()
const isloggedIn = require("../middlewares/isloggedIn")
const { 
    registerUser ,
    loginUser,
    logoutUser } = require("../controllers/userAuthController")

router.get("/", function (req, res){
    res.send("hey i am working")
})
router.post("/register" , registerUser)

router.post("/login" , loginUser)

module.exports = router;