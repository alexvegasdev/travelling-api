const express = require('express');
const router = express.Router();
const DestinationController = require('../controllers/DestinationController');

router.get('/', DestinationController.getAllDestinations);
router.get('/:id', DestinationController.getDestinationById);
router.post('/', DestinationController.createDestination);
router.put('/:id', DestinationController.updateDestination);
router.delete('/:id', DestinationController.deleteDestination);

module.exports = router;
