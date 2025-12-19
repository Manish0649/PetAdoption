const { runQuery } = require("../config/db");

function createReview({ name, email, message }) {
  return runQuery(
    "INSERT INTO reviews (name, email, content) VALUES ($1,$2,$3) RETURNING *",
    [name, email, message]
  );
}

function getAllReviews() {
  return runQuery("SELECT * FROM reviews ORDER BY id DESC");
}

module.exports = {
  createReview,
  getAllReviews,
};


