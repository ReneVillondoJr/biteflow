import Link from 'next/link';

import {
  ArrowRight,
  Heart,
  Leaf,
  UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react';

import type { HomeStoryPoint } from '../types/home';

import { homeContent } from '../data/home';

const storyIcons: Record<HomeStoryPoint['icon'], LucideIcon> = {
  heart: Heart,
  leaf: Leaf,
  'utensils-crossed': UtensilsCrossed,
};

export default function StorySection() {
  return (
    <section className='section story-section'>
      <div className='container story-grid'>
        <div className='story-visual'>
          <div
            className='story-photo'
            role='img'
            aria-label='A welcoming restaurant dining space'
            style={{
              backgroundImage: `url("${homeContent.storyImage}")`,
            }}
          />

          <div className='story-note'>
            <span>A little more than a meal</span>
            <strong>Made for moments around the table.</strong>
          </div>
        </div>

        <div className='story-copy'>
          <span className='section-label'>
            <span className='section-label__dot' />
            The BiteFlow feeling
          </span>

          <h2 className='display-heading'>
            Good food brings
            <br />
            us <em>closer.</em>
          </h2>

          <p>
            We believe a good meal can turn an ordinary day around. BiteFlow is
            built around that simple idea: thoughtful food, inviting flavors,
            and a more convenient way to enjoy what you love.
          </p>

          <div className='story-points'>
            {homeContent.storyPoints.map((point) => {
              const Icon = storyIcons[point.icon];

              return (
                <div className='story-point' key={point.title}>
                  <span className='story-point-icon'>
                    <Icon aria-hidden='true' />
                  </span>

                  <span className='story-point-copy'>
                    <strong>{point.title}</strong>
                    <span>{point.description}</span>
                  </span>
                </div>
              );
            })}
          </div>

          <Link className='button button--primary' href='/about'>
            More about BiteFlow
            <ArrowRight aria-hidden='true' />
          </Link>
        </div>
      </div>
    </section>
  );
}
