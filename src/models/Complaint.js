
const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  description: String,
  status: { type: String, default: "received" }
});

module.exports = mongoose.model("Complaint", complaintSchema);
