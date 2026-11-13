import { z } from 'zod';

import { menuItemSchema } from '@/modules/menu/schema';

export const cartLineSchema = z.object({
  slug: z.string().min(1),
  quantity: z.number().int().positive(),
  snapshot: menuItemSchema.optional(),
});

export const cartSchema = z.array(cartLineSchema);

export type CartLine = z.infer<typeof cartLineSchema>;