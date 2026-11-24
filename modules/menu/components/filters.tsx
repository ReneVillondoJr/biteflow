'use client';

import { Search, SlidersHorizontal, X } from 'lucide-react';

import type { MenuCategory, MenuSortOption } from '../types/menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SelectMenu } from '@/components/select';

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
    <div className='rounded-2xl border border-border bg-card p-4 shadow-sm'>
      <div className='flex flex-col gap-3 sm:flex-row'>
        <div className='relative flex-1'>
          <Search aria-hidden='true' />

          <Input
            type='search'
            aria-label='Search menu items'
            className='search-field-input h-9 pl-3 pr-9'
            placeholder='Search dishes, ingredients, or categories...'
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
          />

          {search ?
            <Button
              variant='ghost'
              size='icon-xs'
              className='absolute right-1 top-0.5'
              type='button'
              aria-label='Clear search'
              onClick={() => onSearchChange('')}
            >
              <X aria-hidden='true' />
            </Button>
          : null}
        </div>

        <label className='flex items-center gap-2'>
          <SlidersHorizontal aria-hidden='true' />

          <span className='menu-sort-label'>Sort</span>

          <SelectMenu
            label='Sort menu items'
            value={sortBy}
            onChange={onSortChange}
            options={[{ value: 'featured', label: 'Recommended' }, { value: 'price-low', label: 'Price: low to high' }, { value: 'price-high', label: 'Price: high to low' }, { value: 'name', label: 'Name: A–Z' }]}
            className='min-w-44'
          />
        </label>
      </div>

      <div className='mt-4 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex flex-wrap gap-2' aria-label='Menu categories'>
          {categories.map((category) => (
            <Button
              className={`rounded-full border px-3 py-1.5 text-xs font-bold transition-colors ${activeCategory === category.slug ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background text-muted-foreground hover:bg-muted'}`}
              type='button'
              key={category.slug}
              onClick={() => onCategoryChange(category.slug)}
              aria-pressed={activeCategory === category.slug}
            >
              {category.label}
            </Button>
          ))}
        </div>

        <div className='menu-filter-meta'>
          <span>
            <strong>{resultCount}</strong>{' '}
            {resultCount === 1 ? 'dish' : 'dishes'}
          </span>

          {hasActiveFilters ?
            <Button
              variant='ghost'
              size='sm'
              type='button'
              onClick={onClear}
            >
              Clear filters
              <X aria-hidden='true' />
            </Button>
          : null}
        </div>
      </div>
    </div>
  );
}
