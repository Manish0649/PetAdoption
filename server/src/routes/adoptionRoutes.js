const express = require("express");
const {
  submitApplication,
  getMyApplications,
  getPending,
  approveApplication,
  rejectApplication,
} = require("../controllers/adoptionController");

const router = express.Router();

router.post("/adoption", submitApplication);
router.get("/my-applications", getMyApplications);
router.get("/pending", getPending);
router.post("/approve", approveApplication);
router.post("/reject", rejectApplication);

module.exports = router;


