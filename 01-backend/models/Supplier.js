const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const supplierSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
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

const Supplier = model("Supplier", supplierSchema);
module.exports = Supplier;
