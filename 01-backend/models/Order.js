const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

//Order Detail: ko phải là một collection riêng biệt mà đc gắn với collection Order
const orderDetailsSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, default: 0, min: 0, required: true },
  price: { type: Number, default: 0, min: 0, required: true },
  discount: { type: Number, default: 0, max: 80 },
});

orderDetailsSchema.virtual("totalAmount").get(function () {
  return this.quantity * ((this.price * (100 - this.discount)) / 100);
});

orderDetailsSchema.virtual("product", {
  ref: "Product",
  localField: "productId",
  foreignField: "_id",
  justOne: true,
});

orderDetailsSchema.set("toObject", { virtuals: true });
orderDetailsSchema.set("toJSON", { virtuals: true });

//----------------------------------------------------------//

const orderSchema = new Schema({
  orderID: { type: String },
  customerName: {
    type: String,
    required: true,
  },
  orderDate: { type: Date, required: true, default: Date.now },
  paymentMethod: {
    type: String,
    validate: {
      validator: function (value) {
        return ["CASH", "CREDIT CARD", "PAYPAL", "VISA"].includes(
          value.toUpperCase()
        );
      },
      message: `Payment Method: {VALUE} is invalid payment method!`,
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
    required: true,
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
    },
    required: true,
    unique: true,
  },
  shippingAddress: { type: String, required: true },

  deliveryStatus: {
    type: String,
    default: "WAITING",
    validate: {
      validator: function (value) {
        return [
          "PICKUP",
          "INPROGRESS",
          "DELIVERED",
          "RETURNS",
          "PENDING",
          "CANCELLED",
        ].includes(value.toUpperCase());
      },
      message: `Status: {VALUE} is invalid status!`,
    },
    required: true,
  },

  employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
  orderDetails: [orderDetailsSchema],
});

orderSchema.virtual("employee", {
  ref: "Employee",
  localField: "employeeId",
  foreignField: "_id",
  justOne: true,
});

orderSchema.set("toObject", { virtuals: true });
orderSchema.set("toJSON", { virtuals: true });

orderSchema.plugin(mongooseLeanVirtuals);

const Order = model("Order", orderSchema);
module.exports = Order;
