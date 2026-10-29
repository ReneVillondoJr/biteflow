'use client';

import { useMemo, useState } from 'react';

import type { MenuCategory, MenuItem, MenuSortOption } from '../types/menu';

export function useMenuFilters(items: MenuItem[], categories: MenuCategory[]) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<MenuSortOption>('featured');

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = items.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.categorySlug === activeCategory;

      const searchableText = [
        item.name,
        item.category,
        item.description,
        ...item.tags,
      ]
        .join(' ')
        .toLowerCase();

      const matchesSearch =
        query.length === 0 || searchableText.includes(query);

      return matchesCategory && matchesSearch;
    });

    switch (sortBy) {
      case 'price-low':
        return result.sort((a, b) => a.price - b.price);

      case 'price-high':
        return result.sort((a, b) => b.price - a.price);

      case 'name':
        return result.sort((a, b) => a.name.localeCompare(b.name));

      default:
        return result.sort((a, b) => Number(b.isPopular) - Number(a.isPopular));
    }
  }, [activeCategory, items, search, sortBy]);

  const activeCategoryLabel =
    categories.find((category) => category.slug === activeCategory)?.label ??
    'All favorites';

  return {
    activeCategory,
    setActiveCategory,
    search,
    setSearch,
    sortBy,
    setSortBy,
    filteredItems,
    activeCategoryLabel,
  };
}
