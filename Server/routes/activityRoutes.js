const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const { 
  addActivity, 
  uploadActivity, 
  deleteAllActivities 
} = require('../controllers/activityController');

router.post('/', addActivity);

router.post('/upload', upload.single('csvFile'), uploadActivity); 

router.delete('/all', deleteAllActivities);

module.exports = router;
