const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const ProductCartSchema = new Schema({
  product: {
    type: ObjectId,
    ref: "Product",
  },
  name: {
    type: String,
  },
  count: {
    type: Number,
  },
  Price: {
    type: Number,
  },
});

const ProductCart = mongoose.model("ProductCart", ProductCartSchema);

const OrderSchema = new Schema(
  {
    products: [ProductCartSchema],
    transcationId: {},
    amount: {
      type: Number,
    },
    address: {
      type: String,
      maxlength: 2000,
    },
    updated: {
      type: Date,
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = { ProductCart, Order };
