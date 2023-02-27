const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

const supplierSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
  email: {
    type: String,
    validate: {
      validator: function (value) {
        const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailRegex.test(value);
      },
      message: `{VALUE} is invalid email!`,
    },
    required: [true, "Email is required"],
    unique: true,
    maxLength: 50,
  },
  phoneNumber: {
    type: Number,
    validate: {
      validator: function (value) {
        const phoneNumberRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
        return phoneNumberRegex.test(value);
      },
      message: `{VALUE} is invalid phonenumber!`,
    },
    unique: true,
    required: [true, "Phonenumber is required"],
  },
  address: { type: String, required: false, maxLength: 500 },
});

supplierSchema.virtual("category", {
  ref: "Category",
  localField: "categoryId",
  foreignField: "_id",
  justOne: true,
});

supplierSchema.set("toObject", { virtuals: true });
supplierSchema.set("toJSON", { virtuals: true });

supplierSchema.plugin(mongooseLeanVirtuals);
const Supplier = model("Supplier", supplierSchema);
module.exports = Supplier;
