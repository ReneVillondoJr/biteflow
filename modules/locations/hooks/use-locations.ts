'use client';

import { useMemo, useState } from 'react';

import type {
  BiteFlowLocation,
  LocationFilter,
} from '../types/locations';

export function useLocations(locations: BiteFlowLocation[]) {
  const [query, setQuery] = useState('');
  const [service, setService] = useState<LocationFilter>('all');
  const [selectedId, setSelectedId] = useState(locations[0]?.id ?? 0);

  const filteredLocations = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return locations.filter((location) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        `${location.name} ${location.area} ${location.address}`
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesService =
        service === 'all' || location.services.includes(service);

      return matchesQuery && matchesService;
    });
  }, [locations, query, service]);

  function clearFilters() {
    setQuery('');
    setService('all');
  }

  return {
    query,
    setQuery,
    service,
    setService,
    selectedId,
    setSelectedId,
    filteredLocations,
    clearFilters,
  };
}
