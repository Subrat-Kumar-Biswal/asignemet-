import express from "express";
// import dotenv from "dotenv";
const app = express();
import cors from "cors"; // Import the CORS middleware
import connectDb from "./db.js"; // Import the connectDb function from db.js
import userModel from "./models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser"; // Import the cookie-parser middleware
import { set } from "mongoose";
connectDb();

// Use CORS middleware
app.use(cors());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(express.json()); // Middleware to parse JSON request bodies

app.post("/register", async (req, res) => {
  try {
    const { name, email, password, conformPassword } = req.body;
    if (!name || !email || !password || !conformPassword) {
      return res.status(303).json({
        message: "all filled are require",
        success: false,
      });
    }
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(403).json({
        message: "email id already registerd",
        success: false,
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    userModel
      .create({
        name,
        email,
        password: hashPassword,
        conformPassword,
      })
      .then((data) => res.json(data))
      .catch((error) => console.log(error));
    return res.status(201).json({
      message: "account created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    console.log(password);
    console.log(email);
    return res.status(403).json({
      message: "email and password required",
      success: false,
    });
  }
  const user = await userModel.findOne({ email }); // this is the whole user
  // console.log(email);
  if (!user) {
    return res.status(403).json({
      message: "incorrect email",
      success: false,
    });
  }
  // const password1 = req.body.password;
  console.log(password);

  if (user.password !== password) {
    return res.status(403).json({
      message: "incorrect password",
      success: false,
    });
  } else {
    setTimeout(() => {
      return res.json({
        message: "password is correct",
        success: true,
      });
    }, 2500);
  }
});

app.listen(3000, () => {
  console.log("listen on port 3000 || http://localhost:3000");
});
