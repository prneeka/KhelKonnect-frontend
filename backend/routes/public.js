const express = require("express");
const router = express.Router();
const {requireAuth}=require("../middleware/check")
const {getalltournaments}=require("../controller/publiccontroller");

router.get('/alltournaments', requireAuth, getalltournaments);

module.exports = router;