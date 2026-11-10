import type { KitchenStatus, KitchenStation } from './types/kitchen';

export const kitchenSchema = {
  statuses: ['Queued', 'Preparing', 'Ready', 'Completed'] as const satisfies readonly KitchenStatus[],
  stationOptions: ['All stations', 'Grill', 'Fryer', 'Drinks', 'Assembly', 'Dessert'] as const satisfies readonly ('All stations' | KitchenStation)[],
  statusFilters: ['All tickets', 'Queued', 'Preparing', 'Ready', 'Completed'] as const,
} as const;