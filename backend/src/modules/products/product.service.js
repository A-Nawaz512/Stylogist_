import { Product } from "./product.model.js";
import { Variant } from "./variant.model.js";
import { ProductMedia } from "./media.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { isValidObjectId } from "mongoose";
import slugify from "slugify";

export const createProduct = async (payload) => {
  const { variants, media, category, brand, name, slug, ...productData } = payload;

  // Validate category and brand
  if (!isValidObjectId(category)) throw new ApiError(400, "Invalid category ID");
  if (brand && !isValidObjectId(brand)) throw new ApiError(400, "Invalid brand ID");

  productData.category = category;
  productData.brand = brand;

  // Generate slug if not provided
  let productSlug = slug || slugify(name, { lower: true, strict: true });

  // Ensure uniqueness
  let counter = 1;
  while (await Product.findOne({ slug: productSlug })) {
    productSlug = `${slugify(name, { lower: true, strict: true })}-${counter}`;
    counter++;
  }

  productData.slug = productSlug;

  // Create product
  const product = await Product.create({ name, ...productData });

  // Create variants
  if (variants?.length) {
    const variantDocs = variants.map((v) => ({ ...v, product: product._id }));
    await Variant.insertMany(variantDocs);
  }

  // Create media
  if (media?.length) {
    const mediaDocs = media.map((m) => ({ ...m, product: product._id }));
    await ProductMedia.insertMany(mediaDocs);
  }

  return product;
};

export const getAllProducts = async (query) => {
  const { category, brand, page = 1, limit = 10 } = query;
  const filter = { status: "published" };

  if (category) filter.category = category;
  if (brand) filter.brand = brand;

  return await Product.find(filter)
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ createdAt: -1 });
};

export const getSingleProduct = async (slug) => {
  const product = await Product.findOne({ slug, status: "published" }) .populate("category")
  .populate("brand");

  console.log("im product......", product);


  if (!product) throw new ApiError(404, "Product not found");

  const variants = await Variant.find({ product: product._id });
  const media = await ProductMedia.find({ product: product._id }).sort({ position: 1 });

  return { product, variants, media };
};