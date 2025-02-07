const express = require('express');
const multer = require('multer');
const path = require('path');
const horseController = require('../controllers/horseController');

const router = express.Router();

// Multer konfigurálása
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');  // Képek mentése ebbe a mappába
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, uniqueSuffix);  // Egyedi fájlnév
  }
});

const upload = multer({ storage });

// API végpontok frissítése a frontendhez igazodva
router.get('/horses', horseController.getAllHorses);  // Lovak lekérése
router.post('/horses', upload.single('image'), horseController.addHorse);  // Ló hozzáadása képfeltöltéssel
router.delete('/horses/:id', horseController.deleteHorse);  // Ló törlése ID alapján

module.exports = router;
