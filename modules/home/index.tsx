import FinalCallToAction from './components/final-cta';
import FeaturedMenuSection from './components/featured-menu-section';
import HeroSection from './components/hero-section';
import HighlightsSection from './components/highlights-section';
import ManifestoSection from './components/manifesto-section';
import OrderingSection from './components/ordering-section';
import SiteFooter from './components/site-footer';
import SiteHeader from './components/site-header';
import StorySection from './components/story-section';

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
