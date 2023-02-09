const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

//-------------Order Detail---------------//
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

//------------------Order-----------------------//
const orderSchema = new Schema({
  orderId: { type: String, required: true, maxLength: 100 },
  customerId: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
  employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
  orderDate: { type: Date, required: true },
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
  contactInformation: {
    type: Object,
    required: true,
  },

  shippingInformation: { type: Object, required: true },
  paymentInformation: { type: Object, required: true },

  createdDate: {
    type: Date,
    required: true,
    default: Date.now,
  },

  orderDetails: [orderDetailsSchema],
});

orderSchema.virtual("customer", {
  ref: "Customer",
  localField: "customerId",
  foreignField: "_id",
  justOne: true,
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
