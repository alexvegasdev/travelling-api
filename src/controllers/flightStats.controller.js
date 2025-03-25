const { QueryTypes } = require('sequelize');
const sequelize = require('../config/database');

exports.getFlightCounts = async (req, res) => {
  try {
    const flights = await sequelize.query(
      `SELECT destination_airport_id, COUNT(id) AS flight_count 
       FROM flights 
       GROUP BY destination_airport_id`,
      { type: QueryTypes.SELECT }
    );

    res.json(flights);
  } catch (error) {
    console.error('🔥 ERROR en getFlightCounts:', error);
    res.status(500).json({ 
      error: 'Error fetching flight count', 
      details: error.message 
    });
  }
};
