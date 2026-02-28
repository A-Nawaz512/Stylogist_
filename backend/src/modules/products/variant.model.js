import mongoose from "mongoose";

const variantSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },

    sku: {
      type: String,
      required: true,
      unique: true,
    },

    size: String,
    color: String,
    material: String,

    originalPrice: {
      type: Number,
      required: true,
    },

    salePrice: {
      type: Number,
      required: true,
    },

    discountPercentage: Number,

    stock: {
      type: Number,
      required: true,
    },

    weight: Number,

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Variant = mongoose.model("Variant", variantSchema);