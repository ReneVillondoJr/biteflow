'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { staffData } from './staff';
import { staffDataSchema, type StaffData } from '../schema';

const storageKey = 'biteflow_staff_data';
type Snapshot = { data: StaffData; hydrated: boolean; storageError: string | null };
const initialSnapshot: Snapshot = { data: staffData, hydrated: false, storageError: null };
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
    const data = saved ? staffDataSchema.parse(JSON.parse(saved)) : staffData;
    publish({ data, hydrated: true, storageError: null });
  } catch {
    publish({ data: staffData, hydrated: true, storageError: 'Saved staff data could not be loaded. Sample staff records are shown.' });
  }
}

export function saveStaffData(data: StaffData) {
  const result = staffDataSchema.safeParse(data);
  if (!result.success) throw new Error('Staff data failed validation and was not saved.');
  let storageError: string | null = null;
  try { window.localStorage.setItem(storageKey, JSON.stringify(result.data)); }
  catch { storageError = 'Changes are active for this visit but could not be saved in this browser.'; }
  publish({ data: result.data, hydrated: true, storageError });
}

export function useStaffData() {
  const current = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  useEffect(() => { initialize(); }, []);
  return current;
}
