import type { DeliveryStatus } from './types/delivery';

export const deliverySchema = {
  statuses: ['Queued', 'Preparing', 'Ready', 'On delivery', 'Completed'] as const satisfies readonly DeliveryStatus[],
  statusFilters: ['All deliveries', 'Queued', 'Preparing', 'Ready', 'On delivery', 'Completed'] as const,
  riderOptions: ['All riders', 'Unassigned', 'Marco Reyes', 'Jules Tan', 'Paolo Cruz', 'Nico Santos'] as const,
} as const;