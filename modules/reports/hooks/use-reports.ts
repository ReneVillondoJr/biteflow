'use client';

import { useMemo, useState } from 'react';
import { getReportOrders } from '../data/reports';
import type { ReportPeriod } from '../schema';

export function useReports() {
  const [period, setPeriod] = useState<ReportPeriod>('Last 7 days');
  const orders = useMemo(() => getReportOrders(period), [period]);
  const activeOrders = useMemo(() => orders.filter((order) => order.status !== 'Cancelled'), [orders]);
  const orderValue = useMemo(() => activeOrders.reduce((total, order) => total + Number(order.total.replace(/[^0-9.]/g, '')), 0), [activeOrders]);
  const completedCount = useMemo(() => orders.filter((order) => order.status === 'Completed').length, [orders]);
  const averageOrderValue = activeOrders.length ? orderValue / activeOrders.length : 0;

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

  return { period, setPeriod, orders, activeOrders, orderValue, completedCount, averageOrderValue, exportCsv };
}
