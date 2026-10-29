import Link from 'next/link';

import { ArrowRight, ChefHat, Sparkles } from 'lucide-react';

export default function MenuHero() {
  return (
    <section className='menu-hero'>
      <div className='container menu-hero-grid'>
        <div className='menu-hero-copy'>
          <div className='hero-eyebrow'>
            <Sparkles aria-hidden='true' />
            <span>Good food, your way</span>
          </div>

          <h1 className='menu-hero-title'>
            Find your
            <br />
            <em>kind of delicious.</em>
          </h1>

          <p className='menu-hero-description'>
            From satisfying meals to little sweet treats, discover something you
            will look forward to. Your next favorite is waiting here.
          </p>

          <Link className='button button--primary' href='#menu-catalog'>
            Explore all dishes
            <ArrowRight aria-hidden='true' />
          </Link>

          <div className='menu-hero-note'>
            <ChefHat aria-hidden='true' />
            <span>Find the dish that makes your day.</span>
          </div>
        </div>

        <div className='menu-hero-visual'>
          <div
            className='menu-hero-image'
            role='img'
            aria-label='A freshly prepared selection of restaurant dishes'
          />

          <div className='menu-hero-image-note'>
            <span className='menu-hero-image-icon'>
              <Sparkles aria-hidden='true' />
            </span>

            <span>
              <strong>Made for your cravings</strong>
              <small>Discover a new favorite today.</small>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
