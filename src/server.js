require('dotenv').config();
require('./models/Associations');
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

const userRoutes = require('./routes/user.routes');
const reservationRoutes = require('./routes/reservation.routes');
const authRoutes = require('./routes/auth.routes');
const airportRoutes = require('./routes/airport.routes');
const flightRoutes = require('./routes/flight.routes');

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: '*'
}));

app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/airports', airportRoutes);
app.use('/api/flights', flightRoutes); 

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log('🔹 Connected to the database.');
    return sequelize.sync();
  })
  .then(() => {
    console.log('🔹 Database synchronized.');
    app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
  })
  .catch(error => console.error('❌ Database connection error:', error));
