'use client';

import { useEffect, useMemo, useState } from 'react';
import { initialDeliveryTickets } from '../data/delivery';
import { deliverySchema } from '../schema';
import type { DeliveryStatus, DeliveryTicket } from '../types/delivery';

export function useDelivery() {
  const [tickets, setTickets] = useState<DeliveryTicket[]>(initialDeliveryTickets);
  const [query, setQuery] = useState('');
  const [rider, setRider] = useState<(typeof deliverySchema.riderOptions)[number]>('All riders');
  const [status, setStatus] = useState<(typeof deliverySchema.statusFilters)[number]>('All deliveries');
  const [clock, setClock] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setClock((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const visibleTickets = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return tickets.filter((ticket) => {
      const matchesQuery = !normalized ||
        ticket.id.toLowerCase().includes(normalized) ||
        ticket.customer.toLowerCase().includes(normalized) ||
        ticket.address.toLowerCase().includes(normalized) ||
        ticket.items.some((item) => item.name.toLowerCase().includes(normalized));
      const matchesRider = rider === 'All riders' || ticket.rider === rider;
      const matchesStatus = status === 'All deliveries' || ticket.status === status;
      return matchesQuery && matchesRider && matchesStatus;
    });
  }, [tickets, query, rider, status]);

  function updateStatus(id: string, nextStatus: DeliveryStatus) {
    setTickets((current) => current.map((ticket) => {
      if (ticket.id !== id) return ticket;
      const completed = nextStatus === 'Completed';
      return {
        ...ticket,
        status: nextStatus,
        elapsedSeconds: completed ? ticket.elapsedSeconds + (ticket.startedAt ? clock : 0) : ticket.elapsedSeconds,
        startedAt: completed || nextStatus === 'Queued' ? null : 1,
        completedAt: completed ? new Date().toISOString() : null,
      };
    }));
  }

  function assignRider(id: string, nextRider: string) {
    setTickets((current) => current.map((ticket) => ticket.id === id ? { ...ticket, rider: nextRider } : ticket));
  }

  function clearFilters() {
    setQuery('');
    setRider('All riders');
    setStatus('All deliveries');
  }

  function refreshDeliveries() {
    setTickets(initialDeliveryTickets.map((ticket) => ({ ...ticket, items: ticket.items.map((item) => ({ ...item })) })));
    setClock(0);
  }

  function elapsed(ticket: DeliveryTicket) {
    return ticket.elapsedSeconds + (ticket.startedAt ? clock : 0);
  }

  const metrics = {
    queued: tickets.filter((ticket) => ticket.status === 'Queued').length,
    preparing: tickets.filter((ticket) => ticket.status === 'Preparing').length,
    ready: tickets.filter((ticket) => ticket.status === 'Ready').length,
    onDelivery: tickets.filter((ticket) => ticket.status === 'On delivery').length,
    completed: tickets.filter((ticket) => ticket.status === 'Completed').length,
  };

  return {
    visibleTickets, query, rider, status, metrics, elapsed,
    setQuery, setRider, setStatus, clearFilters, refreshDeliveries,
    updateStatus, assignRider,
  };
}
