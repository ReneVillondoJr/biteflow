import Link from 'next/link';

import { ArrowRight, BookOpen } from 'lucide-react';

import type { StoryHero as StoryHeroContent } from '../types/about';

type StoryHeroProps = {
  data: StoryHeroContent;
};

export default function StoryHero({ data }: StoryHeroProps) {
  return (
    <section className='about-hero'>
      <div className='container about-hero-grid'>
        <div className='about-hero-copy'>
          <div className='hero-eyebrow'>
            <BookOpen aria-hidden='true' />
            <span>{data.eyebrow}</span>
          </div>

          <h1>
            {data.title}
            <br />
            <em>{data.highlight}</em>
          </h1>

          <p>{data.description}</p>

          <Link className='button button--primary' href='#our-values'>
            {data.actionLabel}
            <ArrowRight aria-hidden='true' />
          </Link>
        </div>

        <div className='about-hero-feature'>
          <div
            className='about-hero-feature-image'
            role='img'
            aria-label='A welcoming table with fresh BiteFlow food'
            style={{ backgroundImage: `url("${data.image}")` }}
          />
        </div>
      </div>
    </section>
  );
}
