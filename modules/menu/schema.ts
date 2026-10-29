import { z } from 'zod';

export const menuCategorySchema = z.object({
  label: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
});

export const menuItemSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  category: z.string().min(1),
  categorySlug: z.string().min(1),
  description: z.string().min(1),
  price: z.number().int().nonnegative(),
  image: z.string().url(),
  badge: z.string().optional(),
  prepTime: z.number().int().positive(),
  tags: z.array(z.string()),
  isPopular: z.boolean(),
  isAvailable: z.boolean(),
});

export const menuDataSchema = z.object({
  categories: z.array(menuCategorySchema),
  items: z.array(menuItemSchema),
});
