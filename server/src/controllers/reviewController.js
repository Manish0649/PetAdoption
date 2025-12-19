const { createReview, getAllReviews } = require("../models/reviewModel");
const { normalizeRow, normalizeRows } = require("../utils/normalize");

async function addReview(req, res) {
  const { name, email, message } = req.body;
  try {
    const result = await createReview({ name, email, message });
    return res.json({ success: true, review: normalizeRow(result.rows[0]) });
  } catch (error) {
    console.error("Error adding review:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to add review" });
  }
}

async function listReviews(req, res) {
  try {
    const result = await getAllReviews();
    return res.json(normalizeRows(result.rows));
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error fetching reviews" });
  }
}

module.exports = {
  addReview,
  listReviews,
};


