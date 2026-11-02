import Link from 'next/link';

import { ArrowRight, Utensils } from 'lucide-react';

export default function CTA() {
  return (
    <section className='offers-cta-section'>
      <div className='container'>
        <div className='offers-cta-card'>
          <span className='offers-cta-icon'>
            <Utensils aria-hidden='true' />
          </span>
          <div>
            <span className='section-label'>
              <span className='section-label__dot' />
              Taste the story
            </span>
            <h2>Find your BiteFlow favorite.</h2>
            <p>Explore comfort food, fresh choices, and a new meal waiting at your table.</p>
          </div>
          <Link className='button button--primary' href='/menu#menu-catalog'>
            Explore the menu
            <ArrowRight aria-hidden='true' />
          </Link>
        </div>
      </div>
    </section>
  );
}
