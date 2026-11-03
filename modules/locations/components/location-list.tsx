import { MapPin } from 'lucide-react';

import type { BiteFlowLocation } from '../types/locations';
import LocationCard from './location-card';

type LocationListProps = {
  locations: BiteFlowLocation[];
  selectedId: number;
  onSelect: (id: number) => void;
  onClear: () => void;
};

export default function LocationList({
  locations,
  selectedId,
  onSelect,
  onClear,
}: LocationListProps) {
  return (
    <section className='section locations-list-section'>
      <div className='container'>
        <div className='section-heading'>
          <div className='section-heading__content'>
            <span className='section-label'>
              <span className='section-label__dot' />
              Nearby locations
            </span>
            <h2 className='display-heading'>
              Choose where your
              <br />
              <em>meal starts.</em>
            </h2>
          </div>
          <p className='locations-result-count'>
            {locations.length} {locations.length === 1 ? 'location' : 'locations'} found
          </p>
        </div>

        {locations.length > 0 ? (
          <div className='locations-grid'>
            {locations.map((location) => (
              <LocationCard
                key={location.id}
                location={location}
                selected={selectedId === location.id}
                onSelect={onSelect}
              />
            ))}
          </div>
        ) : (
          <div className='locations-empty'>
            <MapPin aria-hidden='true' />
            <h3>No locations found</h3>
            <p>Try another area or remove the service filter.</p>
            <button type='button' onClick={onClear}>
              Clear search
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
