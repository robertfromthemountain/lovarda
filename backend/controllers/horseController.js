// backend/controllers/horseController.js
const db = require('../models/db');

// Lovak lekérése
const getAllHorses = (req, res) => {
  const query = 'SELECT * FROM horses';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

// Új ló hozzáadása
const addHorse = (req, res) => {
  const { name, breed, age } = req.body;
  const query = 'INSERT INTO horses (name, breed, age) VALUES (?, ?, ?)';
  db.query(query, [name, breed, age], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Ló hozzáadva!', horseId: result.insertId });
  });
};

// Ló törlése ID alapján
const deleteHorse = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM horses WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Ló törölve!' });
  });
};

module.exports = { getAllHorses, addHorse, deleteHorse };
