const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const horseController = require('../controllers/horseController');
const userController = require('../controllers/userController');
const messageController = require('../controllers/messageController');


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

// Felhasználói végpontok
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Lovas végpontok
router.get('/horses', horseController.getAllHorses);  // Lovak lekérése
router.post('/horses', upload.single('image'), horseController.addHorse);  // Ló hozzáadása képfeltöltéssel
router.delete('/horses/:id', horseController.deleteHorse);  // Ló törlése ID alapján

// Üzenetes végpontok
router.post('/messages', messageController.createMessage);
router.get('/messages', messageController.getMessages);

module.exports = router;
