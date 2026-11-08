import type { LucideIcon } from 'lucide-react';

export type OrderStatus = 'New' | 'Preparing' | 'Ready' | 'On delivery' | 'Completed' | 'Cancelled';
export type OrderType = 'Delivery' | 'Pickup' | 'Dine-in';

export type OrderItem = {
  name: string;
  quantity: number;
  price: string;
};

export type CustomerOrder = {
  id: string;
  customer: string;
  email: string;
  phone: string;
  type: OrderType;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: string;
  fee: string;
  total: string;
  placedAt: string;
  address?: string;
  payment: 'Cash' | 'Card' | 'GCash';
};

export type OrderMetric = {
  label: string;
  value: string;
  change: string;
  icon: LucideIcon;
  tone: 'green' | 'amber' | 'blue' | 'rose';
};
