import type { z } from 'zod';

import type {
  menuCategorySchema,
  menuDataSchema,
  menuItemSchema,
} from '../schema';

export type MenuCategory = z.infer<typeof menuCategorySchema>;

export type MenuItem = z.infer<typeof menuItemSchema>;

export type MenuData = z.infer<typeof menuDataSchema>;

export type MenuSortOption = 'featured' | 'price-low' | 'price-high' | 'name';
