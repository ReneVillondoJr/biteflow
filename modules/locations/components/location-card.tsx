import Link from 'next/link';
import { ArrowRight, Bike, Clock3, MapPin, Navigation, Store } from 'lucide-react';

import type { BiteFlowLocation } from '../types/locations';

type LocationCardProps = {
  location: BiteFlowLocation;
  selected: boolean;
  onSelect: (id: number) => void;
};

export default function LocationCard({
  location,
  selected,
  onSelect,
}: LocationCardProps) {
  return (
    <article
      className={`location-card ${selected ? 'location-card--selected' : ''}`}
    >
      <button
        className='location-card-select'
        type='button'
        onClick={() => onSelect(location.id)}
        aria-label={`Select ${location.name}`}
      >
        <span
          className='location-card-image'
          role='img'
          aria-label={`Dining area at ${location.name}`}
          style={{ backgroundImage: `url("${location.image}")` }}
        >
          <span className='location-distance'>
            <Navigation aria-hidden='true' />
            {location.distance}
          </span>
        </span>

        <span className='location-card-body'>
          <span className='location-card-heading'>
            <span>
              <strong>{location.name}</strong>
              <small>{location.area}</small>
            </span>
            <span className='location-radio' aria-hidden='true' />
          </span>
          <span className='location-detail'>
            <MapPin aria-hidden='true' />
            {location.address}
          </span>
          <span className='location-detail'>
            <Clock3 aria-hidden='true' />
            {location.hours}
          </span>
          <span className='location-services'>
            {location.services.map((service) => (
              <span key={service}>
                {service === 'pickup' ? (
                  <Store aria-hidden='true' />
                ) : (
                  <Bike aria-hidden='true' />
                )}
                {service === 'pickup' ? 'Pickup' : 'Delivery'}
              </span>
            ))}
          </span>
        </span>
      </button>

      <Link
        className='location-order-link'
        href={`/menu?location=${location.id}#menu-catalog`}
      >
        Order from this location
        <ArrowRight aria-hidden='true' />
      </Link>
    </article>
  );
}
