'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { promotionsData } from './promotions';
import { promotionsDataSchema, type PromotionsData } from '../schema';
import { localDateValue } from '../utils';

const storageKey = 'biteflow_promotions_data';
type Snapshot = { data: PromotionsData; hydrated: boolean; storageError: string | null; today: string };
const initialSnapshot: Snapshot = { data: promotionsData, hydrated: false, storageError: null, today: '' };
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
    const data = saved ? promotionsDataSchema.parse(JSON.parse(saved)) : promotionsData;
    publish({ data, hydrated: true, storageError: null, today: localDateValue(new Date()) });
  } catch {
    publish({ data: promotionsData, hydrated: true, storageError: 'Saved promotions could not be loaded. Sample promotions are shown.', today: localDateValue(new Date()) });
  }
}

export function savePromotionsData(data: PromotionsData) {
  const result = promotionsDataSchema.safeParse(data);
  if (!result.success) throw new Error('Promotion data failed validation and was not saved.');
  let storageError: string | null = null;
  try { window.localStorage.setItem(storageKey, JSON.stringify(result.data)); }
  catch { storageError = 'Changes are active for this visit but could not be saved in this browser.'; }
  publish({ data: result.data, hydrated: true, storageError, today: snapshot.today || localDateValue(new Date()) });
}

export function usePromotionsData() {
  const current = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  useEffect(() => { initialize(); }, []);
  return current;
}
