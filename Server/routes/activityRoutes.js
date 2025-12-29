const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); 
const { addActivity, uploadCSV } = require('../controllers/activityController');

const mockAuth = (req, res, next) => {
  req.user = { id: "658e9c1a9f1b2a4d3e6f7a91", department: "Engineering" };
  next();
};

router.post('/', mockAuth,upload.none(), addActivity);
router.post('/upload', mockAuth, upload.single('csvFile'), uploadCSV);

module.exports = router;