const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Flight = sequelize.define('Flight', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  airline: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  departure_airport_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  destination_airport_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  departure_datetime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  arrival_datetime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  },
  image_url: {
    type: DataTypes.STRING(1000),
    allowNull: false
  }
}, {
  tableName: 'flights',
  timestamps: false
});

module.exports = Flight;
