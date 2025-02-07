// backend/routes/api.js
const express = require('express');
const router = express.Router();

// Controller importálása
const horseController = require('../controllers/horseController');

// API végpontok
router.get('/horses', horseController.getAllHorses);
router.post('/horses', horseController.addHorse);
router.delete('/horses/:id', horseController.deleteHorse);

module.exports = router;
