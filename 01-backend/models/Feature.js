const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const featureSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  sortOrder: { type: Number, required: true },
  active: { type: Boolean, required: true },
  isDeleted: { type: Boolean, required: true },
  icon: { type: String, required: true },
});

const Feature = model("Feature", featureSchema);
module.exports = Feature;
