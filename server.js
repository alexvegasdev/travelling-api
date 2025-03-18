require('dotenv').config();
require('./models/Associations');
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

const userRoutes = require('./routes/UserRoutes');
const destinationRoutes = require('./routes/DestinationRoutes');
const reservationRoutes = require('./routes/ReservationRoutes');
const authRoutes = require('./routes/AuthRoutes');


const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: '*'
}));

app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/auth', authRoutes);

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
