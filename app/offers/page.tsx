import type { Metadata } from 'next';

import OffersPage from '@/modules/offers';

export const metadata: Metadata = {
  title: 'Offers',
  description:
    'Discover BiteFlow meal offers, bundle savings, and sweet treat deals.',
};

export default function Page() {
  return <OffersPage />;
}
