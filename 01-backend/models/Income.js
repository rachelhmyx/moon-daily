const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const incomeSchema = new Schema({
  categoryName: { type: String, required: true },
  income: { type: Number, default: 0, require: true },
});

const Income = model("Income", incomeSchema);
module.exports = Income;
