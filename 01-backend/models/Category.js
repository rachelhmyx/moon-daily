const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

const categorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  active: { type: Boolean, required: true },
  isDeleted: { type: Boolean, required: true },
  createdDate: { type: Date, required: true, default: Date.now },
  createdBy: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
  updatedDate: { type: Date, required: true, default: Date.now },
  updatedBy: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
  sortOrder: { type: Number, required: false },
});

categorySchema.virtual("createdby", {
  ref: "Employee",
  localField: "createdBy",
  foreignField: "_id",
  justOne: true,
});
categorySchema.virtual("updatedby", {
  ref: "Employee",
  localField: "updatedBy",
  foreignField: "_id",
  justOne: true,
});

categorySchema.set("toObject", { virtuals: true });
categorySchema.set("toJSON", { virtuals: true });

categorySchema.plugin(mongooseLeanVirtuals);

const Category = model("Category", categorySchema);
module.exports = Category;
