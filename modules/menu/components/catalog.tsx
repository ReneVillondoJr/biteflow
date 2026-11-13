'use client';

import { useMenuFilters } from '../hooks/use-filters';
import { useMenuData } from '../data/store';

import MenuFilters from './filters';
import MenuGrid from './grid';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function MenuCatalog() {
  const { data } = useMenuData();
  const {
    activeCategory,
    setActiveCategory,
    search,
    setSearch,
    sortBy,
    setSortBy,
    filteredItems,
    activeCategoryLabel,
  } = useMenuFilters(data.items, data.categories);

  function clearFilters() {
    setActiveCategory('all');
    setSearch('');
  }

  return (
    <section className='scroll-mt-24 py-16 md:py-24' id='menu-catalog'>
      <div className='mx-auto w-full max-w-[1200px] px-4 md:px-6'>
        <div className='mb-8 flex items-end justify-between gap-6'>
          <div>
            <span className='inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[.16em] text-primary'>
              <span className='size-2 rounded-full bg-accent' />
              Explore the menu
            </span>

            <h2 className='mt-4 font-heading text-4xl leading-tight tracking-tight md:text-5xl'>
              A little something
              <br />
              for <em>every craving.</em>
            </h2>

            <p className='mt-4 max-w-xl text-sm leading-7 text-muted-foreground'>
              Browse the collection, find what you love, and discover something
              new for your next meal.
            </p>
          </div>

          <div className='hidden min-w-36 text-right sm:grid'>
            <span className='menu-catalog-count-number'>
              {data.items.length.toString().padStart(2, '0')}
            </span>
            <span>menu favorites</span>
          </div>
        </div>

        <MenuFilters
          categories={data.categories}
          activeCategory={activeCategory}
          search={search}
          sortBy={sortBy}
          resultCount={filteredItems.length}
          onCategoryChange={setActiveCategory}
          onSearchChange={setSearch}
          onSortChange={setSortBy}
          onClear={clearFilters}
        />

        <div className='mb-5 mt-8 flex items-end justify-between' aria-live='polite'>
          <div>
            <h3>{activeCategoryLabel}</h3>
            <p>
              {search.trim() ?
                `Search results for “${search.trim()}”`
              : 'Made for good meals and everyday moments.'}
            </p>
          </div>
        </div>

        {filteredItems.length > 0 ?
          <MenuGrid items={filteredItems} />
        : <Card className='grid min-h-64 place-content-center justify-items-center rounded-2xl border-border text-center'>
            <div className='text-3xl text-muted-foreground'>⌕</div>
            <h3>No dishes found</h3>
            <p>Try another search or choose a different menu category.</p>
            <Button
              type='button'
              onClick={clearFilters}
            >
              Clear all filters
            </Button>
          </Card>
        }
      </div>
    </section>
  );
}
