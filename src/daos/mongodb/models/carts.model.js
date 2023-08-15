import mongoose from "mongoose";

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        amount: Number,
      },
    ],
  },
});


export const cartModel = mongoose.model(cartCollection, cartSchema)