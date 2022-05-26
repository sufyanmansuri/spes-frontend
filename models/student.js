const mongoose = require("mongoose");

const Student = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    semester: { type: String, enum:['Sem-1', 'Sem-2', 'Sem-3', 'Sem-4'], required: true },
    term: { type: String, enum:['2019','2020', '2021', '2022', '2023'], required: true },
  },
  { timestamps: true },
  { collection: "student-data" }
);

const model = mongoose.model("Students", Student);

module.exports = model;
