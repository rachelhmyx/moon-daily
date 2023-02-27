const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const viewSchema = new Schema({
  timePeriod: { type: String, required: true },
  value: { type: Number, required: true },
});

const View = model("View", viewSchema);
module.exports = View;
