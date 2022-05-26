const mongoose = require("mongoose");

const StudentAssignments = new mongoose.Schema(
  {
    assignment: {type: mongoose.Schema.Types.ObjectId, ref: "Assignments"},
    student: {type: mongoose.Schema.Types.ObjectId, ref: "Students"},
    isSubmitted: {type: Boolean, default: false},
    submissionDate: {type: Date, default: Date.now, required: true},
  },
  { timestamps: true },
  { collection: "student-assignment" }
);


StudentAssignments.index({ student: 1, assignment: 1}, { unique: true });


const model = mongoose.model("Assignment Details", StudentAssignments);

module.exports = model;
