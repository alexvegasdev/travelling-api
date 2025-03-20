const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/reservation.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware, ReservationController.getAllReservations);
router.get('/:id', authMiddleware, ReservationController.getReservationById);
router.post('/', authMiddleware, ReservationController.createReservation);
router.patch('/:id', authMiddleware, ReservationController.updateReservation);
router.delete('/:id', authMiddleware, ReservationController.deleteReservation);

module.exports = router;
