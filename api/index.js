require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const md5 = require("md5");

// App Setup
const app = express();
app.use(bodyParser.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// DB Setup
mongoose.connect(process.env.DBCODE);
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  instruments: [String],
  days: [String],
});
const User = new mongoose.model("User", userSchema);

// Get Requests
app.get("/", (req, res) => {
  res.sendStatus(200);
});

// Post Requests
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    username: username,
    password: md5(password),
  });
  if (user) {
    res.send("OK");
  } else {
    res.send("NO");
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { name, username, password, instruments } = req.body;
    const alreadyUser = await User.findOne({username: username});
    if (!alreadyUser){
        await User.insertMany([
            {
              name: name,
              username: username,
              password: md5(password),
              instruments: instruments,
              days: [],
            },
          ]);
          res.send("OK");
    }
    else {
        res.send("MULTI");
    }
  } catch (err) {
    res.send("NO");
  }
});

// Listen
app.listen(process.env.PORT, () => {
  console.log("API Listening on port " + process.env.PORT);
});
