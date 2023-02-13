const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

const customerSchema = new Schema({
  firstName: { type: String, maxLength: 50 },
  lastName: { type: String, required: true, maxLength: 50 },
  phoneNumber: {
    type: Number,
    validate: {
      validator: function (value) {
        const phoneNumberRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
        return phoneNumberRegex.test(value);
      },
      message: `{VALUE} is invalid phone number!`,
    },
    required: [true, "Phone number is required"],
    unique: true,
  },
  address: { type: String },
  email: {
    type: String,
    validate: {
      validator: function (value) {
        const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailRegex.test(value);
      },
      message: `{VALUE} is invalid email!`,
    },
    unique: true,
    required: true,
  },
  birthday: {
    type: Date,
    validate: {
      validator: function (value) {
        const today = new Date();
        if (value > today) {
          return false;
        }
        return true;
      },
      message: `{VALUE} is invalid birthday!`,
    },
  },
});

customerSchema.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName;
});

customerSchema.set("toObject", { virtuals: true });
customerSchema.set("toJSON", { virtuals: true });

customerSchema.plugin(mongooseLeanVirtuals);

const Customer = model("Customer", customerSchema);
module.exports = Customer;
