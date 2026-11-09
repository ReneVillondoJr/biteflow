import type { KitchenStatus, KitchenStation } from './types/kitchen';

export const kitchenSchema = {
  statuses: ['Queued', 'Preparing', 'Ready'] as KitchenStatus[],
  stationOptions: ['All stations', 'Grill', 'Fryer', 'Drinks', 'Assembly', 'Dessert'] as ('All stations' | KitchenStation)[],
  statusFilters: ['All tickets', 'Queued', 'Preparing', 'Ready'] as const,
} as const;