const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Reservation = sequelize.define('Reservation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  flight_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'flights',
      key: 'id'
    }
  },
  reservation_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  passenger_count: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  total_price: {
    type: DataTypes.DECIMAL(7,2),
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('pendiente', 'confirmado', 'cancelado'),
    allowNull: false
  }
}, {
  tableName: 'reservations',
  timestamps: false
});

module.exports = Reservation;
