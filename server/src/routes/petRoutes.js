const express = require("express");
const { listPets, addPet } = require("../controllers/petController");

const router = express.Router();

router.get("/pets", listPets);
router.post("/pets", addPet);

module.exports = router;


