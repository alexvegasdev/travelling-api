const User = require('./User');
const Destination = require('./Destination');
const Reservation = require('./Reservation');

User.hasMany(Reservation, { foreignKey: 'user_id', as: 'reservations' });
Reservation.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Destination.hasMany(Reservation, { foreignKey: 'destination_id', as: 'reservations' });
Reservation.belongsTo(Destination, { foreignKey: 'destination_id', as: 'destination' });

module.exports = { User, Destination, Reservation };
