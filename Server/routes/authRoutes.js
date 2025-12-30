const express = require('express');
const router = express.Router();
const { register, login, getMe, clerkSync } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/me', getMe);
router.post('/clerk-sync', clerkSync);
 
module.exports = router;