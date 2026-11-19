'use client';

import { useMemo, useState } from 'react';
import { savePayrollData, usePayrollData } from '../data/store';
import type { PayrollEntry } from '../schema';

export type PayrollDraft = Omit<PayrollEntry, 'id' | 'status'>;
const makeId = () => `payroll-${Date.now().toString(36)}`;

export function usePayroll() {
  const { data, hydrated, storageError } = usePayrollData();
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [notice, setNotice] = useState<string | null>(null);

  function persist(entries: PayrollEntry[], message: string) {
    try { savePayrollData({ entries }); }
    catch { setNotice('Payroll changes could not be saved. Review the record and try again.'); return false; }
    setNotice(message);
    return true;
  }

  function saveEntry(draft: PayrollDraft, id?: string) {
    const existing = data.entries.find((entry) => entry.id === id);
    const entry: PayrollEntry = { ...draft, id: existing?.id ?? makeId(), status: existing?.status ?? 'draft' };
    return persist(existing
      ? data.entries.map((current) => current.id === existing.id ? entry : current)
      : [entry, ...data.entries], existing ? 'Payroll record updated.' : 'Payroll record created as a draft.');
  }

  function setEntryStatus(entry: PayrollEntry, status: PayrollEntry['status']) {
    const label = status === 'paid' ? 'marked paid' : status === 'approved' ? 'approved' : 'returned to draft';
    persist(data.entries.map((current) => current.id === entry.id ? { ...current, status } : current), `Payroll record ${label}.`);
  }

  function removeEntry(entry: PayrollEntry) {
    if (!window.confirm(`Delete payroll record for ${entry.staffName}? This cannot be undone.`)) return;
    persist(data.entries.filter((current) => current.id !== entry.id), 'Payroll record deleted.');
  }

  const filteredEntries = useMemo(() => {
    const term = query.trim().toLowerCase();
    return data.entries.filter((entry) => {
      const matchesText = !term || `${entry.staffName} ${entry.role} ${entry.location}`.toLowerCase().includes(term);
      return matchesText && (statusFilter === 'all' || entry.status === statusFilter);
    });
  }, [data.entries, query, statusFilter]);

  return { entries: data.entries, filteredEntries, hydrated, storageError, notice, setNotice, query, setQuery, statusFilter, setStatusFilter, saveEntry, setEntryStatus, removeEntry };
}
