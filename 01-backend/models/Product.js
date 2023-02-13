const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

const productSchema = new Schema({
  name: { type: String, required: true },
  stock: { type: Number, min: 0, default: 0, required: true },
  price: {
    type: Number,
    min: 0,
    default: 0,
    required: [true, "Product's price is required!"],
  },
  discount: {
    type: Number,
    min: 0,
    max: 80,
    default: 0,
    required: false,
  },
  sold: {
    type: Number,
    default: 0,
    min: 0,
  },
  description: { type: String, required: false },
  categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  subCategoryId: {
    type: Schema.Types.ObjectId,
    ref: "SubCategory",
    required: true,
  },
  supplierId: { type: Schema.Types.ObjectId, ref: "Supplier", required: true },
  rating: { type: Number, required: false },
  active: { type: Boolean },
  isDeleted: { type: Boolean },
  promotionPosition: { type: Array, required: false },
  createdDate: { type: Date },
  createdBy: { type: Schema.Types.ObjectId, ref: "Employee" },
  updatedDate: { type: Date },
  updatedBy: { type: Schema.Types.ObjectId, ref: "Employee" },
  hotItem: { type: Boolean, required: false },
  newArrival: { type: Boolean, required: false },
  size: { type: Array, required: false },
  color: { type: Array, required: false },
  features: { type: String, required: false },
  services: { type: String, required: false },
});

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
