const mysql = require('mysql2'); // or 'mysql' if you’re using that package
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASENAME,
  port: process.env.DB_PORT
}).promise();

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the database.');
  }
});

module.exports = db;
