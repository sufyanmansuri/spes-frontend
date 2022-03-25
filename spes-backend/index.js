const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
const argon2 = require("argon2");
const { jwt_secret } = require("./keys");
const AdminJS = require("adminjs");
const AdminJSMongoose = require("@adminjs/mongoose");
const AdminJSExpress = require("@adminjs/express");
const passwordFeature = require("@adminjs/passwords");
AdminJS.registerAdapter(AdminJSMongoose);

app.use(cors());
app.use(express.json());

const run = async () => {
  const mongooseDb = await mongoose.connect(
    "mongodb+srv://typingmistake:ekthatiger@cluster0.yfwcd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );

  const adminJs = new AdminJS({
    databases: [mongooseDb],
    rootPath: "/admin",
    resources: [
      {
        resource: User,
        options: {
          navigation: {
            icon: "Events",
          },
          listProperties: ["_id", "email", "name", "createdAt", "updatedAt"],
          properties: { encrypted: { isVisible: false } },
          editProperties: ["email", "name", "quote","password"],
        },
        features: [
          passwordFeature({
            properties: {
              encryptedPassword: "password",
            },
            hash: argon2.hash,
          }),
        ],
      },
    ],
    branding: {
      companyName: "SPES",
      favicon: "http://localhost:3000/favicon.ico",
    },
  });

  const router = AdminJSExpress.buildRouter(adminJs);
  app.use(adminJs.options.rootPath, router);
};

run();

// ## Login & Register #############################333
app.post("/api/register", async (req, res) => {
  try {
    const newPassword = await argon2.hash(req.body.password);
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    });
    res.json({ status: "ok" });
  } catch (e) {
    res.json({ status: "error", error: e });
  }
});
app.post("/api/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    const isPasswordValid = await argon2.verify(
      user.password,
      req.body.password
    );
    if (!user) {
      return res.json({ status: "error", error: "Invalid email or password" });
    }
    if (isPasswordValid) {
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
// ##############################################

// ## Dashboard ##################################
app.get("/api/dashboard", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, jwt_secret);
    const email = decoded.email;
    const user = await User.findOne({ email: email });

    return res.json({ status: "ok", name: user.name });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

app.post("/api/quote", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, jwt_secret);
    const email = decoded.email;
    await User.updateOne({ email: email }, { $set: { name: req.body.name } });

    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});
// ###############################################

app.get("/status", (req, res) => {
  console.log("Hello");
});

app.listen(1337, () => {
  console.log("Server started on 1337");
});
