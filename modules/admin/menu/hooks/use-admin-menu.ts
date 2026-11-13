'use client';

import { useMemo, useState } from 'react';

import { saveMenuData, useMenuData } from '@/modules/menu/data/store';
import type { MenuCategory, MenuItem } from '@/modules/menu/types/menu';

export type MenuItemDraft = Omit<MenuItem, 'slug' | 'categorySlug'>;

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function makeUniqueSlug(name: string, items: MenuItem[]) {
  const baseSlug = slugify(name) || 'menu-item';
  let slug = baseSlug;
  let suffix = 2;

  while (items.some((item) => item.slug === slug)) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return slug;
}

export function useAdminMenu() {
  const { data, hydrated, storageError } = useMenuData();
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [notice, setNotice] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return data.items.filter((item) => {
      const matchesCategory =
        categoryFilter === 'all' || item.categorySlug === categoryFilter;
      const matchesQuery =
        !normalizedQuery ||
        [item.name, item.category, item.description, ...item.tags]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [categoryFilter, data.items, query]);

  function persist(nextData: typeof data, successMessage: string) {
    try {
      setNotice(saveMenuData(nextData) ?? successMessage);
    } catch (error) {
      setNotice(
        error instanceof Error ? error.message : 'Menu changes could not be saved.',
      );
    }
  }

  function saveItem(draft: MenuItemDraft, currentSlug?: string) {
    const categoryLabel = draft.category.trim();
    const categorySlug = slugify(categoryLabel);

    if (!categoryLabel || !categorySlug || categorySlug === 'all') {
      setNotice('Enter a category name other than “All”.');
      return false;
    }

    const existingCategory = data.categories.find(
      (category) => category.slug === categorySlug,
    );
    const category: MenuCategory =
      existingCategory ?? {
        label: categoryLabel,
        slug: categorySlug,
        description: `${categoryLabel} dishes from the BiteFlow menu.`,
      };
    const existingItem = data.items.find((item) => item.slug === currentSlug);
    const item: MenuItem = {
      ...draft,
      name: draft.name.trim(),
      category: category.label,
      categorySlug,
      description: draft.description.trim(),
      tags: draft.tags.map((tag) => tag.trim()).filter(Boolean),
      slug: existingItem?.slug ?? makeUniqueSlug(draft.name, data.items),
      badge: draft.badge?.trim() || undefined,
    };
    const items =
      existingItem ?
        data.items.map((currentItem) =>
          currentItem.slug === existingItem.slug ? item : currentItem,
        )
      : [...data.items, item];
    const categoriesWithNewItem = data.categories.some(
      (currentCategory) => currentCategory.slug === category.slug,
    )
      ? data.categories
      : [...data.categories, category];
    const usedCategories = new Set(
      items.map((currentItem) => currentItem.categorySlug),
    );
    const categories = categoriesWithNewItem.filter(
      (currentCategory) =>
        currentCategory.slug === 'all' ||
        usedCategories.has(currentCategory.slug),
    );

    persist(
      { categories, items },
      existingItem ? 'Dish updated.' : 'Dish added to the menu.',
    );
    return true;
  }

  function removeItem(item: MenuItem) {
    if (!window.confirm(`Remove "${item.name}" from the menu?`)) {
      return;
    }

    const items = data.items.filter((currentItem) => currentItem.slug !== item.slug);
    const usedCategories = new Set(items.map((currentItem) => currentItem.categorySlug));
    const categories = data.categories.filter(
      (category) => category.slug === 'all' || usedCategories.has(category.slug),
    );

    persist({ categories, items }, 'Dish removed from the menu.');
  }

  function toggleItem(item: MenuItem, field: 'isAvailable' | 'isPopular') {
    persist(
      {
        ...data,
        items: data.items.map((currentItem) =>
          currentItem.slug === item.slug ?
            { ...currentItem, [field]: !currentItem[field] }
          : currentItem,
        ),
      },
      field === 'isAvailable' ?
        `${item.name} availability updated.`
      : `${item.name} featured status updated.`,
    );
  }

  function clearFilters() {
    setQuery('');
    setCategoryFilter('all');
  }

  return {
    data,
    filteredItems,
    query,
    setQuery,
    categoryFilter,
    setCategoryFilter,
    hydrated,
    storageError,
    notice,
    setNotice,
    saveItem,
    removeItem,
    toggleItem,
    clearFilters,
  };
}
