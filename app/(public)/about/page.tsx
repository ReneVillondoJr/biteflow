import type { Metadata } from 'next';

import AboutPage from '@/modules/about';

export const metadata: Metadata = {
  title: 'Our Story',
  description:
    'Meet BiteFlow, learn what inspires our food, and discover the values behind every meal.',
};

export default function Page() {
  return <AboutPage />;
}
