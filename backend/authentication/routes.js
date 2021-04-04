const express = require("express");
const PageCtrl = require("./authentication");
const router = express.Router();

router.post("/loggingUser", PageCtrl.loggingUser);
router.post("/registerUser", PageCtrl.registerUser);

module.exports = router;
