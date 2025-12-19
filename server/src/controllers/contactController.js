const {
  createContactMessage,
  getAllContactMessages,
} = require("../models/contactModel");
const { normalizeRow, normalizeRows } = require("../utils/normalize");

async function saveContactMessage(req, res) {
  const { name, email, message } = req.body;
  try {
    const result = await createContactMessage({ name, email, message });
    return res.json({ success: true, data: normalizeRow(result.rows[0]) });
  } catch (error) {
    console.error("Error saving contact message:", error);
    return res.status(500).json({
      success: false,
      message: "Error saving contact message",
    });
  }
}

async function listContactMessages(req, res) {
  try {
    const result = await getAllContactMessages();
    return res.json(normalizeRows(result.rows));
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching contact messages",
    });
  }
}

module.exports = {
  saveContactMessage,
  listContactMessages,
};


