const {
  getAllPets,
  getAvailablePets,
  createPet,
} = require("../models/petModel");
const { normalizeRow, normalizeRows } = require("../utils/normalize");

async function listPets(req, res) {
  try {
    const showAll = req.query.all === "true";
    const result = showAll ? await getAllPets() : await getAvailablePets();
    return res.json(normalizeRows(result.rows));
  } catch (error) {
    console.error("Error fetching pets:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error fetching pets" });
  }
}

async function addPet(req, res) {
  try {
    const result = await createPet(req.body);
    return res.json({ success: true, pet: normalizeRow(result.rows[0]) });
  } catch (error) {
    console.error("Error adding pet:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to post pet" });
  }
}

module.exports = {
  listPets,
  addPet,
};


