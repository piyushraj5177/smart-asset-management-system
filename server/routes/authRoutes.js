const express = require("express");

const {
  registerUser,
  loginUser,
  forgotPassword,
} = require("../controllers/authController");

const router = express.Router();



// REGISTER
router.post("/register", registerUser);



// LOGIN
router.post("/login", loginUser);



// FORGOT PASSWORD
router.post(
  "/forgot-password",
  forgotPassword
);



module.exports = router;