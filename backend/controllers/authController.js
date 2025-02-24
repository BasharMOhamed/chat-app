// register
const cloudinary = require("../config/cloudinary");
const generateToken = require("../lib/utils");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const userRegister = async (req, res) => {
  const { fullname, email, password } = req.body;
  console.log(email, password, fullname);
  try {
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ fullname, email, password: hashedPassword });
    generateToken(newUser._id, res);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
    generateToken(user._id, res);
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const userLogout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "loggedout Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateProfile = async (req, res) => {
  // res.status(200).json({ message: "updated successfully" });
  try {
    const { profilePic } = req.body;
    const { _id } = req.user;
    if (!profilePic) {
      return res
        .status(400)
        .json({ message: "Please select a profile picture" });
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const user = await User.findByIdAndUpdate(
      _id,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  userRegister,
  userLogin,
  userLogout,
  updateProfile,
  checkAuth,
};
