import { Heart, Leaf, UtensilsCrossed, type LucideIcon } from 'lucide-react';

import type { StoryValue } from '../types/about';

type ValuesProps = {
  data: StoryValue[];
};

const valueIcons: Record<StoryValue['icon'], LucideIcon> = {
  heart: Heart,
  leaf: Leaf,
  utensils: UtensilsCrossed,
};

export default function Values({ data }: ValuesProps) {
  return (
    <section className='section about-values' id='our-values'>
      <div className='container'>
        <div className='offers-heading'>
          <div>
            <span className='section-label'>
              <span className='section-label__dot' />
              What guides us
            </span>
            <h2 className='display-heading'>
              Simple values,
              <br />
              <em>delivered daily.</em>
            </h2>
          </div>
          <p>
            The way we cook, welcome, and serve is shaped by a few ideas that
            stay close to everything BiteFlow does.
          </p>
        </div>

        <div className='about-values-grid'>
          {data.map((value, index) => {
            const Icon = valueIcons[value.icon];

            return (
              <article className='about-value-card' key={value.title}>
                <span className='about-value-number'>0{index + 1}</span>
                <span className='about-value-icon'>
                  <Icon aria-hidden='true' />
                </span>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
