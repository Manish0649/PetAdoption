const { runQuery } = require("../config/db");

function findUserByEmail(email) {
  return runQuery("SELECT * FROM users WHERE LOWER(email)=LOWER($1)", [email]);
}

function findUserByEmailAndPassword(email, password) {
  return runQuery(
    "SELECT * FROM users WHERE LOWER(email)=LOWER($1) AND password=$2",
    [email, password]
  );
}

function createUser(name, email, password, role) {
  return runQuery(
    `INSERT INTO users (name, email, password, role)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [name, email, password, role]
  );
}

module.exports = {
  findUserByEmail,
  findUserByEmailAndPassword,
  createUser,
};


