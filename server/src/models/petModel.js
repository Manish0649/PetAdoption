const { runQuery } = require("../config/db");

function getAllPets() {
  return runQuery("SELECT * FROM pets ORDER BY id DESC");
}

function getAvailablePets() {
  return runQuery(
    "SELECT * FROM pets WHERE status != 'adopted' OR status IS NULL ORDER BY id DESC"
  );
}

function createPet({
  petName,
  age,
  area,
  justification,
  email,
  phone,
  petType,
  status,
}) {
  return runQuery(
    `INSERT INTO pets ("petName", age, area, justification, email, phone, "petType", status, createdat)
     VALUES ($1,$2,$3,$4,$5,$6,$7,COALESCE($8,'available'),NOW()) RETURNING *`,
    [petName, age, area, justification, email, phone, petType, status]
  );
}

function findPetById(petId) {
  return runQuery("SELECT * FROM pets WHERE id=$1", [petId]);
}

function updatePetStatus(petId, status) {
  return runQuery("UPDATE pets SET status=$1 WHERE id=$2", [status, petId]);
}

module.exports = {
  getAllPets,
  getAvailablePets,
  createPet,
  findPetById,
  updatePetStatus,
};


