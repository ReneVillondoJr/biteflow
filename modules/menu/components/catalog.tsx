'use client';

import { useMenuFilters } from '../hooks/use-filters';
import type { MenuData } from '../types/menu';

import MenuFilters from './filters';
import MenuGrid from './grid';

type MenuCatalogProps = {
  data: MenuData;
};

export default function MenuCatalog({ data }: MenuCatalogProps) {
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
    <section className='section menu-catalog-section' id='menu-catalog'>
      <div className='container'>
        <div className='menu-catalog-heading'>
          <div>
            <span className='section-label'>
              <span className='section-label__dot' />
              Explore the menu
            </span>

            <h2 className='display-heading'>
              A little something
              <br />
              for <em>every craving.</em>
            </h2>

            <p className='section-description'>
              Browse the collection, find what you love, and discover something
              new for your next meal.
            </p>
          </div>

          <div className='menu-catalog-count'>
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

        <div className='menu-results-heading' aria-live='polite'>
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
        : <div className='menu-empty-state'>
            <div className='menu-empty-icon'>⌕</div>
            <h3>No dishes found</h3>
            <p>Try another search or choose a different menu category.</p>
            <button
              className='button button--primary'
              type='button'
              onClick={clearFilters}
            >
              Clear all filters
            </button>
          </div>
        }
      </div>
    </section>
  );
}
