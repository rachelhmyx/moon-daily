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
    required: true,
  },
  description: { type: String },
  categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
  supplierId: { type: Schema.Types.ObjectId, ref: "Supplier" },
});

productSchema.virtual("total").get(function () {
  return (this.price * (100 - this.discount)) / 100;
});

productSchema.virtual("category", {
  ref: "Category",
  localField: "categoryId",
  foreignField: "_id",
  justOne: true,
});

productSchema.virtual("supplier", {
  ref: "Supplier",
  localField: "supplierId",
  foreignField: "_id",
  justOne: true,
});

productSchema.set("toObject", { virtuals: true });
productSchema.set("toJSON", { virtuals: true });

productSchema.plugin(mongooseLeanVirtuals);

const Product = model("Product", productSchema);
module.exports = Product;
