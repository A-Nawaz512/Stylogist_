import * as ProductService from "./product.service.js";
import { catchAsync } from "../../utils/catchAsync.js";

export const createProduct = catchAsync(async (req, res) => {
  const productData = req.validated.body;
  const product = await ProductService.createProduct(productData);

  res.status(201).json({
    success: true,
    data: product,
  });
});

export const getAllProducts = catchAsync(async (req, res) => {
  const products = await ProductService.getAllProducts(req.query);
  res.json({ success: true, data: products });
});

export const getSingleProduct = catchAsync(async (req, res) => {
  const result = await ProductService.getSingleProduct(req.params.slug);
  res.json({ success: true, data: result });
});