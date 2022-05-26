const mongoose = require("mongoose");

const Assignments = new mongoose.Schema(
  {
    assignment: { type: String, required: true, unique: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subjects" },
    lastDate: { type: Date, required: true },
  },
  { timestamps: true },
  { collection: "assignments-data" }
);

Assignments.index({ assignment: 1}, { unique: true });

const model = mongoose.model("Assignments", Assignments);

module.exports = model;
