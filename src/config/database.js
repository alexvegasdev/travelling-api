require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  dialectOptions: {
    options: {
      encrypt: true,
      trustServerCertificate: false,
    },
  },
  logging: false,
});

sequelize.authenticate()
  .then(() => console.log('✅ Conectado a SQL Server en Azure'))
  .catch(err => console.error('❌ Error de conexión:', err));

module.exports = sequelize;
