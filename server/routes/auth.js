const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const { login, register } = require("../controllers/auth");
const { getStores } = require("../controllers/store");

router.post("/register", register);
router.post("/login", login);
router.post("/store", getStores);
// router.get('/logout', logout);

module.exports = router;
