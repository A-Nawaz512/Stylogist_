import { z } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const createOrderSchema = z.object({
  body: z.object({
    items: z
      .array(
        z.object({
          productId: z.string().regex(objectIdRegex, "Invalid productId"),
          sku: z.string().min(1, "SKU required"),
          quantity: z.number().int().min(1, "Quantity must be at least 1"),
        })
      )
      .min(1, "Order must contain at least one item"),

    // Updated: expect addressId instead of shippingAddress object
    addressId: z.string().regex(objectIdRegex, "Invalid addressId"),

    paymentMethod: z.enum(["COD"]).optional(),
  }),
});