import { inventoryDataSchema } from '../schema';

export const inventoryData = inventoryDataSchema.parse({
  items: [
    { id: 'chicken-breast', name: 'Chicken breast', category: 'Protein', unit: 'kg', quantity: 18, reorderAt: 8, unitCost: 245, updatedAt: 'Today' },
    { id: 'jasmine-rice', name: 'Jasmine rice', category: 'Dry goods', unit: 'kg', quantity: 42, reorderAt: 15, unitCost: 68, updatedAt: 'Today' },
    { id: 'fresh-milk', name: 'Fresh milk', category: 'Dairy', unit: 'L', quantity: 6, reorderAt: 10, unitCost: 92, updatedAt: 'Yesterday' },
    { id: 'burger-buns', name: 'Burger buns', category: 'Bakery', unit: 'pcs', quantity: 24, reorderAt: 12, unitCost: 18, updatedAt: 'Today' },
    { id: 'tomato-sauce', name: 'Tomato sauce', category: 'Dry goods', unit: 'L', quantity: 9, reorderAt: 5, unitCost: 135, updatedAt: 'Yesterday' },
    { id: 'mozzarella', name: 'Mozzarella', category: 'Dairy', unit: 'kg', quantity: 3, reorderAt: 5, unitCost: 380, updatedAt: 'Today' },
  ],
});
