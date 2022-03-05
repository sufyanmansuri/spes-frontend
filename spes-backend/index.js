const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { jwt_secret } = require("./keys");

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://typingmistake:ekthatiger@cluster0.yfwcd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

app.post("/api/register", async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.json({ status: "ok", user: true });
  } catch (e) {
    res.json({ status: "error", error: e });
  }
});
app.post("/api/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (user) {
      const token = jwt.sign(
        { email: user.email, name: user.name },
        jwt_secret
      );
      res.json({ status: "ok", user: token });
    }
  } catch (e) {
    res.json({ status: "error", error: e });
  }
});
app.get("/status", (req, res) => {
  console.log("Hello");
});

app.listen(1337, () => {
  console.log("Server started on 1337");
});


