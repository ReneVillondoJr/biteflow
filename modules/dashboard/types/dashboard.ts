import type { LucideIcon } from 'lucide-react';

export type DashboardMetricTone = 'green' | 'amber' | 'blue' | 'rose';

export type DashboardMetric = {
  label: string;
  value: string;
  change: string;
  detail: string;
  icon: LucideIcon;
  tone: DashboardMetricTone;
  href: string;
};

export type RevenuePoint = {
  day: string;
  value: number;
};

export type DashboardOrderStatus = 'Preparing' | 'Ready' | 'On delivery';

export type DashboardOrder = {
  id: string;
  customer: string;
  items: string;
  total: string;
  status: DashboardOrderStatus;
  time: string;
};

export type PopularItem = {
  name: string;
  category: string;
  orders: number;
  value: string;
  color: string;
};
