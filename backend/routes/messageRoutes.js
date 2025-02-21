const express = require("express");
const { authenticate } = require("../middleware/authenticate");
const {
  getMessages,
  getUsersForSidebar,
  sendMessage,
} = require("../controllers/messageController");

const router = express.Router();

router.get("/user", authenticate, getUsersForSidebar);

router.get("/:id", authenticate, getMessages);

router.post("/send/:id", authenticate, sendMessage);

module.exports = router;
