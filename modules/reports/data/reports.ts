import { initialOrders } from '@/modules/orders/data/orders';
import type { CustomerOrder } from '@/modules/orders/types/orders';
import type { ReportPeriod } from '../schema';

export function getReportOrders(period: ReportPeriod): CustomerOrder[] {
  if (period === 'Today') return initialOrders.filter((order) => order.placedAt.startsWith('Today'));
  if (period === 'Last 7 days') return initialOrders.filter((order) => order.placedAt.startsWith('Today') || order.placedAt.startsWith('Yesterday'));
  return initialOrders;
}

export function parseOrderAmount(value: string) {
  return Number(value.replace(/[^0-9.]/g, '')) || 0;
}
