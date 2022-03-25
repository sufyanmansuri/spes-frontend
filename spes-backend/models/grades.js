const mongoose = require("mongoose");

const Grades = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Students" },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subjects" },
    semester: { type: String, enum:['Sem-1', 'Sem-2', 'Sem-3', 'Sem-4'], required: true },
    marks: {type: Number, min: 0, max: 100, required: true},
  },
  { timestamps: true },
  { collection: "grades-data" }
);

const model = mongoose.model("Grades", Grades);

module.exports = model;
