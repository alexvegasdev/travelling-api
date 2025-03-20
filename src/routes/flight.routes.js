const express = require('express');
const router = express.Router();
const FlightController = require('../controllers/flight.controller');

router.get('/', FlightController.getAllFlights);
router.get('/:id', FlightController.getFlightById);
router.post('/', FlightController.createFlight);
router.patch('/:id', FlightController.updateFlight);
router.delete('/:id', FlightController.deleteFlight);

module.exports = router;
