const userModel = require("../models/user-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.registerUser = async function (req, res) {
  try {
    const existingUser = await userModel.findOne({
      userEmail: req.userData.userEmail,
    });
    if (existingUser) {
      return res.status(409).json({ message: "email already registered" });
    }
    const user = await userModel.create({
      userName: req.userData.userName,
      userEmail: req.userData.userEmail,
      userPassword: req.userData.userPassword,
      agreeTermAndCondition: req.userData.agreeTermAndCondition,
      emailNotification: req.userData.emailNotification,
    });

    const userResponse = user.toObject();
    delete userResponse.userPassword;
    return res
      .status(201)
      .json({ message: " register successfully", data: userResponse });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.loginUser = async function (req, res) {
  try {
    const { userEmail, userPassword } = req.userData;
    // we exclude in schema of userPassword so by default in user there isn't any retrieve of userPassword bcoz of schema which is good but we need userPassword  in comparing so we change query  findOne({}).select("+userPassword")  this will Add .select("+userPassword") to include the hidden field
    const user = await userModel
      .findOne({ userEmail: userEmail })
      .select("+userPassword");
    if (!user) {
      return res.status(401).json({ message: "invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(
      userPassword,
      user.userPassword,
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "invalid email or password",
      });
    }
    const token = jwt.sign(
      { userId: user._id, userEmail: user.userEmail },
      process.env.JWT_KEY,
      { expiresIn: "1d" },
    );

    // 4. Cookie Configuration Options
    const cookieOptions = {
      httpOnly: true, // Prevents client-side JS (XSS) from reading the cookie
      // secure: process.env.NODE_ENV === "production", // Transmit ONLY over HTTPS in production
      sameSite: "lax", // Protects against Cross-Site Request Forgery (CSRF)
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds (matches JWT expiration)
    };

    const userResponse = user.toObject();
    delete userResponse.userPassword;

    return res.status(200).cookie("token", token, cookieOptions).json({
      message: "login successfull",
     
      data: userResponse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};
