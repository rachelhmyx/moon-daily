const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    maxLength: 50,
    required: true,
  },
  lastName: {
    type: String,
    maxLength: 50,
    required: true,
  },
  phoneNumber: {
    type: Number,
    validate: {
      validator: function (value) {
        const phoneNumberRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
        return phoneNumberRegex.test(value);
      },
      message: `{VALUE} is invalid phone number!`,
    },
    required: [true, "Phone Number is required!"],
    unique: true,
  },
  email: {
    type: String,
    validate: {
      validator: function (value) {
        const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailRegex.test(value);
      },
      message: `{VALUE} is invalid email!`,
      required: true,
      unique: true,
    },
  },
  password: {
    type: String,
    required: true,
  },
});

const User = model("User", userSchema);
module.exports = User;
