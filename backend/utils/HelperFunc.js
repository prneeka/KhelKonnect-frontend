const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
const { admin, db } = require("../config/firebaseConfig");
//helper functions
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };
  
async function saveOtp(email, otp, ipAddress) {
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  await db.collection("otps").doc(email).set({
    email,
    otp,
    expiresAt,
    attempts: 0,
    ipAddress,
  });
}

async function verifyOtp(email, submittedOtp,ipAddress) {
  const doc = await db.collection("otps").doc(email).get();
  if (!doc.exists) return { success: false, message: "OTP not found" };
  const data = doc.data();
  console.log('sd');
  if (data.ipAddress !== ipAddress) {
    return { success: false, message: "IP address mismatch" };
  }
  if (new Date() > data.expiresAt.toDate()) {
    return { success: false, message: "OTP expired" };
  }

  if (data.otp !== submittedOtp) {
    await db.collection("otps").doc(email).update({
      attempts: admin.firestore.FieldValue.increment(1),
    });
    return { success: false, message: "Invalid OTP" };
  }

  // OTP valid
  await db.collection("otps").doc(email).delete(); // Clean up
  return { success: true };
}


const sender = nodemailer.createTransport({
  service: 'gmail',
  pool: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});
const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many OTP requests, please try again later',
  skipSuccessfulRequests: true
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Too many login attempts, please try again later',
  skipSuccessfulRequests: true
});

function getExpectedScore(ratingA, ratingB) {
  return 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
}

function getDynamicK(totalPlayers) {
  const k = 10 + Math.log2(totalPlayers) * 4;
  return Math.min(40, Math.round(k));
}

function updateRatings(ratingA, ratingB, scoreA, totalPlayers) {
  const scoreB = 1 - scoreA;
  const expectedA = getExpectedScore(ratingA, ratingB);
  const expectedB = getExpectedScore(ratingB, ratingA);
  const k = getDynamicK(totalPlayers);

  const newRatingA = Math.round(ratingA + k * (scoreA - expectedA));
  const newRatingB = Math.round(ratingB + k * (scoreB - expectedB));

  return { newRatingA, newRatingB };
}
module.exports={sender,generateOTP,saveOtp,verifyOtp,otpLimiter,loginLimiter};