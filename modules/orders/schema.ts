import type { OrderStatus } from './types/orders';

export const orderSchema = {
  statusOptions: ['All', 'New', 'Preparing', 'Ready', 'On delivery', 'Completed', 'Cancelled'] as const,
  typeOptions: ['All types', 'Delivery', 'Pickup', 'Dine-in'] as const,
  dateOptions: ['Today', 'Last 7 days', 'This month'] as const,
  statuses: ['New', 'Preparing', 'Ready', 'On delivery', 'Completed', 'Cancelled'] as OrderStatus[],
  pageSize: 5,
} as const;