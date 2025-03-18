const Destination = require('../models/Destination');

exports.getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.findAll(); 
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching destinations' });
  }
};

exports.getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findByPk(req.params.id);
    if (!destination) return res.status(404).json({ error: 'Destination not found' });
    res.json(destination);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching destination' });
  }
};

exports.createDestination = async (req, res) => {
  try {
    const destination = await Destination.create(req.body);
    res.status(201).json(destination);
  } catch (error) {
    res.status(500).json({ error: 'Error creating destination' });
  }
};

exports.updateDestination = async (req, res) => {
  try {
    const destination = await Destination.findByPk(req.params.id);
    if (!destination) return res.status(404).json({ error: 'Destination not found' });
    await destination.update(req.body);
    res.json(destination);
  } catch (error) {
    res.status(500).json({ error: 'Error updating destination' });
  }
};

exports.deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findByPk(req.params.id);
    if (!destination) return res.status(404).json({ error: 'Destination not found' });
    await destination.destroy();
    res.json({ message: 'Destination deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting destination' });
  }
};
