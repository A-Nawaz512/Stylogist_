import * as OrderService from "./order.service.js";

export const createOrder = async (req, res) => {
  const orderData = req.validated.body;

  const order = await OrderService.createOrder(
    req.user.id,
    orderData
  );

  res.status(201).json({
    success: true,
    data: order,
  });
};