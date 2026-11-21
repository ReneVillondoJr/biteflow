'use client';

import { useMemo, useState } from 'react';
import { getReportOrders, parseOrderAmount } from '../data/reports';
import type { ReportPeriod } from '../schema';

export function useReports() {
  const [period, setPeriod] = useState<ReportPeriod>('Last 7 days');
  const orders = useMemo(() => getReportOrders(period), [period]);
  const activeOrders = useMemo(() => orders.filter((order) => order.status !== 'Cancelled'), [orders]);
  const orderValue = useMemo(() => activeOrders.reduce((total, order) => total + Number(order.total.replace(/[^0-9.]/g, '')), 0), [activeOrders]);
  const completedCount = useMemo(() => orders.filter((order) => order.status === 'Completed').length, [orders]);
  const averageOrderValue = activeOrders.length ? orderValue / activeOrders.length : 0;
  const topProducts = useMemo(() => {
    const products = new Map<string, { quantity: number; value: number }>();
    activeOrders.forEach((order) => order.items.forEach((item) => {
      const current = products.get(item.name) ?? { quantity: 0, value: 0 };
      current.quantity += item.quantity;
      current.value += item.quantity * parseOrderAmount(item.price);
      products.set(item.name, current);
    }));
    return [...products.entries()].sort((a, b) => b[1].quantity - a[1].quantity).slice(0, 5);
  }, [activeOrders]);
  const paymentMix = useMemo(() => ['GCash', 'Card', 'Cash'].map((method) => ({
    method,
    count: activeOrders.filter((order) => order.payment === method).length,
  })), [activeOrders]);

  function exportCsv() {
    const header = ['Order', 'Customer', 'Type', 'Status', 'Payment method', 'Order value', 'Placed'];
    const rows = orders.map((order) => [order.id, order.customer, order.type, order.status, order.payment, order.total, order.placedAt]);
    const csv = [header, ...rows].map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `biteflow-reports-${period.toLowerCase().replaceAll(' ', '-')}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return { period, setPeriod, orders, activeOrders, orderValue, completedCount, averageOrderValue, topProducts, paymentMix, exportCsv };
}
