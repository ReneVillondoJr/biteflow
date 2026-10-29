'use client';

import { Search, SlidersHorizontal, X } from 'lucide-react';

import type { MenuCategory, MenuSortOption } from '../types/menu';

type MenuFiltersProps = {
  categories: MenuCategory[];
  activeCategory: string;
  search: string;
  sortBy: MenuSortOption;
  resultCount: number;
  onCategoryChange: (slug: string) => void;
  onSearchChange: (value: string) => void;
  onSortChange: (value: MenuSortOption) => void;
  onClear: () => void;
};

export default function MenuFilters({
  categories,
  activeCategory,
  search,
  sortBy,
  resultCount,
  onCategoryChange,
  onSearchChange,
  onSortChange,
  onClear,
}: MenuFiltersProps) {
  const hasActiveFilters = activeCategory !== 'all' || search.trim().length > 0;

  return (
    <div className='menu-filter-panel'>
      <div className='menu-filter-top'>
        <div className='menu-search'>
          <Search aria-hidden='true' />

          <input
            type='search'
            aria-label='Search menu items'
            placeholder='Search dishes, ingredients, or categories...'
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
          />

          {search ?
            <button
              className='menu-search-clear'
              type='button'
              aria-label='Clear search'
              onClick={() => onSearchChange('')}
            >
              <X aria-hidden='true' />
            </button>
          : null}
        </div>

        <label className='menu-sort'>
          <SlidersHorizontal aria-hidden='true' />

          <span className='menu-sort-label'>Sort</span>

          <select
            aria-label='Sort menu items'
            value={sortBy}
            onChange={(event) =>
              onSortChange(event.target.value as MenuSortOption)
            }
          >
            <option value='featured'>Recommended</option>
            <option value='price-low'>Price: low to high</option>
            <option value='price-high'>Price: high to low</option>
            <option value='name'>Name: A–Z</option>
          </select>
        </label>
      </div>

      <div className='menu-filter-bottom'>
        <div className='menu-filter-categories' aria-label='Menu categories'>
          {categories.map((category) => (
            <button
              className={
                activeCategory === category.slug ?
                  'menu-category menu-category--active'
                : 'menu-category'
              }
              type='button'
              key={category.slug}
              onClick={() => onCategoryChange(category.slug)}
              aria-pressed={activeCategory === category.slug}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className='menu-filter-meta'>
          <span>
            <strong>{resultCount}</strong>{' '}
            {resultCount === 1 ? 'dish' : 'dishes'}
          </span>

          {hasActiveFilters ?
            <button
              className='menu-clear-filters'
              type='button'
              onClick={onClear}
            >
              Clear filters
              <X aria-hidden='true' />
            </button>
          : null}
        </div>
      </div>
    </div>
  );
}
