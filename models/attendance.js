const mongoose = require("mongoose");

const Attendance = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Students" },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subjects" },
    attendance: {type: Number, min: 0, max: 100, required: true},
  },
  { timestamps: true },
  { collection: "attendance-data" }
);


Attendance.index({ student: 1, subject: -1}, { unique: true });


const model = mongoose.model("Attendance", Attendance);

module.exports = model;
