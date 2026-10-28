import Link from 'next/link';

import {
  ArrowRight,
  ArrowUpRight,
  ChefHat,
  Clock3,
  Leaf,
  Sparkles,
} from 'lucide-react';

import { homeContent } from '../data/home';

export default function HeroSection() {
  return (
    <section className='hero-section' aria-labelledby='hero-title'>
      <div className='container hero-grid'>
        <div className='hero-copy'>
          <div className='hero-eyebrow'>
            <Sparkles aria-hidden='true' />
            <span>Your next favorite meal starts here</span>
          </div>

          <h1 className='hero-title' id='hero-title'>
            Good food.
            <br />
            Great mood.
            <br />
            <em>Every day.</em>
          </h1>

          <p className='hero-description'>
            From comforting classics to new favorites, we make every meal feel a
            little more special. Find your craving, make it yours, and let the
            good moments begin.
          </p>

          <div className='hero-actions'>
            <Link className='button button--primary' href='/menu'>
              Explore the menu
              <ArrowRight aria-hidden='true' />
            </Link>

            <Link className='button button--outline' href='/about'>
              Meet BiteFlow
            </Link>
          </div>

          <div className='hero-social-proof'>
            <div className='proof-avatars' aria-hidden='true'>
              <span className='proof-avatar'>B</span>
              <span className='proof-avatar'>F</span>
              <span className='proof-avatar'>G</span>
              <span className='proof-avatar'>!</span>
            </div>

            <div className='proof-copy'>
              <strong>Made for your everyday cravings</strong>
              <span>Thoughtful food, easy ordering, happier mealtimes.</span>
            </div>
          </div>
        </div>

        <div className='hero-visual'>
          <div
            className='hero-photo'
            role='img'
            aria-label='A spread of freshly prepared restaurant favorites'
            style={{
              backgroundImage: `url("${homeContent.heroImage}")`,
            }}
          >
            <div className='hero-photo-caption'>
              <span>Good things are cooking</span>
              <strong>Your table, your kind of comfort.</strong>
            </div>
          </div>

          <div className='hero-floating-card hero-floating-card--top'>
            <span className='floating-icon'>
              <ChefHat aria-hidden='true' />
            </span>

            <span className='floating-copy'>
              <strong>Made with care</strong>
              <span>Thoughtfully prepared favorites</span>
            </span>
          </div>

          <div className='hero-floating-card hero-floating-card--bottom'>
            <span className='floating-icon'>
              <Clock3 aria-hidden='true' />
            </span>

            <span className='floating-copy'>
              <strong>Order at your pace</strong>
              <span>Choose what works for you</span>
            </span>
          </div>

          <div className='hero-visual-note'>
            <Leaf aria-hidden='true' />
            <span>Good ingredients. Good energy. Good food.</span>
            <ArrowUpRight aria-hidden='true' />
          </div>
        </div>
      </div>
    </section>
  );
}
