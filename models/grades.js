const mongoose = require("mongoose");

const Grades = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Students" },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subjects" },
    marks: {type: Number, min: 0, max: 100, required: true},
  },
  { timestamps: true },
  { collection: "grades-data" }
);


Grades.index({ student: 1, subject: -1}, { unique: true });


const model = mongoose.model("Grades", Grades);

module.exports = model;
