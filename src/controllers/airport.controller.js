const Airport = require('../models/Airport');

exports.getAllAirports = async (req, res) => {
  try {
    const airports = await Airport.findAll();
    res.json(airports);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching airports' });
  }
};

exports.getAirportById = async (req, res) => {
  try {
    const airport = await Airport.findByPk(req.params.id);
    if (!airport) return res.status(404).json({ error: 'Airport not found' });
    res.json(airport);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching airport' });
  }
};

exports.createAirport = async (req, res) => {
  try {
    const airport = await Airport.create(req.body);
    res.status(201).json(airport);
  } catch (error) {
    res.status(500).json({ error: 'Error creating airport' });
  }
};

exports.updateAirport = async (req, res) => {
  try {
    const airport = await Airport.findByPk(req.params.id);
    if (!airport) return res.status(404).json({ error: 'Airport not found' });
    await airport.update(req.body);
    res.json(airport);
  } catch (error) {
    res.status(500).json({ error: 'Error updating airport' });
  }
};

exports.deleteAirport = async (req, res) => {
  try {
    const airport = await Airport.findByPk(req.params.id);
    if (!airport) return res.status(404).json({ error: 'Airport not found' });
    await airport.destroy();
    res.json({ message: 'Airport deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting airport' });
  }
};
