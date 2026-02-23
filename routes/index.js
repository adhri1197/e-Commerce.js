const express = require("express");
const router = express.Router();
const isloggedIn = require("../middlewares/isloggedIn");
const Product = require("../models/product_model");

router.get("/", function (req, res){
    if (req.cookies.token){
        return res.redirect("/shop");
    }
    res.render("index");
});

router.get("/shop", isloggedIn, async function (req, res){
    const products = await Product.find();
    res.render("shop", { products });
});

router.get("/logout", isloggedIn, function (req, res){
    res.clearCookie("token");
    res.redirect("/");
});

module.exports = router;