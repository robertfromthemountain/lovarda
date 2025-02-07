// backend/server.js

const express = require('express');
const dotenv = require('dotenv');
const app = express();
const port = process.env.PORT || 3000;

// Környezeti változók betöltése
dotenv.config();

// Middleware a JSON adatok feldolgozásához
app.use(express.json());

// API router importálása
const apiRouter = require('./routes/api');
app.use('/api', apiRouter);

// Alap végpont teszteléshez
app.get('/', (req, res) => {
  res.send('API fut!');
});

// 404-es hiba kezelése
app.use((req, res, next) => {
  res.status(404).send('Az oldal nem található!');
});

// Általános hiba kezelése
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Valami hiba történt!');
});

// Szerver indítása
app.listen(port, () => {
  console.log(`Szerver fut a ${port} porton`);
});
