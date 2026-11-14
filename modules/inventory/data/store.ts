'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { inventoryData } from './inventory';
import { inventoryDataSchema, type InventoryData } from '../schema';

const storageKey = 'biteflow_inventory_data';
type Snapshot = { data: InventoryData; hydrated: boolean; storageError: string | null };
const initialSnapshot: Snapshot = { data: inventoryData, hydrated: false, storageError: null };
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
    const data = saved ? inventoryDataSchema.parse(JSON.parse(saved)) : inventoryData;
    publish({ data, hydrated: true, storageError: null });
  } catch {
    publish({ data: inventoryData, hydrated: true, storageError: 'Saved inventory could not be loaded. Default stock is shown.' });
  }
}

export function saveInventoryData(data: InventoryData) {
  const result = inventoryDataSchema.safeParse(data);
  if (!result.success) throw new Error('Inventory data failed validation and was not saved.');
  let storageError: string | null = null;
  try { window.localStorage.setItem(storageKey, JSON.stringify(result.data)); }
  catch { storageError = 'Changes are active for this visit but could not be saved in this browser.'; }
  publish({ data: result.data, hydrated: true, storageError });
  return storageError;
}

export function useInventoryData() {
  const current = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  useEffect(() => { initialize(); }, []);
  return current;
}
