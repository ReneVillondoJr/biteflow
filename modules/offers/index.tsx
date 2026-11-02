import CTA from './components/cta';
import Grid from './components/grid';
import Hero from './components/hero';
import { offersData } from './data/offers';

export default function OffersPage() {
  return (
    <div>
      <Hero data={offersData.hero} />
      <Grid data={offersData} />
      <CTA />
    </div>
  );
}
