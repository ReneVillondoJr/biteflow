'use client';

import { useMemo, useState } from 'react';
import { initialPayments } from '../data/payments';
import { paymentSchema } from '../schema';
import type { PaymentStatus, PaymentTransaction } from '../types';

export function usePayments() {
  const [payments, setPayments] = useState(initialPayments);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<(typeof paymentSchema.statusOptions)[number]>('All statuses');
  const [method, setMethod] = useState<(typeof paymentSchema.methodOptions)[number]>('All methods');
  const [dateRange, setDateRange] = useState<(typeof paymentSchema.dateOptions)[number]>('Today');
  const [page, setPage] = useState(1);

  const filteredPayments = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return payments.filter((payment) => {
      const matchesQuery = !normalized || [payment.id, payment.orderId, payment.customer, payment.email].some((value) => value.toLowerCase().includes(normalized));
      const matchesStatus = status === 'All statuses' || payment.status === status;
      const matchesMethod = method === 'All methods' || payment.method === method;
      const matchesDate = dateRange !== 'Today' || payment.placedAt.startsWith('Today');
      return matchesQuery && matchesStatus && matchesMethod && matchesDate;
    });
  }, [payments, query, status, method, dateRange]);

  const pageCount = Math.max(1, Math.ceil(filteredPayments.length / paymentSchema.pageSize));
  const visiblePayments = filteredPayments.slice((page - 1) * paymentSchema.pageSize, page * paymentSchema.pageSize);

  function updateStatus(id: string, nextStatus: PaymentStatus) {
    setPayments((current) => current.map((payment) => payment.id === id ? { ...payment, status: nextStatus } : payment));
  }

  function exportCsv() {
    const header = ['Transaction', 'Order', 'Customer', 'Email', 'Method', 'Status', 'Amount', 'Placed'];
    const rows = filteredPayments.map((payment) => [payment.id, payment.orderId, payment.customer, payment.email, payment.method, payment.status, payment.amount.toFixed(2), payment.placedAt]);
    const csv = [header, ...rows].map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'biteflow-payments.csv';
    link.click();
    URL.revokeObjectURL(url);
  }

  function setFilterStatus(value: (typeof paymentSchema.statusOptions)[number]) { setStatus(value); setPage(1); }
  function setFilterMethod(value: (typeof paymentSchema.methodOptions)[number]) { setMethod(value); setPage(1); }
  function setQueryValue(value: string) { setQuery(value); setPage(1); }
  function clearFilters() { setQuery(''); setStatus('All statuses'); setMethod('All methods'); setDateRange('Today'); setPage(1); }
  function refreshPayments() { setPayments(initialPayments.map((payment): PaymentTransaction => ({ ...payment }))); }
  function setDate(value: (typeof paymentSchema.dateOptions)[number]) { setDateRange(value); setPage(1); }

  return { payments, filteredPayments, visiblePayments, pageCount, page, query, status, method, dateRange, setQuery: setQueryValue, setFilterStatus, setFilterMethod, setDate, clearFilters, refreshPayments, setPage, updateStatus, exportCsv };
}
