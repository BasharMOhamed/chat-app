const cloudinary = require("../config/cloudinary");
const Message = require("../models/message");
const User = require("../models/user");

const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const Users = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );
    res.status(200).json(Users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getMessages = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const secondUserId = req.params.id;

    const messages = await Message.find({
      $or: [
        { senderId: loggedInUserId, receiverId: secondUserId },
        { senderId: secondUserId, receiverId: loggedInUserId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const loggedInUserId = req.user._id;
    const secondUserId = req.params.id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = new Message({
      senderId: loggedInUserId,
      receiverId: secondUserId,
      text,
      image: imageUrl,
    });
    await newMessage.save();
    // todo: realtime functionality goes here => socket.io
    res.status(201).json(newMessage);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getMessages, getUsersForSidebar, sendMessage };
