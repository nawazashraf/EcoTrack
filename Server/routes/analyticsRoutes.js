const express = require('express');
const router = express.Router();
const { getOverview, getTrends, getPrediction, getRecommendations, getComparison, getEmissionBySource} = require('../controllers/analyticsController');

router.get('/overview', getOverview);
router.get('/trends', getTrends);
router.get('/predict', getPrediction);
router.get('/recommendations', getRecommendations);
router.get('/compare', getComparison);
router.get('/source', getEmissionBySource);

module.exports = router;
