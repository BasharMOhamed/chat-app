const express = require("express");
const {
  userRegister,
  userLogin,
  userLogout,
  updateProfile,
  checkAuth,
} = require("../controllers/authController");
const { authenticate } = require("../middleware/authenticate");

const router = express.Router();

router.post("/sign-in", userLogin);

router.post("/sign-up", userRegister);

router.get("/logout", userLogout);

router.put("/update-profile", authenticate, updateProfile);

router.get("/check", authenticate, checkAuth);

module.exports = router;
