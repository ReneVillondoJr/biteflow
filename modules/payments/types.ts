export type PaymentMethod = 'GCash' | 'Card' | 'Cash';
export type PaymentStatus = 'Paid' | 'Pending' | 'Failed' | 'Refunded';

export type PaymentTransaction = {
  id: string;
  orderId: string;
  customer: string;
  email: string;
  method: PaymentMethod;
  status: PaymentStatus;
  amount: number;
  placedAt: string;
};
