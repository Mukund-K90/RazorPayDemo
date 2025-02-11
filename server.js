require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const cors = require("cors");
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/src/views"));

// Serve static files (if needed)
app.use(express.static("public"));

//home route
app.get("/", (req, res) => {
    res.render("index", { title: "Welcome to Razorpay Demo" });
});

//plan routes
app.use('/plan',require('./src/routes/planRoutes'));

//subsciption routes
app.use('/subscription', require('./src/routes/subscriptionRoutes'));

//order routes
app.use('/order', require('./src/routes/orderRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
