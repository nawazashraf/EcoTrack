const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer();
const { createUser } = require("../controllers/userController");

router.post("/create-user", upload.none(), createUser);

module.exports = router;