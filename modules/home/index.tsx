import SiteHeader from '@/components/public/layout/site-header';
import SiteFooter from '@/components/public/layout/site-footer';

import HeroSection from './components/hero-section';
import HighlightsSection from './components/highlights-section';
import FeaturedMenuSection from './components/featured-menu-section';
import StorySection from './components/story-section';
import OrderingSection from './components/ordering-section';
import ManifestoSection from './components/manifesto-section';
import FinalCallToAction from './components/final-cta';

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      <main>
        <HeroSection />
        <HighlightsSection />
        <FeaturedMenuSection />
        <StorySection />
        <OrderingSection />
        <ManifestoSection />
        <FinalCallToAction />
      </main>

      <SiteFooter />
    </>
  );
}
