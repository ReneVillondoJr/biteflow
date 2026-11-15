'use client';

import { useMemo, useState } from 'react';
import { savePromotionsData, usePromotionsData } from '../data/store';
import type { Promotion } from '../schema';
import { getPromotionStatus } from '../utils';

const makeId = (name: string) => `${name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString(36)}`;

export function usePromotions() {
  const { data, hydrated, storageError, today } = usePromotionsData();
  const [notice, setNotice] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  function persist(promotions: Promotion[], message: string) {
    try { savePromotionsData({ promotions }); }
    catch { setNotice('Promotion details could not be saved. Check the form and try again.'); return false; }
    setNotice(message);
    return true;
  }

  function savePromotion(draft: Omit<Promotion, 'id'>, id?: string) {
    const existing = data.promotions.find((promotion) => promotion.id === id);
    const promotion: Promotion = { ...draft, code: draft.code.trim().toUpperCase(), name: draft.name.trim(), id: existing?.id ?? makeId(draft.name) };
    if (data.promotions.some((current) => current.id !== promotion.id && current.code.toUpperCase() === promotion.code)) {
      setNotice('That promotion code is already in use. Choose a unique code.');
      return false;
    }
    return persist(existing
      ? data.promotions.map((current) => current.id === existing.id ? promotion : current)
      : [promotion, ...data.promotions], existing ? 'Promotion updated.' : 'Promotion created.');
  }

  function togglePromotion(promotion: Promotion) {
    const status = promotion.status === 'active' ? 'paused' : 'active';
    persist(data.promotions.map((current) => current.id === promotion.id ? { ...current, status } : current), status === 'active' ? 'Promotion activated.' : 'Promotion paused.');
  }

  function removePromotion(promotion: Promotion) {
    if (!window.confirm(`Delete ${promotion.name}? This cannot be undone.`)) return;
    persist(data.promotions.filter((current) => current.id !== promotion.id), 'Promotion deleted.');
  }

  const filteredPromotions = useMemo(() => {
    const term = query.trim().toLowerCase();
    return data.promotions.filter((promotion) => {
      const matchesText = !term || `${promotion.name} ${promotion.code} ${promotion.description}`.toLowerCase().includes(term);
      return matchesText && (filter === 'all' || getPromotionStatus(promotion, today) === filter);
    });
  }, [data.promotions, filter, query, today]);

  return { promotions: data.promotions, filteredPromotions, hydrated, storageError, notice, setNotice, query, setQuery, filter, setFilter, today, savePromotion, togglePromotion, removePromotion };
}
