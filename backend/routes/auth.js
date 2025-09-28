const express = require("express");
const router = express.Router();
const { send_signup_otp,send_login_otp, signup,login,logout,check } = require('../controller/authController');
const {otpLimiter,loginLimiter} = require("../utils/HelperFunc");
const {requireAuth}=require("../middleware/check");

//Signup
router.post('/send-sign-otp',otpLimiter,send_signup_otp);
router.post('/signup',signup);

//Login
router.post('/send-login-otp',otpLimiter,send_login_otp);
router.post('/login',loginLimiter,login);

//Logut
router.post('/logout',requireAuth,logout);

//checking
router.get('/check',check);

module.exports = router;