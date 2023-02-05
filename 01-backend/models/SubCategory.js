const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

const subCategorySchema = new Schema({
  name: { type: String, required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  active: { type: Boolean, required: true },
  isDeleted: { type: Boolean, required: true },
  sortOrder: { type: Number, required: true },
});

subCategorySchema.virtual("category", {
  ref: "Category",
  localField: "categoryId",
  foreignField: "_id",
  justOne: true,
});

subCategorySchema.set("toObject", { virtuals: true });
subCategorySchema.set("toJSON", { virtuals: true });

subCategorySchema.plugin(mongooseLeanVirtuals);

const SubCategory = model("SubCategory", subCategorySchema);
module.exports = SubCategory;
