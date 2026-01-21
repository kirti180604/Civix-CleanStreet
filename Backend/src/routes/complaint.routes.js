const express = require("express");

const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const Complaint = require("../models/Complaint");

const router = express.Router();

router.post("/submit", auth, upload.single("photo"), async (req, res) => {
  try {
    const issueType = req.body?.issueType ?? req.body?.type;

    let priority = req.body?.priority;
    if (priority === "Urgent") priority = "High";

    const location_coords = (req.body?.latitude != null && req.body?.longitude != null)
      ? { lat: req.body.latitude, lng: req.body.longitude }
      : undefined;

    const photo = req.file ? `/uploads/complaints/${req.file.filename}` : undefined;

    const complaint = await Complaint.create({
      ...req.body,
      issueType,
      priority,
      location_coords,
      photo,
      user_id: req.user.id
    });

    res.status(201).json(complaint);
  } catch (err) {
    res.status(400).json({ msg: err.message || "Failed to submit complaint" });
  }
});

module.exports = router;
