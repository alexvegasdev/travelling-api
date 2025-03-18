const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/ReservationController');
const authMiddleware = require('../middlewares/AuthMiddleware');

router.get('/', authMiddleware, ReservationController.getAllReservations);
router.get('/:id', authMiddleware, ReservationController.getReservationById);
router.post('/', authMiddleware, ReservationController.createReservation);
router.put('/:id', authMiddleware, ReservationController.updateReservation);
router.delete('/:id', authMiddleware, ReservationController.deleteReservation);

module.exports = router;