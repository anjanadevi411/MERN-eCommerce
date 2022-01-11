const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const ProductCartSchema = new Schema({
    product:{
        type: ObjectId,
        ref: "Product",
    },
    name:{
        type:String,
    },
    count:{
        type: Number,
    },
    Price:{
        type: Number,
    }
}),

const productCart = mongoose.model("ProductCart",ProductCartSchema)

const orderSchema = new Schema(
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

const order = mongoose.model("Order",orderSchema)

module.exports = {productCart, order};
