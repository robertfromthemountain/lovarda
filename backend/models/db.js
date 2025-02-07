// backend/models/db.js
const mysql = require('mysql2');
require('dotenv').config(); // Környezeti változók betöltése

// Adatbázis kapcsolat beállítása
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Csatlakozás az adatbázishoz
connection.connect((err) => {
  if (err) {
    console.error('Hiba a MySQL kapcsolódásnál:', err.message);
    return;
  }
  console.log('Sikeresen csatlakozva a MySQL adatbázishoz!');
});

module.exports = connection;
