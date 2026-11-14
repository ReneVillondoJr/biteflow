'use client';

import { useMemo, useState } from 'react';
import { saveInventoryData, useInventoryData } from '../data/store';
import type { InventoryItem } from '../schema';

const makeId = (name: string) => `${name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString(36)}`;

export function useInventory() {
  const { data, hydrated, storageError } = useInventoryData();
  const items = data.items;
  const [notice, setNotice] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [stockFilter, setStockFilter] = useState<'all' | 'low' | 'healthy'>('all');

  function persist(nextItems: InventoryItem[], message: string) {
    try { saveInventoryData({ items: nextItems }); }
    catch { setNotice('Inventory changes failed validation.'); return false; }
    setNotice(message);
    return true;
  }

  function saveItem(draft: Omit<InventoryItem, 'id' | 'updatedAt'>, id?: string) {
    const existing = items.find((item) => item.id === id);
    const item: InventoryItem = { ...draft, name: draft.name.trim(), category: draft.category.trim(), unit: draft.unit.trim(), id: existing?.id ?? makeId(draft.name), updatedAt: 'Just now' };
    return persist(existing ? items.map((current) => current.id === id ? item : current) : [...items, item], existing ? 'Inventory item updated.' : 'Inventory item added.');
  }

  function adjustStock(item: InventoryItem, delta: number) {
    const quantity = item.quantity + delta;
    if (quantity < 0) { setNotice('Stock quantity cannot go below zero.'); return; }
    persist(items.map((current) => current.id === item.id ? { ...current, quantity, updatedAt: 'Just now' } : current), `${item.name} stock updated.`);
  }

  function removeItem(item: InventoryItem) {
    if (!window.confirm(`Remove ${item.name} from inventory?`)) return;
    persist(items.filter((current) => current.id !== item.id), 'Inventory item removed.');
  }

  const categories = useMemo(() => ['all', ...new Set(items.map((item) => item.category))], [items]);
  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesQuery = !normalized || `${item.name} ${item.category}`.toLowerCase().includes(normalized);
      const low = item.quantity <= item.reorderAt;
      return matchesQuery && (category === 'all' || item.category === category) && (stockFilter === 'all' || (stockFilter === 'low' ? low : !low));
    });
  }, [category, items, query, stockFilter]);

  return { items, filteredItems, categories, hydrated, storageError, notice, setNotice, query, setQuery, category, setCategory, stockFilter, setStockFilter, saveItem, adjustStock, removeItem };
}
