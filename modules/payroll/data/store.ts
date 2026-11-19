'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { payrollData } from './payroll';
import { payrollDataSchema, type PayrollData } from '../schema';

const storageKey = 'biteflow_payroll_data';
type Snapshot = { data: PayrollData; hydrated: boolean; storageError: string | null };
const initialSnapshot: Snapshot = { data: payrollData, hydrated: false, storageError: null };
let snapshot = initialSnapshot;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) { listeners.add(listener); return () => { listeners.delete(listener); }; }
function getSnapshot() { return snapshot; }
function getServerSnapshot() { return initialSnapshot; }
function publish(next: Snapshot) { snapshot = next; listeners.forEach((listener) => listener()); }

function initialize() {
  if (snapshot.hydrated) return;
  try {
    const saved = window.localStorage.getItem(storageKey);
    const data = saved ? payrollDataSchema.parse(JSON.parse(saved)) : payrollData;
    publish({ data, hydrated: true, storageError: null });
  } catch {
    publish({ data: payrollData, hydrated: true, storageError: 'Saved payroll records could not be loaded. No records are shown.' });
  }
}

export function savePayrollData(data: PayrollData) {
  const result = payrollDataSchema.safeParse(data);
  if (!result.success) throw new Error('Payroll data failed validation and was not saved.');
  let storageError: string | null = null;
  try { window.localStorage.setItem(storageKey, JSON.stringify(result.data)); }
  catch { storageError = 'Changes are active for this visit but could not be saved in this browser.'; }
  publish({ data: result.data, hydrated: true, storageError });
}

export function usePayrollData() {
  const current = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  useEffect(() => { initialize(); }, []);
  return current;
}
