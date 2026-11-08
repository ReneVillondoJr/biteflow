'use client';

import { useMemo, useState } from 'react';
import { initialOrders } from '../data/orders';
import { orderSchema } from '../schema';
import type { CustomerOrder, OrderStatus } from '../types/orders';

export function useOrders() {
  const [orders, setOrders] = useState<CustomerOrder[]>(initialOrders);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<(typeof orderSchema.statusOptions)[number]>('All');
  const [type, setType] = useState<(typeof orderSchema.typeOptions)[number]>('All types');
  const [dateRange, setDateRange] = useState<(typeof orderSchema.dateOptions)[number]>('Today');
  const [page, setPage] = useState(1);

  const filteredOrders = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return orders.filter((order) => {
      const matchesQuery = !normalized || order.id.toLowerCase().includes(normalized) || order.customer.toLowerCase().includes(normalized) || order.phone.includes(normalized);
      const matchesStatus = status === 'All' || order.status === status;
      const matchesType = type === 'All types' || order.type === type;
      return matchesQuery && matchesStatus && matchesType;
    });
  }, [orders, query, status, type]);

  const pageCount = Math.max(1, Math.ceil(filteredOrders.length / orderSchema.pageSize));
  const visibleOrders = filteredOrders.slice((page - 1) * orderSchema.pageSize, page * orderSchema.pageSize);

  function updateStatus(id: string, nextStatus: OrderStatus) {
    setOrders((current) => current.map((order) => order.id === id ? { ...order, status: nextStatus } : order));
  }

  function exportCsv() {
    const header = ['Order', 'Customer', 'Type', 'Status', 'Total', 'Placed'];
    const rows = filteredOrders.map((order) => [order.id, order.customer, order.type, order.status, order.total, order.placedAt]);
    const csv = [header, ...rows].map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'biteflow-orders.csv';
    link.click();
    URL.revokeObjectURL(url);
  }

  function setFilterStatus(nextStatus: (typeof orderSchema.statusOptions)[number]) {
    setStatus(nextStatus);
    setPage(1);
  }

  function setFilterType(nextType: (typeof orderSchema.typeOptions)[number]) {
    setType(nextType);
    setPage(1);
  }

  function setQueryValue(nextQuery: string) {
    setQuery(nextQuery);
    setPage(1);
  }

  function clearFilters() {
    setQuery('');
    setStatus('All');
    setType('All types');
    setDateRange('Today');
    setPage(1);
  }

  function refreshOrders() {
    setOrders(initialOrders.map((order) => ({ ...order, items: [...order.items] })));
  }

  function setDate(nextDate: (typeof orderSchema.dateOptions)[number]) {
    setDateRange(nextDate);
    setPage(1);
  }

  return {
    filteredOrders, visibleOrders, pageCount, page,
    query, status, type, dateRange,
    setQuery: setQueryValue, setFilterStatus, setFilterType, setDate, clearFilters, refreshOrders, setPage,
    updateStatus, exportCsv, orders,
  };
}
