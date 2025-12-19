const { runQuery } = require("../config/db");

function createContactMessage({ name, email, message }) {
  return runQuery(
    `INSERT INTO contact_us (name, email, message)
     VALUES ($1, $2, $3) RETURNING *`,
    [name, email, message]
  );
}

function getAllContactMessages() {
  return runQuery("SELECT * FROM contact_us ORDER BY id DESC");
}

module.exports = {
  createContactMessage,
  getAllContactMessages,
};


