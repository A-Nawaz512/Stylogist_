import mongoose from "mongoose";
import { Product } from "../products/product.model.js";
import Order from "./order.model.js";
import { Category } from "../categories/category.model.js";
import { ApiError } from "../../utils/ApiError.js";

export const createOrder = async (userId, orderData) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { items, shippingAddress, paymentMethod } = orderData;
        let subtotal = 0;
        const orderItems = [];

        for (const item of items) {
            const product = await Product.findOne({
                _id: item.productId,
                status: "published"
            }).session(session);

            if (!product) throw new ApiError(404, "Product not found or unpublished");

            // Optional: check category is active
            const category = await Category.findById(product.category).session(session);
            if (!category || !category.isActive) {
                throw new ApiError(400, "Product category is inactive");
            }

            const variant = product.variants?.find(v => v.sku === item.sku);
            if (!variant) throw new ApiError(400, "Variant not found");

            if (variant.stock < item.quantity) {
                throw new ApiError(400, `Insufficient stock for SKU ${variant.sku}`);
            }

            const itemTotal = variant.salePrice * item.quantity;
            subtotal += itemTotal;

            // Deduct stock
            variant.stock -= item.quantity;
            product.totalStock -= item.quantity;

            await product.save({ session });

            orderItems.push({
                product: product._id,
                sku: variant.sku,
                name: product.name,
                price: variant.salePrice,
                quantity: item.quantity,
                total: itemTotal,
            });
        }

        const shippingFee = 0;
        const totalAmount = subtotal + shippingFee;

        const order = await Order.create(
            [
                {
                    user: userId,
                    items: orderItems,
                    shippingAddress,
                    paymentMethod,
                    subtotal,
                    shippingFee,
                    totalAmount,
                },
            ],
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        return order[0];
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};