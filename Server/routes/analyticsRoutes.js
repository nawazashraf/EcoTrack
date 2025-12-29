const express = require('express');
const router = express.Router();
const { getOverview, getTrends, getPrediction } = require('../controllers/analyticsController');

router.get('/overview', getOverview);
router.get('/trends', getTrends);
router.get('/predict', getPrediction);

module.exports = router;