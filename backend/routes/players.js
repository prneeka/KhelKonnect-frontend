const express = require("express");
const router = express.Router();
const {requireAuth}=require("../middleware/check")
const {applytournament,playerdash}=require("../controller/playerController");

router.post("/apply-tournament",requireAuth,applytournament);
router.get("/dashboard",requireAuth,playerdash);


module.exports = router;