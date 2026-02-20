const express = require('express');
const router = express.Router()
const { registerUser } = require("../controllers/userAuthController")

router.get("/", function (req, res){v
    res.send("hey it's working")
});

router.post("/register" , registerUser)

module.exports = router;