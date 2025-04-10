const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { authenticate } = require("../AuthToken/auth");
const SECRET_KEY = process.env.SECRET_KEY;
const joi_validation = require('../Validation/validate');

const register = async (req, res) => {
  try {
    const { error } = joi_validation.JoiValidate.validate(req.body);
    if (!error) {

      const { username, password, email } = req.body;

      if (!username || username.trim() === "") {
        return res.status(400).json({ message: "Username is required" });
      }

      if (!password || password.trim() === "") {
        return res.status(400).json({ message: "Password is required" });
      }

      const user = await userModel.findOne({ username });

      if (user) {
        return res.status(400).json({ message: "user already exists" });
      }
      const hashed_password = await bcrypt.hash(password, 10);
      const newUser = await userModel({
        username,
        password: hashed_password,
        email,
      });
      newUser.save();
      if (newUser) {
        const token = authenticate(newUser);
        return res.status(201).json({ message: "Register Successfully", token });
      }


    }
    else {
      const errorMessage = error.details[0].message;
      return res.status(401).json({ message: errorMessage });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username });

    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = authenticate(user);
    return res
      .status(200)
      .json({ message: "Logged successfully", token});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = { register, login };
