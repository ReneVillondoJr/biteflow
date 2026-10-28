'use client';

import { useMemo, useState } from 'react';

import { homeContent } from '../data/home';

export function useFeaturedMenu() {
  const [activeCategory, setActiveCategory] = useState('all');

  const items = useMemo(() => {
    if (activeCategory === 'all') {
      return homeContent.featuredItems;
    }

    return homeContent.featuredItems.filter(
      (item) => item.categorySlug === activeCategory,
    );
  }, [activeCategory]);

  return {
    categories: homeContent.menuCategories,
    activeCategory,
    setActiveCategory,
    items,
  };
}
