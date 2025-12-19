const {
  createApplication,
  getApplicationsByEmail,
  getPendingApplications,
  getApplicationById,
  updateApplicationStatus,
} = require("../models/adoptionModel");
const { findPetById, updatePetStatus } = require("../models/petModel");
const { normalizeRow, normalizeRows } = require("../utils/normalize");

function buildPetDetails(petRow = {}) {
  const pet = normalizeRow(petRow);
  return {
    petId: pet.id,
    petName: pet.petName || "Unknown Pet",
    petType: pet.petType || "Unknown",
    age: pet.age || "N/A",
    area: pet.area || "N/A",
    email: pet.email || "",
    phone: pet.phone || "",
  };
}

function parsePetDetails(value) {
  if (!value) return {};
  try {
    if (typeof value === "string") {
      return JSON.parse(value);
    }
    return value;
  } catch (error) {
    console.error("Error parsing pet_details:", error);
    return {};
  }
}

async function submitApplication(req, res) {
  const { petId, userEmail, userPhone, livingSituation, experience, otherPets } =
    req.body;

  try {
    const petResult = await findPetById(petId);
    if (petResult.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Pet not found" });
    }

    const petDetails = buildPetDetails(petResult.rows[0]);

    const result = await createApplication({
      petDetails,
      userEmail,
      userPhone,
      livingSituation,
      experience,
      otherPets,
    });

    return res.json({
      success: true,
      application: normalizeRow(result.rows[0]),
    });
  } catch (error) {
    console.error("Error adding adoption application:", error);
    return res.status(500).json({
      success: false,
      message: "Error submitting adoption application",
    });
  }
}

async function getMyApplications(req, res) {
  const email = req.query.email;
  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email query param required" });
  }

  try {
    const result = await getApplicationsByEmail(email);
    const applications = normalizeRows(result.rows).map((row) => ({
      ...row,
      petDetails: parsePetDetails(row.petDetails),
    }));
    return res.json(applications);
  } catch (error) {
    console.error("Error fetching user applications:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching applications",
    });
  }
}

async function getPending(req, res) {
  try {
    const result = await getPendingApplications();
    const applications = normalizeRows(result.rows).map((row) => ({
      ...row,
      petDetails: parsePetDetails(row.petDetails),
    }));
    return res.json(applications);
  } catch (error) {
    console.error("Error fetching pending applications:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching pending applications",
    });
  }
}

async function approveApplication(req, res) {
  const { id } = req.body;

  try {
    const applicationResult = await getApplicationById(id);
    if (applicationResult.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });
    }

    const application = applicationResult.rows[0];
    const petDetails = parsePetDetails(application.pet_details);
    const petId = petDetails.petId;

    await updateApplicationStatus(id, "approved");

    if (petId) {
      await updatePetStatus(petId, "adopted");
    }

    return res.json({
      success: true,
      message: "Application approved and pet marked as adopted",
    });
  } catch (error) {
    console.error("Error approving application:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error approving application" });
  }
}

async function rejectApplication(req, res) {
  const { id } = req.body;

  try {
    await updateApplicationStatus(id, "rejected");
    return res.json({ success: true, message: "Application rejected" });
  } catch (error) {
    console.error("Error rejecting application:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error rejecting application" });
  }
}

module.exports = {
  submitApplication,
  getMyApplications,
  getPending,
  approveApplication,
  rejectApplication,
};


