const express = require('express');
const router = express.Router();
const ownerModel = require("../models/owner_model.js");
const bcrypt = require("bcrypt");

if (process.env.NODE_ENV) {
    router.post("/create", async function (req, res) {
        try {
            let { fullname, email, password } = req.body;

            // Check all 3 required fields
            if (!fullname || !email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "Fullname, email and password are required"
                });
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid email format"
                });
            }

            // Password length check
            if (password.length < 8) {
                return res.status(400).json({
                    success: false,
                    message: "Password must be at least 8 characters"
                });
            }

            // Ensure only one owner exists
            const ownerExists = await ownerModel.exists({});
            if (ownerExists) {
                return res.status(403).json({
                    success: false,
                    message: "Only one owner can be created"
                });
            }

            // Check duplicate email
            const existingEmail = await ownerModel.findOne({ email });
            if (existingEmail) {
                return res.status(400).json({
                    success: false,
                    message: "Email already registered"
                });
            }

            // hash password 
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            

            // Create owner
            const createdOwner = await ownerModel.create({
                fullname,
                email,
                password: hashedPassword,
            });

            // Remove password from response
            createdOwner.password = undefined;

            res.status(201).json({
                success: true,
                message: "Owner created successfully",
                owner: createdOwner
            });

        } catch (err) {
            console.error(err.message);
            res.status(500).json({
                success: false,
                message: "Server error"
            });
        }
    });
}

router.get("/", function (req, res) {
    res.send("hey it's working");
});

module.exports = router;
