'use client';

import { useEffect, useMemo, useState } from 'react';
import { initialKitchenTickets } from '../data/kitchen';
import { kitchenSchema } from '../schema';
import type { KitchenStatus, KitchenTicket } from '../types/kitchen';

export function useKitchen() {
  const [tickets, setTickets] = useState<KitchenTicket[]>(initialKitchenTickets);
  const [query, setQuery] = useState('');
  const [station, setStation] = useState<(typeof kitchenSchema.stationOptions)[number]>('All stations');
  const [status, setStatus] = useState<(typeof kitchenSchema.statusFilters)[number]>('All tickets');
  const [clock, setClock] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setClock((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const visibleTickets = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return tickets.filter((ticket) => {
      const matchesQuery = !normalized ||
        ticket.orderNumber.toLowerCase().includes(normalized) ||
        ticket.customer.toLowerCase().includes(normalized) ||
        ticket.items.some((item) => item.name.toLowerCase().includes(normalized));
      const matchesStation = station === 'All stations' || ticket.station === station;
      const matchesStatus = status === 'All tickets' || ticket.status === status;
      return matchesQuery && matchesStation && matchesStatus;
    });
  }, [tickets, query, station, status]);

  function updateStatus(id: string, nextStatus: KitchenStatus) {
    setTickets((current) => current.map((ticket) => {
      if (ticket.id !== id) return ticket;

      const currentElapsed = ticket.elapsedSeconds + (ticket.startedAt ? clock : 0);
      const completed = nextStatus === 'Completed';
      return {
        ...ticket,
        status: nextStatus,
        held: false,
        elapsedSeconds: completed ? currentElapsed : ticket.elapsedSeconds,
        startedAt: nextStatus === 'Queued' || completed ? null : 1,
        completedAt: completed ? new Date().toISOString() : null,
      };
    }));
  }

  function toggleHeld(id: string) {
    setTickets((current) => current.map((ticket) => ticket.id === id ? { ...ticket, held: !ticket.held } : ticket));
  }

  function togglePriority(id: string) {
    setTickets((current) => current.map((ticket) => ticket.id === id
      ? { ...ticket, priority: ticket.priority === 'Priority' ? 'Normal' : 'Priority' }
      : ticket));
  }

  function clearFilters() {
    setQuery('');
    setStation('All stations');
    setStatus('All tickets');
  }

  function refreshKitchen() {
    setTickets(initialKitchenTickets.map((ticket) => ({ ...ticket, items: ticket.items.map((item) => ({ ...item })) })));
    setClock(0);
  }

  function elapsed(ticket: KitchenTicket) {
    return ticket.elapsedSeconds + (ticket.startedAt ? clock : 0);
  }

  const metrics = {
    queued: tickets.filter((ticket) => ticket.status === 'Queued').length,
    preparing: tickets.filter((ticket) => ticket.status === 'Preparing' && !ticket.held).length,
    ready: tickets.filter((ticket) => ticket.status === 'Ready').length,
    completed: tickets.filter((ticket) => ticket.status === 'Completed').length,
    priority: tickets.filter((ticket) =>
      ticket.priority === 'Priority' && ticket.status !== 'Ready' && ticket.status !== 'Completed'
    ).length,
    held: tickets.filter((ticket) => ticket.held).length,
  };

  return {
    tickets, visibleTickets, query, station, status, clock, metrics,
    elapsed, setQuery, setStation, setStatus, clearFilters, refreshKitchen,
    updateStatus, toggleHeld, togglePriority,
  };
}
