const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

const productSchema = new Schema({});

productSchema.virtual("total").get(function () {
  return (this.price * (100 - this.discount)) / 100;
});

//Total Revenue:
productSchema.virtual("totalRevenue").get(function () {
  return this.sold * ((this.price * (100 - this.discount)) / 100);
});

//Category Information:
productSchema.virtual("category", {
  ref: "Category",
  localField: "categoryId",
  foreignField: "_id",
  justOne: true,
});
//SubCategory Information:
productSchema.virtual("subcategory", {
  ref: "SubCategory",
  localField: "subCategoryId",
  foreignField: "_id",
  justOne: true,
});
//Supplier Information:
productSchema.virtual("supplier", {
  ref: "Supplier",
  localField: "supplierId",
  foreignField: "_id",
  justOne: true,
});

//Employee Information:
productSchema.virtual("createdby", {
  ref: "Employee",
  localField: "createdBy",
  foreignField: "_id",
  justOne: true,
});
productSchema.virtual("updatedby", {
  ref: "Employee",
  localField: "updatedBy",
  foreignField: "_id",
  justOne: true,
});

productSchema.set("toObject", { virtuals: true });
productSchema.set("toJSON", { virtuals: true });

productSchema.plugin(mongooseLeanVirtuals);

const Product = model("Product", productSchema);
module.exports = Product;
