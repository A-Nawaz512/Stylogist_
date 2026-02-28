import { z } from 'zod';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    slug: z.string().min(2, 'Slug is required').optional(),
    description: z.string().min(5, 'Description is required'),
    shortDescription: z.string().optional(),
    category: z.string().regex(objectIdRegex, 'Invalid category ObjectId'),
    subCategory: z.string().regex(objectIdRegex, 'Invalid subCategory ObjectId').optional(),
    brand: z.string().regex(objectIdRegex, 'Invalid brand ObjectId').optional(),
    status: z.enum(['draft','published']).optional(),
    dealStart: z.string().optional(),
    dealEnd: z.string().optional(),
    isFeatured: z.boolean().optional(),
    keywords: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    variants: z.array(z.object({
      sku: z.string().min(1),
      size: z.string().optional(),
      color: z.string().optional(),
      material: z.string().optional(),
      originalPrice: z.number(),
      salePrice: z.number(),
      discountPercentage: z.number().optional(),
      stock: z.number(),
      weight: z.number().optional(),
    })).optional(),
    media: z.array(z.object({
      url: z.string().min(1),
      type: z.enum(['image','video']).optional(),
      position: z.number().optional(),
    })).optional(),
  }),
});