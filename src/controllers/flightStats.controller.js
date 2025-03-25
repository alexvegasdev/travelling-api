const { QueryTypes } = require("sequelize");
const sequelize = require("../config/database");

exports.getFlightCounts = async (req, res) => {
  try {
    const flights = await sequelize.query(
      `SELECT a.name AS airport_name, a.country, COUNT(f.id) AS flight_count 
       FROM flights f
       JOIN airports a ON f.destination_airport_id = a.id
       GROUP BY a.id, a.name, a.country`,
      { type: QueryTypes.SELECT }
    );

    res.json(flights);
  } catch (error) {
    console.error("🔥 ERROR en getFlightCounts:", error);
    res.status(500).json({
      error: "Error fetching flight count",
      details: error.message,
    });
  }
};
