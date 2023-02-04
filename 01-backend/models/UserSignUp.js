const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSignUpSchema = new Schema({
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
  username: { type: String, required: true },
  password: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    validate: {
      validator: function (value) {
        return ["Male", "Female", "Other"].includes(value.toUpperCase());
      },
      message: `Gender: {VALUE} is invalid gender!`,
    },
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
  address: { type: String, required: false },
});

const UserSignUp = model("User", userSignUpSchema);
module.exports = UserSignUp;
