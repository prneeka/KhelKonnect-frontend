const express = require("express");
const router = express.Router();
const {requireAuth}=require("../middleware/check")
const {createtournament,organdash}=require("../controller/oragnizerController")

router.post("/create-tournament",requireAuth,createtournament);

router.get("/dashboard",requireAuth,organdash);

module.exports = router;

