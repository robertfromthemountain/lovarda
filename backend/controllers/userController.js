// backend/controllers/userController.js
const db = require('../models/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Regisztrációs logika
const registerUser = (req, res) => {
  const { name, email, password } = req.body;

  const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkUserQuery, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Adatbázis hiba', details: err.message });
    }
    if (results.length > 0) {
      return res.status(400).json({ message: 'Az emaillel már regisztráltak!' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const insertUserQuery = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    
    db.query(insertUserQuery, [name, email, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Adatbázis hiba', details: err.message });
      }
      res.status(201).json({ message: 'Sikeres regisztráció!' });
    });
  });
};

// Bejelentkezési logika
const loginUser = (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Adatbázis hiba', details: err.message });
    }
    if (results.length === 0) {
      return res.status(401).json({ message: 'Hibás email vagy jelszó!' });
    }

    const user = results[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Hibás email vagy jelszó!' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  });
};

module.exports = { registerUser, loginUser };
