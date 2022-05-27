const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");
const Assignments = require("./models/assignments");
const Attendance = require("./models/attendance");
const studentAssignments = require("./models/studentAssignment");
const Grades = require("./models/grades");
const Student = require("./models/student");
const Subject = require("./models/subject");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const argon2 = require("argon2");
const { jwt_secret } = require("./keys");
const AdminJS = require("adminjs");
const AdminJSMongoose = require("@adminjs/mongoose");
const AdminJSExpress = require("@adminjs/express");
const passwordFeature = require("@adminjs/passwords");


AdminJS.registerAdapter(AdminJSMongoose);

app.use(express.static('public'))
app.use(cors());
app.use(express.json());

const run = async () => {
  const mongooseDb = await mongoose.connect(
    "mongodb+srv://typingmistake:ekthatiger@cluster0.yfwcd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
  const canModifyUsers = ({ currentAdmin }) =>
    currentAdmin && currentAdmin.role === "admin";
  const adminJs = new AdminJS({
    databases: [mongooseDb],
    dashboard: {
      component: AdminJS.bundle("./components/CustomDashboard"),
    },
    rootPath: "/admin",
    resources: [
      {
        resource: User,
        options: {
          navigation: {
            icon: "Events",
          },
          editProperties: ["email", "name", "role", "password"],
          properties: {
            _id: {
              isTitle: true,
            },
            password: {
              type: "string",
              isVisible: {
                list: false,
                edit: true,
                filter: false,
                show: false,
              },
            },
          },
          actions: {
            new: {
              before: async (request) => {
                if (request.payload.password) {
                  request.payload = {
                    ...request.payload,
                    encryptedPassword: await bcrypt.hash(
                      request.payload.password,
                      10
                    ),
                    password: undefined,
                  };
                }
                return request;
              },
            },
            edit: { isAccessible: canModifyUsers },
            delete: { isAccessible: canModifyUsers },
            new: { isAccessible: canModifyUsers },
            show: { isAccessible: canModifyUsers },
          },
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
      {
        resource: Student,
        options: {
          navigation: {
            name: "Students",
            icon: "Education",
          },
          editProperties: [
            "email",
            "firstName",
            "lastName",
            "semester",
            "term",
          ],
          properties: {
            _id: {
              isVisible: false,
            },
          },
        },
      },
      {
        resource: Subject,
        options: {
          navigation: {
            icon: "Catalog",
          },
          editProperties: ["subName", "semester", "term"],
        },
      },
      {
        resource: Assignments,
        options: {
          editProperties: ["subject", "assignment", "lastDate"],
          navigation: {
            icon: "Task"
          },
          properties:{
            _id:{
              isVisible: false,
            },
            subject:{
              isTitle: true,
            },
          },
        },
      },
      {
        resource: studentAssignments,
        options: {
          editProperties: ["student", "assignment", "isSubmitted", "submissionDate"],
          navigation: {
            name: "Students",
          },
          properties:{
            _id: {
              isVisible: false,
            }
          }
        },
      },
      {
        resource: Attendance,
        options: {
          editProperties:["subject", "student", "attendance"],
          navigation: {
            name: "Students",
          },
          properties:{
            _id:{
              isVisible: false,
            },
          }
        },
      },
      {
        resource: Grades,
        options: {
          navigation: {
            icon: "Activity",
          },
          editProperties: ["student", "subject", "marks"],
        },
      },
    ],
    pages:{
      Report:{
        label: "Report",
        component: AdminJS.bundle("./components/CustomReportPage"),
      },
    },
    branding: {
      companyName: "SPES - Student Performance Evaluation System",
      favicon: "http://localhost:1337/favicon.ico",
      logo: "http://localhost:1337/logo.png",
      softwareBrothers: false,
    },
    locale: {
      translations: {
        messages: {
          loginWelcome: "To SPES - Student Performance Evaluation System.",
        },
      }
    },
  });

  const router = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
    authenticate: async (email, password) => {
      const user = await User.findOne({ email });
      if (user) {
        const matched = await argon2.verify(user.password, password);
        if (matched) {
          return user;
        }
      }
      return false;
    },
    cookiePassword: "some-secret-password-used-to-secure-cookie",
  });

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
