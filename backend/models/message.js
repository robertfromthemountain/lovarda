const db = require("./db");

class Message {
  static create({ name, email, message }, callback) {
    const sql = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";
    db.query(sql, [name, email, message], callback);
  }

  static getAll(callback) {
    const sql = "SELECT * FROM messages ORDER BY created_at DESC";
    db.query(sql, callback);
  }
}

module.exports = Message;
