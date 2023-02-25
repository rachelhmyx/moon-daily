const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const advertisementSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  sortOrder: { type: Number, required: true },
  active: { type: Boolean, required: true },
  isDeleted: { type: Boolean, required: true },
});

const Advertisement = model("Advertisement", advertisementSchema);
module.exports = Advertisement;
