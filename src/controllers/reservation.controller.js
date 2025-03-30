const Reservation = require('../models/Reservation');
const User = require('../models/User');
const Flight = require('../models/Flight');
const Airport = require('../models/Airport');
const moment = require('moment');

exports.getAllReservations = async (req, res) => {
  try {
    // Obtener las reservas solo del usuario autenticado
    const reservations = await Reservation.findAll({
      where: { user_id: req.user.userId },  // Filtrar por el id del usuario
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
        {
          model: Flight,
          as: 'flight',
          attributes: ['id', 'airline', 'price', 'departure_datetime', 'arrival_datetime','image_url'],
          include: [
            { model: Airport, as: 'departureAirport', attributes: ['id', 'name'] },
            { model: Airport, as: 'destinationAirport', attributes: ['id', 'name'] }
          ]
        }
      ]
    });

    const reservationsWithDuration = reservations.map(reservation => {
      const departureDatetime = new Date(reservation.flight.departure_datetime);
      const arrivalDatetime = new Date(reservation.flight.arrival_datetime);
      const durationInMs = arrivalDatetime - departureDatetime;
      const durationInHours = Math.floor(durationInMs / (1000 * 60 * 60));
      const durationInMinutes = Math.floor((durationInMs % (1000 * 60 * 60)) / (1000 * 60));

      reservation.dataValues.duration = `${durationInHours} horas y ${durationInMinutes} minutos`;
      return reservation;
    });

    res.json(reservationsWithDuration);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reservations' });
  }
};

exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id, {
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
        {
          model: Flight,
          as: 'flight',
          attributes: ['id', 'airline', 'price', 'departure_datetime', 'arrival_datetime', 'image_url'],
          include: [
            { model: Airport, as: 'departureAirport', attributes: ['id', 'name'] },
            { model: Airport, as: 'destinationAirport', attributes: ['id', 'name'] }
          ]
        }
      ]
    });

    if (!reservation) return res.status(404).json({ error: 'Reservation not found' });

    const departureDatetime = new Date(reservation.flight.departure_datetime);
    const arrivalDatetime = new Date(reservation.flight.arrival_datetime);
    const durationInMs = arrivalDatetime - departureDatetime;
    const durationInHours = Math.floor(durationInMs / (1000 * 60 * 60));
    const durationInMinutes = Math.floor((durationInMs % (1000 * 60 * 60)) / (1000 * 60));

    reservation.dataValues.duration = `${durationInHours} horas y ${durationInMinutes} minutos`;

    if (reservation.user_id !== req.user.userId) {
      return res.status(403).json({ error: 'No tienes permisos para ver esta reserva' });
    }

    res.json(reservation);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reservation' });
  }
};

exports.createReservation = async (req, res) => {
  try {
    req.body.reservation_date = moment(req.body.reservation_date).format('YYYY-MM-DD');

    const flight = await Flight.findByPk(req.body.flight_id);
    if (!flight) return res.status(404).json({ error: 'Flight not found' });

    const totalPrice = flight.price * req.body.passenger_count;

    // Crear la reserva con el precio total calculado
    const reservation = await Reservation.create({ 
      ...req.body, 
      total_price: totalPrice, 
      user_id: req.user.userId
    });

    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ error: 'Error creating reservation', details: error.message });
  }
};

exports.updateReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);
    if (!reservation) return res.status(404).json({ error: 'Reservation not found' });

    // Verificar que la reserva pertenece al usuario autenticado
    if (reservation.user_id !== req.user.userId) {
      return res.status(403).json({ error: 'No tienes permisos para actualizar esta reserva' });
    }

    if (req.body.passenger_count) {
      const flight = await Flight.findByPk(reservation.flight_id);
      if (flight) req.body.total_price = flight.price * req.body.passenger_count;
    }

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

    if (reservation.user_id !== req.user.userId) {
      return res.status(403).json({ error: 'No tienes permisos para eliminar esta reserva' });
    }

    await reservation.destroy();
    res.json({ message: 'Reservation deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting reservation' });
  }
};
