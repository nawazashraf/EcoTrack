const express = require('express');
const router = express.Router();
const { getOverview, getTrends, getPrediction, getRecommendations } = require('../controllers/analyticsController');

router.get('/overview', getOverview);
router.get('/trends', getTrends);
router.get('/predict', getPrediction);
router.get('/recommendations', getRecommendations);

module.exports = router;
