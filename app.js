require("dotenv").config();

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");
const db = require("./config/connecting-mongoDB");

// Routers
const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const indexRouter  = require("./routes/index");

// ======================
// Middlewares
// ======================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Session MUST come before flash
app.use(
    expressSession({
        secret: process.env.EXPRESS_SESSION_SECRET || "secret",
        resave: false,
        saveUninitialized: false,
    })
);

// ✅ Flash
app.use(flash());

// ✅ Make flash available in ALL EJS files
app.use((req, res, next) => {
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs");

// ======================
// Routes
// ======================

app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

// ======================
// Start server
// ======================

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});