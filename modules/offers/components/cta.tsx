import Link from 'next/link';

import { ArrowRight, Gift } from 'lucide-react';

export default function CTA() {
  return (
    <section className='offers-cta-section'>
      <div className='container'>
        <div className='offers-cta-card'>
          <span className='offers-cta-icon'>
            <Gift aria-hidden='true' />
          </span>
          <div>
            <span className='section-label'>
              <span className='section-label__dot' />
              Craving something else?
            </span>
            <h2>Explore the complete menu.</h2>
            <p>Find comforting classics, fresh favorites, and something new for every appetite.</p>
          </div>
          <Link className='button button--primary' href='/menu#menu-catalog'>
            Browse the menu
            <ArrowRight aria-hidden='true' />
          </Link>
        </div>
      </div>
    </section>
  );
}
