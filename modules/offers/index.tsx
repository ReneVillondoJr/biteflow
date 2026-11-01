import SiteFooter from '@/components/public/layout/site-footer';
import SiteHeader from '@/components/public/layout/site-header';

import CTA from './components/cta';
import Grid from './components/grid';
import Hero from './components/hero';
import { offersData } from './data/offers';

export default function OffersPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <Hero data={offersData.hero} />
        <Grid data={offersData} />
        <CTA />
      </main>

      <SiteFooter />
    </>
  );
}
