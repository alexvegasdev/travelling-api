const Flight = require('../models/Flight');
const Airport = require('../models/Airport');
const moment = require('moment'); 

exports.getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.findAll({
      include: [
        { model: Airport, as: 'departureAirport', attributes: ['id', 'name'] },
        { model: Airport, as: 'destinationAirport', attributes: ['id', 'name'] }
      ]
    });

    // Agregar duración de vuelo calculada a cada vuelo
    const flightsWithDuration = flights.map(flight => {
      const departureDatetime = new Date(flight.departure_datetime);
      const arrivalDatetime = new Date(flight.arrival_datetime);

      // Calcular la duración en horas y minutos
      const durationInMs = arrivalDatetime - departureDatetime;
      const durationInHours = Math.floor(durationInMs / (1000 * 60 * 60));
      const durationInMinutes = Math.floor((durationInMs % (1000 * 60 * 60)) / (1000 * 60));

      // Agregar la duración al objeto de vuelo
      flight.dataValues.duration = `${durationInHours} horas y ${durationInMinutes} minutos`;
      return flight;
    });

    // Enviar los vuelos con la duración calculada
    res.json(flightsWithDuration);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching flights' });
  }
};

exports.getFlightById = async (req, res) => {
  try {
    const flight = await Flight.findByPk(req.params.id, {
      include: [
        { model: Airport, as: 'departureAirport', attributes: ['id', 'name'] },
        { model: Airport, as: 'destinationAirport', attributes: ['id', 'name'] }
      ]
    });

    if (!flight) return res.status(404).json({ error: 'Flight not found' });

    // Calcular la duración del vuelo
    const departureDatetime = new Date(flight.departure_datetime);
    const arrivalDatetime = new Date(flight.arrival_datetime);
    const durationInMs = arrivalDatetime - departureDatetime;
    const durationInHours = Math.floor(durationInMs / (1000 * 60 * 60));
    const durationInMinutes = Math.floor((durationInMs % (1000 * 60 * 60)) / (1000 * 60));

    // Agregar la duración al objeto de vuelo
    flight.dataValues.duration = `${durationInHours} horas y ${durationInMinutes} minutos`;

    res.json(flight);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching flight' });
  }
};

exports.createFlight = async (req, res) => {
  try {
    // Elimina la zona horaria "Z" y formatea las fechas a un formato adecuado para SQL Server
    req.body.departure_datetime = moment(req.body.departure_datetime).utc().format('YYYY-MM-DD HH:mm:ss');
    req.body.arrival_datetime = moment(req.body.arrival_datetime).utc().format('YYYY-MM-DD HH:mm:ss');

    // Crea el vuelo con los datos procesados
    const flight = await Flight.create(req.body);
    res.status(201).json(flight);
  } catch (error) {
    res.status(500).json({ 
      error: 'Error creating flight', 
      details: error.message 
    });
  }
};

exports.updateFlight = async (req, res) => {
  try {
    const flight = await Flight.findByPk(req.params.id);
    if (!flight) return res.status(404).json({ error: 'Flight not found' });
    await flight.update(req.body);
    res.json(flight);
  } catch (error) {
    res.status(500).json({ error: 'Error updating flight' });
  }
};

exports.deleteFlight = async (req, res) => {
  try {
    const flight = await Flight.findByPk(req.params.id);
    if (!flight) return res.status(404).json({ error: 'Flight not found' });
    await flight.destroy();
    res.json({ message: 'Flight deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting flight' });
  }
};
