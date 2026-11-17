import type { PaymentMethod, PaymentStatus } from './types';

export const paymentSchema = {
  statusOptions: ['All statuses', 'Paid', 'Pending', 'Failed', 'Refunded'] as const,
  methodOptions: ['All methods', 'GCash', 'Card', 'Cash'] as const,
  dateOptions: ['Today', 'Last 7 days', 'This month'] as const,
  statuses: ['Paid', 'Pending', 'Failed', 'Refunded'] as PaymentStatus[],
  methods: ['GCash', 'Card', 'Cash'] as PaymentMethod[],
  pageSize: 5,
} as const;
