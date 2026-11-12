import { z } from 'zod';

export const cartLineSchema = z.object({
  slug: z.string().min(1),
  quantity: z.number().int().positive(),
});

export const cartSchema = z.array(cartLineSchema);

export type CartLine = z.infer<typeof cartLineSchema>;