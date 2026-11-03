import type { Metadata } from 'next';

import LocationsPage from '@/modules/locations';

export const metadata: Metadata = {
  title: 'Locations',
  description:
    'Find your nearest BiteFlow location and start a pickup or delivery order.',
};

export default function Page() {
  return <LocationsPage />;
}
