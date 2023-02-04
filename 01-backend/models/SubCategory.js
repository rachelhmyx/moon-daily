const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

const subCategorySchema = new Schema({
  name: { type: Array, required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
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
