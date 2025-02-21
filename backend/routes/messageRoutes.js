const express = require("express");
const { authenticate } = require("../middleware/authenticate");
const {
  getMessages,
  getUsersForSidebar,
} = require("../controllers/messageController");

const router = express.Router();

router.get("/user", authenticate, getUsersForSidebar);

router.get("/:id", authenticate, getMessages);

module.exports = router;
