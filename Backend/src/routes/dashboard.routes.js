const express = require("express");

const Complaint = require("../models/Complaint");

const router = express.Router();

router.get("/stats", async (req, res) => {
  const total = await Complaint.countDocuments();
  const received = await Complaint.countDocuments({ status: "received" });
  const in_review = await Complaint.countDocuments({ status: "in_review" });
  const resolved = await Complaint.countDocuments({ status: "resolved" });

  res.json({
    total,
    received,
    in_review,
    resolved
  });
});

router.get("/complaints-over-time", async (req, res) => {
  const results = await Complaint.aggregate([
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          day: { $dayOfMonth: "$createdAt" }
        },
        count: { $sum: 1 }
      }
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
        "_id.day": 1
      }
    }
  ]);

  const data = results.map(r => ({
    date: `${r._id.year}-${String(r._id.month).padStart(2, "0")}-${String(r._id.day).padStart(2, "0")}`,
    count: r.count
  }));

  res.json(data);
});

module.exports = router;
