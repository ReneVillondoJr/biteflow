import Link from 'next/link';

import { ArrowRight, BadgePercent, Sparkles } from 'lucide-react';

import type { OffersHero as OffersHeroContent } from '../types/offers';

type HeroProps = {
  data: OffersHeroContent;
};

export default function Hero({ data }: HeroProps) {
  return (
    <section className='offers-hero'>
      <div className='container offers-hero-grid'>
        <div className='offers-hero-copy'>
          <div className='hero-eyebrow'>
            <BadgePercent aria-hidden='true' />
            <span>{data.eyebrow}</span>
          </div>

          <h1>
            {data.title}
            <br />
            <em>{data.highlight}</em>
          </h1>

          <p>
            {data.description}
          </p>

          <Link className='button button--primary' href='#featured-offers'>
            {data.actionLabel}
            <ArrowRight aria-hidden='true' />
          </Link>
        </div>

        <div className='offers-hero-feature'>
          <div
            className='offers-hero-feature-image'
            role='img'
            aria-label={data.featuredLabel}
            style={{ backgroundImage: `url("${data.image}")` }}
          />
          <div className='offers-hero-feature-label'>
            <Sparkles aria-hidden='true' />
            <span>
              <strong>{data.featuredLabel}</strong>
              <small>{data.featuredNote}</small>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
