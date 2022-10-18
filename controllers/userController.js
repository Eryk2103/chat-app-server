const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { json } = require("express");

const register = async (req, res) => {
  try {
    if (exists(req.body.username)) {
      res.status(400), json({ message: "invalid user data" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const user = await User.create({
        username: req.body.username,
        password: hashedPassword,
      });
      res.status(201).json({
        username: user.username,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err.message);
  }
};
const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      username: user.username,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "invlaid password or user name" });
  }
};
const me = async (req, res) => {
  try {
    res.status(200).json({
      username: req.user.username,
    });
  } catch (err) {
    res.status(401).json({ message: "unathorized" });
    console.log(err.message);
  }
};

//Private functions
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: "60m",
  });
};
const exists = async (username) => {
  const user = await User.find({ username: username });
  if (user.length > 0) {
    return true;
  }
  return false;
};

module.exports = { register, login, me };
