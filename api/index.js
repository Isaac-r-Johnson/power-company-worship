require("dotenv").config();
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");


// App Setup
const app = express()
app.use(bodyParser.json({extended:true}));
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// DB Setup
mongoose.connect(process.env.DBCODE);
const userSchema = new mongoose.Schema({
    
});
const User = new mongoose.model('User', userSchema);


// Get Requests
app.get("/", (req, res) => {
    res.sendStatus(200);
});

// Post Requests


// Listen
app.listen(process.env.PORT, () => {
    console.log("API Listening on port " + process.env.PORT);
}); 