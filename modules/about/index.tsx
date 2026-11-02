import CTA from './components/cta';
import Origin from './components/origin';
import StoryHero from './components/story-hero';
import Values from './components/values';
import { aboutData } from './data/about';

export default function AboutPage() {
  return (
    <div>
      <StoryHero data={aboutData.hero} />
      <Origin data={aboutData.origin} />
      <Values data={aboutData.values} />
      <CTA />
    </div>
  );
}
