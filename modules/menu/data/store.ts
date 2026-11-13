'use client';

import { useEffect, useSyncExternalStore } from 'react';

import { menuData } from './menu';
import { menuDataSchema } from '../schema';
import type { MenuData } from '../types/menu';

const menuStorageKey = 'biteflow_menu_data';

type MenuSnapshot = {
  data: MenuData;
  hydrated: boolean;
  storageError: string | null;
};

const initialSnapshot: MenuSnapshot = {
  data: menuData,
  hydrated: false,
  storageError: null,
};

let snapshot = initialSnapshot;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return snapshot;
}

function getServerSnapshot() {
  return initialSnapshot;
}

function publish(nextSnapshot: MenuSnapshot) {
  snapshot = nextSnapshot;
  listeners.forEach((listener) => listener());
}

function initializeMenu() {
  if (snapshot.hydrated) {
    return;
  }

  let data = menuData;
  let storageError: string | null = null;

  try {
    const savedMenu = window.localStorage.getItem(menuStorageKey);

    if (savedMenu) {
      const result = menuDataSchema.safeParse(JSON.parse(savedMenu));

      if (!result.success) {
        throw new Error('Saved menu data is invalid.');
      }

      data = result.data;
    }
  } catch {
    storageError =
      'Saved menu data could not be loaded. The default menu is shown.';
  }

  publish({ data, storageError, hydrated: true });
}

export function saveMenuData(data: MenuData) {
  const result = menuDataSchema.safeParse(data);

  if (!result.success) {
    throw new Error('Menu data failed validation and was not saved.');
  }

  let storageError: string | null = null;

  try {
    window.localStorage.setItem(menuStorageKey, JSON.stringify(result.data));
  } catch {
    storageError =
      'Menu changes are active for this visit but could not be saved in this browser.';
  }

  publish({ data: result.data, storageError, hydrated: true });
  return storageError;
}

export function useMenuData() {
  const menuSnapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  useEffect(() => {
    initializeMenu();
  }, []);

  return menuSnapshot;
}
