const Reservation = require('../models/Reservation');
const User = require('../models/User');
const Destination = require('../models/Destination');

exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll({ include: ['user', 'destination'] });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reservations' });
  }
};

exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id, { include: ['user', 'destination'] });
    if (!reservation) return res.status(404).json({ error: 'Reservation not found' });
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reservation' });
  }
};

const moment = require('moment');

exports.createReservation = async (req, res) => {
  try {
    req.body.date = moment(req.body.date).format('YYYY-MM-DD');
    const reservation = await Reservation.create(req.body);
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ error: 'Error creating reservation', details: error.message });
  }
};



exports.updateReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);
    if (!reservation) return res.status(404).json({ error: 'Reservation not found' });
    await reservation.update(req.body);
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ error: 'Error updating reservation' });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);
    if (!reservation) return res.status(404).json({ error: 'Reservation not found' });
    await reservation.destroy();
    res.json({ message: 'Reservation deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting reservation' });
  }
};
