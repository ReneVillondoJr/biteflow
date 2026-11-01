'use client';

import { useMemo, useState } from 'react';

import type { Offer, OfferCategory } from '../types/offers';

export function useOffers(categories: OfferCategory[], offers: Offer[]) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredOffers = useMemo(
    () =>
      activeCategory === 'all'
        ? offers
        : offers.filter((offer) => offer.categorySlug === activeCategory),
    [activeCategory, offers],
  );

  return {
    categories,
    activeCategory,
    setActiveCategory,
    filteredOffers,
  };
}
