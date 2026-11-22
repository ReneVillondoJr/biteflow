'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { defaultSettings } from './settings';
import { settingsSchema, type Settings } from '../schema';

const storageKey = 'biteflow_settings';
type Snapshot = { data: Settings; hydrated: boolean; storageError: string | null };
const initialSnapshot: Snapshot = { data: defaultSettings, hydrated: false, storageError: null };
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
    const data = saved ? settingsSchema.parse({ ...defaultSettings, ...JSON.parse(saved) }) : defaultSettings;
    publish({ data, hydrated: true, storageError: null });
  } catch {
    publish({ data: defaultSettings, hydrated: true, storageError: 'Saved settings could not be loaded. Default settings are shown.' });
  }
}

export function saveSettings(data: Settings) {
  const result = settingsSchema.safeParse(data);
  if (!result.success) throw new Error('Settings failed validation and were not saved.');
  let storageError: string | null = null;
  try { window.localStorage.setItem(storageKey, JSON.stringify(result.data)); }
  catch { storageError = 'Changes are active for this visit but could not be saved in this browser.'; }
  publish({ data: result.data, hydrated: true, storageError });
}

export function useSettingsData() {
  const current = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  useEffect(() => { initialize(); }, []);
  return current;
}
