const { runQuery } = require("../config/db");

function createApplication({
  petDetails,
  userEmail,
  userPhone,
  livingSituation,
  experience,
  otherPets,
}) {
  return runQuery(
    `INSERT INTO adoption_applications 
     (pet_details, "userEmail", "userPhone", "livingSituation", experience, "otherPets", status, "createdAt")
     VALUES ($1::jsonb,$2,$3,$4,$5,$6,'pending',NOW()) RETURNING *`,
    [
      JSON.stringify(petDetails),
      userEmail,
      userPhone,
      livingSituation,
      experience,
      otherPets,
    ]
  );
}

function getApplicationsByEmail(email) {
  return runQuery(
    `SELECT * FROM adoption_applications WHERE LOWER("userEmail")=LOWER($1) ORDER BY id DESC`,
    [email]
  );
}

function getPendingApplications() {
  return runQuery(
    `SELECT * FROM adoption_applications WHERE status='pending' ORDER BY id DESC`
  );
}

function getApplicationById(id) {
  return runQuery(`SELECT * FROM adoption_applications WHERE id=$1`, [id]);
}

function updateApplicationStatus(id, status) {
  return runQuery(`UPDATE adoption_applications SET status=$1 WHERE id=$2`, [
    status,
    id,
  ]);
}

module.exports = {
  createApplication,
  getApplicationsByEmail,
  getPendingApplications,
  getApplicationById,
  updateApplicationStatus,
};


