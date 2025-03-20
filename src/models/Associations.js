const User = require('./User');
const Reservation = require('./Reservation');
const Flight = require('./Flight');
const Airport = require('./Airport');

// Relaciones entre usuarios y reservas
User.hasMany(Reservation, {
  foreignKey: 'user_id',
  as: 'reservations'
});
Reservation.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

Flight.hasMany(Reservation, {
  foreignKey: 'flight_id',
  as: 'reservations'
});
Reservation.belongsTo(Flight, {
  foreignKey: 'flight_id',
  as: 'flight'
});

Airport.hasMany(Flight, {
  foreignKey: 'departure_airport_id',
  as: 'departingFlights'
});
Airport.hasMany(Flight, {
  foreignKey: 'destination_airport_id',
  as: 'arrivingFlights'
});

Flight.belongsTo(Airport, {
  foreignKey: 'departure_airport_id',
  as: 'departureAirport'
});
Flight.belongsTo(Airport, {
  foreignKey: 'destination_airport_id',
  as: 'destinationAirport'
});

module.exports = { User, Reservation, Flight, Airport };
