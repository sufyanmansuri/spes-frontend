const mongoose = require("mongoose");

const Subject = new mongoose.Schema(
  {
    subName: { type: String, required: true },
    semester: { type: String, enum:['Sem-1', 'Sem-2', 'Sem-3', 'Sem-4'], required: true },
    term: { type: String, enum:['2019','2020', '2021', '2022', '2023'], required: true },
  },
  { timestamps: true },
  { collection: "subject-data" }
);

const model = mongoose.model("Subjects", Subject);

module.exports = model;
