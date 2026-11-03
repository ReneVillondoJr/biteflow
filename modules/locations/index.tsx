'use client';

import LocationsHero from './components/hero';
import LocationList from './components/location-list';
import { locationsData } from './data/locations';
import { useLocations } from './hooks/use-locations';

export default function LocationsPage() {
  const {
    query,
    setQuery,
    service,
    setService,
    selectedId,
    setSelectedId,
    filteredLocations,
    clearFilters,
  } = useLocations(locationsData.locations);

  return (
    <div className='locations-page'>
      <LocationsHero
        query={query}
        service={service}
        onQueryChange={setQuery}
        onServiceChange={setService}
      />
      <LocationList
        locations={filteredLocations}
        selectedId={selectedId}
        onSelect={setSelectedId}
        onClear={clearFilters}
      />
    </div>
  );
}
