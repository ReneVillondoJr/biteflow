'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { customersData } from './customers';
import { customersDataSchema, type CustomersData } from '../schema';

const storageKey = 'biteflow_customers_data';
type Snapshot = { data: CustomersData; hydrated: boolean; storageError: string | null };
const initialSnapshot: Snapshot = { data: customersData, hydrated: false, storageError: null };
let snapshot = initialSnapshot;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

function getSnapshot() { return snapshot; }
function getServerSnapshot() { return initialSnapshot; }
function publish(next: Snapshot) {
  snapshot = next;
  listeners.forEach((listener) => listener());
}

function initialize() {
  if (snapshot.hydrated) return;
  try {
    const saved = window.localStorage.getItem(storageKey);
    const data = saved ? customersDataSchema.parse(JSON.parse(saved)) : customersData;
    publish({ data, hydrated: true, storageError: null });
  } catch {
    publish({ data: customersData, hydrated: true, storageError: 'Saved customer data could not be loaded. Sample customers are shown.' });
  }
}

export function saveCustomersData(data: CustomersData) {
  const result = customersDataSchema.safeParse(data);
  if (!result.success) throw new Error('Customer data failed validation and was not saved.');
  let storageError: string | null = null;
  try { window.localStorage.setItem(storageKey, JSON.stringify(result.data)); }
  catch { storageError = 'Changes are active for this visit but could not be saved in this browser.'; }
  publish({ data: result.data, hydrated: true, storageError });
}

export function useCustomersData() {
  const current = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  useEffect(() => { initialize(); }, []);
  return current;
}
