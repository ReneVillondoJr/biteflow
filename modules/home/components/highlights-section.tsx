import { ChefHat, Leaf, PackageCheck, type LucideIcon } from 'lucide-react';

import type { HomeHighlight } from '../types/home';

import { homeContent } from '../data/home';

const highlightIcons: Record<HomeHighlight['icon'], LucideIcon> = {
  leaf: Leaf,
  'chef-hat': ChefHat,
  'package-check': PackageCheck,
};

export default function HighlightsSection() {
  return (
    <section className='highlights-band' aria-label='The BiteFlow experience'>
      <div className='container highlights-grid'>
        {homeContent.highlights.map((item) => {
          const Icon = highlightIcons[item.icon];

          return (
            <div className='highlight' key={item.title}>
              <span className='highlight-icon'>
                <Icon aria-hidden='true' />
              </span>

              <span className='highlight-copy'>
                <strong>{item.title}</strong>
                <span>{item.description}</span>
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
