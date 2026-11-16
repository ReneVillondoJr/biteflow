'use client';

import { useMemo, useState } from 'react';
import { saveCustomersData, useCustomersData } from '../data/store';
import type { Customer } from '../schema';

type CustomerDraft = Pick<Customer, 'name' | 'email' | 'phone' | 'status' | 'tier' | 'preferredContact' | 'notes'>;
const makeId = () => `customer-${Date.now().toString(36)}`;
const localDate = () => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

export function useCustomers() {
  const { data, hydrated, storageError } = useCustomersData();
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tierFilter, setTierFilter] = useState('all');
  const [notice, setNotice] = useState<string | null>(null);

  function persist(customers: Customer[], message: string) {
    try { saveCustomersData({ customers }); }
    catch { setNotice('Customer changes could not be saved. Check the profile details and try again.'); return false; }
    setNotice(message);
    return true;
  }

  function saveCustomer(draft: CustomerDraft, id?: string) {
    const existing = data.customers.find((customer) => customer.id === id);
    const email = draft.email.trim().toLowerCase();
    if (data.customers.some((customer) => customer.id !== id && customer.email.toLowerCase() === email)) {
      setNotice('That email address is already attached to another customer.');
      return false;
    }
    const customer: Customer = {
      ...draft,
      name: draft.name.trim(),
      email,
      phone: draft.phone.trim(),
      notes: draft.notes.trim(),
      id: existing?.id ?? makeId(),
      joinedAt: existing?.joinedAt ?? localDate(),
      ordersCount: existing?.ordersCount ?? 0,
      lifetimeValue: existing?.lifetimeValue ?? 0,
    };
    return persist(existing
      ? data.customers.map((current) => current.id === existing.id ? customer : current)
      : [customer, ...data.customers], existing ? 'Customer profile updated.' : 'Customer added.');
  }

  function toggleStatus(customer: Customer) {
    const status = customer.status === 'active' ? 'inactive' : 'active';
    persist(data.customers.map((current) => current.id === customer.id ? { ...current, status } : current), `Customer ${status === 'active' ? 'activated' : 'deactivated'}.`);
  }

  function removeCustomer(customer: Customer) {
    if (!window.confirm(`Remove ${customer.name} from customer records? This cannot be undone.`)) return;
    persist(data.customers.filter((current) => current.id !== customer.id), 'Customer removed.');
  }

  const filteredCustomers = useMemo(() => {
    const term = query.trim().toLowerCase();
    return data.customers.filter((customer) => {
      const matchesQuery = !term || `${customer.name} ${customer.email} ${customer.phone}`.toLowerCase().includes(term);
      return matchesQuery && (statusFilter === 'all' || customer.status === statusFilter) && (tierFilter === 'all' || customer.tier === tierFilter);
    });
  }, [data.customers, query, statusFilter, tierFilter]);

  return { customers: data.customers, filteredCustomers, hydrated, storageError, notice, setNotice, query, setQuery, statusFilter, setStatusFilter, tierFilter, setTierFilter, saveCustomer, toggleStatus, removeCustomer };
}
