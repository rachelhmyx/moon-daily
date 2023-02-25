const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const slideSchema = new Schema({
  title: { type: String, required: true },
  active: { type: Boolean, required: true },
  sortOrder: { type: Number, required: false },
});

const Slide = model("Slide", slideSchema);
module.exports = Slide;
