const Message = require("../models/message");

// Üzenet létrehozása
exports.createMessage = (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Minden mező kitöltése kötelező!" });
  }

  Message.create({ name, email, message }, (err, result) => {
    if (err) {
      console.error("Hiba az üzenet mentésekor:", err);
      return res.status(500).json({ error: "Adatbázis hiba" });
    }
    res.status(201).json({ message: "Üzenet sikeresen mentve!", id: result.insertId });
  });
};

// Összes üzenet lekérése
exports.getMessages = (req, res) => {
  Message.getAll((err, results) => {
    if (err) {
      console.error("Hiba az üzenetek lekérésekor:", err);
      return res.status(500).json({ error: "Adatbázis hiba" });
    }
    res.status(200).json(results);
  });
};
