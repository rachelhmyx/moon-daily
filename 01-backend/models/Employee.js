const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const employeeSchema = new Schema({
  firstName: { type: String, maxLength: 50 },
  lastName: { type: String, maxLength: 50, required: true },
  phoneNumber: {
    type: Number,
    validate: {
      validator: function (value) {
        const phoneNumberRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
        return phoneNumberRegex.test(value);
      },
      message: `{VALUE} is invalid phone number!`,
    },
    required: true,
    unique: true,
  },
  address: { type: String, unique: true },
  email: {
    type: String,
    validate: {
      validator: function (value) {
        const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailRegex.test(value);
      },
      message: `{VALUE} is invalid email!`,
    },
    required: true,
    unique: true,
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
    required: false,
  },
});

const Employee = model("Employee", employeeSchema);
module.exports = Employee;
