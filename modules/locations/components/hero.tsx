import { Bike, MapPin, Navigation, Search, Store } from 'lucide-react';

import type { LocationFilter } from '../types/locations';

type LocationsHeroProps = {
  query: string;
  service: LocationFilter;
  onQueryChange: (value: string) => void;
  onServiceChange: (value: LocationFilter) => void;
};

export default function LocationsHero({
  query,
  service,
  onQueryChange,
  onServiceChange,
}: LocationsHeroProps) {
  return (
    <section className='locations-hero'>
      <div className='container locations-hero-grid'>
        <div className='locations-hero-copy'>
          <div className='hero-eyebrow'>
            <MapPin aria-hidden='true' />
            <span>Find your BiteFlow</span>
          </div>
          <h1>
            Your favorite food,
            <br />
            <em>closer than ever.</em>
          </h1>
          <p>
            Choose a nearby location for pickup or delivery, then we will guide
            you straight to the menu.
          </p>
        </div>

        <div className='location-search-card'>
          <label htmlFor='location-search'>Enter an address or city</label>
          <div className='location-search-input'>
            <Search aria-hidden='true' />
            <input
              id='location-search'
              type='search'
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder='Makati, BGC, Ortigas...'
            />
            <button
              type='button'
              aria-label='Use current location'
              onClick={() => onQueryChange('Makati')}
            >
              <Navigation aria-hidden='true' />
            </button>
          </div>

          <div className='location-service-filter' aria-label='Order service'>
            <button
              className={service === 'all' ? 'active' : undefined}
              type='button'
              onClick={() => onServiceChange('all')}
            >
              All locations
            </button>
            <button
              className={service === 'pickup' ? 'active' : undefined}
              type='button'
              onClick={() => onServiceChange('pickup')}
            >
              <Store aria-hidden='true' />
              Pickup
            </button>
            <button
              className={service === 'delivery' ? 'active' : undefined}
              type='button'
              onClick={() => onServiceChange('delivery')}
            >
              <Bike aria-hidden='true' />
              Delivery
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
