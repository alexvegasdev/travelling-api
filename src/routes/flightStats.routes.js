const express = require('express');
const router = express.Router();
const flightStatsController = require('../controllers/flightStats.controller');

router.get('/flight-counts', flightStatsController.getFlightCounts);

module.exports = router;
