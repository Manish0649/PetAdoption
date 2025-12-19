const express = require("express");
const {
  saveContactMessage,
  listContactMessages,
} = require("../controllers/contactController");

const router = express.Router();

router.post("/contact", saveContactMessage);
router.get("/contact", listContactMessages);

module.exports = router;


