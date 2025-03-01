// backend/controllers/horseController.js
const db = require('../models/db');
const fs = require('fs');
const path = require('path');

// Lovak lekérése
const getAllHorses = (req, res) => {
    const query = 'SELECT * FROM horses';
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.length === 0) {
        return res.status(200).json([]);  // Üres tömb visszaadása
      }
      res.json(results);
    });
  };
  

// Új ló hozzáadása képfeltöltéssel
const addHorse = (req, res) => {
    const { name, breed, age, gender, color, height, weight, info, birth_date, owner } = req.body;
    let image_path = null;
  
    console.log('Beérkező adatok:', req.body);
    console.log('Feltöltött fájl:', req.file);
  
    // Ellenőrizd, hogy érkezett-e fájl
    if (req.file) {
      image_path = `/images/${req.file.filename}`;  // Az elérési út mentése az adatbázisba
    } else {
      console.warn('Nincs kép feltöltve!');
    }
  
    const query = `
      INSERT INTO horses (name, breed, age, gender, color, height, weight, info, birth_date, owner, image_path)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [name, breed, age, gender, color, height, weight, info, birth_date, owner, image_path];
  
    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Adatbázis hiba:', err.message);
        return res.status(500).json({ error: 'Adatbázis hiba', details: err.message });
      }
      res.status(201).json({ message: 'Ló hozzáadva!', horseId: result.insertId, image_path });
    });
  };
  

// Ló törlése ID alapján
const deleteHorse = (req, res) => {
    const { id } = req.params;
  
    // Először lekérjük a ló adatait, hogy megtaláljuk a kép elérési útját
    const selectQuery = 'SELECT image_path FROM horses WHERE id = ?';
    db.query(selectQuery, [id], (err, results) => {
      if (err) {
        console.error('Adatbázis hiba a kép lekérdezésénél:', err.message);
        return res.status(500).json({ error: 'Adatbázis hiba', details: err.message });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: 'Ló nem található!' });
      }
  
      const imagePath = results[0].image_path;
      if (imagePath) {
        const fullImagePath = path.join(__dirname, '../public', imagePath);
  
        // Fájl törlése a fájlrendszerből
        fs.unlink(fullImagePath, (err) => {
          if (err) {
            console.error('Hiba a kép törlésekor:', err.message);
            // Nem állítjuk le itt, mert a kép hiánya nem akadályozza meg az adatbázisból való törlést
          }
        });
      }
  
      // Ló törlése az adatbázisból
      const deleteQuery = 'DELETE FROM horses WHERE id = ?';
      db.query(deleteQuery, [id], (err, result) => {
        if (err) {
          console.error('Adatbázis hiba a törlés során:', err.message);
          return res.status(500).json({ error: 'Adatbázis hiba', details: err.message });
        }
  
        res.json({ message: 'Ló és a hozzátartozó kép törölve!' });
      });
    });
  };
  

module.exports = { getAllHorses, addHorse, deleteHorse };
