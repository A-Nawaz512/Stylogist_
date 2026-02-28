import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
            index: true,
        },

        url: {
            type: String,
            required: true,
        },

        type: {
            type: String,
            enum: ["image", "video"],
            default: "image",
        },

        position: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export const ProductMedia = mongoose.model("ProductMedia", mediaSchema);