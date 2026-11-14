import { z } from 'zod';

export const inventoryItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().trim().min(1),
  category: z.string().trim().min(1),
  unit: z.string().trim().min(1),
  quantity: z.number().int().nonnegative(),
  reorderAt: z.number().int().nonnegative(),
  unitCost: z.number().nonnegative(),
  updatedAt: z.string().min(1),
});

export const inventoryDataSchema = z.object({ items: z.array(inventoryItemSchema) });

export type InventoryItem = z.infer<typeof inventoryItemSchema>;
export type InventoryData = z.infer<typeof inventoryDataSchema>;
