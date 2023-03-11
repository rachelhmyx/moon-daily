const mongoose = require("mongoose");
const { Schema, model } = mongoose;
//--------------------------------
const bcrypt = require("bcrypt");
//--------------------------------

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
        console.log(value);
        return true;
      },
      message: `Gender: {VALUE} is invalid gender!`,
    },
    required: true,
  },
  phoneNumber: {
    type: Number,
    validate: {
      validator: function (value) {
        const phoneNumberRegex =
          /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
        return phoneNumberRegex.test(value);
      },
      message: `{VALUE} is invalid phone number!`,
    },
    required: [true, "Phone Number is required!"],
    unique: true,
  },
  address: { type: String, required: false },
});

//-----------------------------------------------------
userSignUpSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  console.log("user", user);
  next();
});
//---------------------------------------------------------

const UserSignUp = model("User", userSignUpSchema, "Users");
module.exports = UserSignUp;
