const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Setup Multer for file uploads

// 1. Import the Controllers
const { 
  addActivity, 
  uploadActivity,    // <--- Ensure this is imported!
  deleteAllActivities 
} = require('../controllers/activityController');

// 2. Define the Routes
router.post('/', addActivity); // Manual Entry

// The Upload Route (This was likely causing the crash)
router.post('/upload', upload.single('csvFile'), uploadActivity); 

// The Cleanup Route
router.delete('/all', deleteAllActivities);

module.exports = router;